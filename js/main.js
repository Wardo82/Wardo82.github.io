//Get Object Element: Arrow or Pin
objectEntity = document.getElementById('arrowObject');
// Get destination out of local storage
var destRoomInput = localStorage.getItem('input_search');
//Build Graph
// Instance of graph
var graph = new UndirectedGraph();
var a = new Vertex(1);
var b = new Vertex(2);
var c = new Vertex(3);
var d = new Vertex(4);
var e = new Vertex(5);
// Node addition
graph.addVertex(a);
graph.addVertex(b);
graph.addVertex(c);
graph.addVertex(d);
graph.addVertex(e);

a.setDistance(b,10);
b.setDistance(c,10);
c.setDistance(d,10);
c.setDistance(e,10);

graph.addEdge(a,b,90);
graph.addEdge(b,c,90);
graph.addEdge(c,e,180);
graph.addEdge(c,d,0);

//console.log(graph.Dijkstra(a,b));

//Assign Rooms to Nodes
var rooms = new RoomStore();
rooms.addFinger("00.01.*",1);
rooms.addFinger("00.02.*",2);
rooms.addFinger("01.03.*",4);
rooms.addRoom("01.04.005",5);


var destRoom=rooms.getRoom("01.04.005");
/*
*   oldQRCodeValue and nextDestination both hold a number that represents a node of the graph
*   Based on these two attributes the system decides if a new path has to be rendered and what model to display on-top of the marker
*/
var oldQRCodeValue = '';
var nextDestination = '';

//Objects that can be displayed
objects3D = {
  'arrow': 'assets/arrow.gltf',
  'pin': 'assets/arrow.gltf',
};

canvasElement = document.createElement("canvas");
canvasContext = canvasElement.getContext("2d");

var rot=0;

//Try to read a QR Code every 500 Milliseconds and change model based on its value
setInterval(function () {
  //rot=(rot+45)%360;
  //objectEntity.setAttribute('rotation', {x:0,y:rot,z:0});
  video = document.querySelector("video");
  if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvasContext.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    //Reading out QR, Code by using the current frame of the camera produced by aFrame
    var imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var qrCode = jsQR(imageData.data, imageData.width, imageData.height);
    if (qrCode && qrCode.data != '' && qrCode.data != oldQRCodeValue) {
      //Calculate Shortest Path from current Node
      shortestPath=graph.Dijkstra(qrCode.data, destRoom).path;
      //Get Degree
      //this.graph.getDegree(qrCode.data, shortestPath[0]);
      alert(qrCode.data);
      //Load Model Arrow
      gltfModel = objects3D['arrow'];
      if (gltfModel) {
        //objectEntity.setAttribute('gltf-model', 'url(' + gltfModel + ')');
      } else {
        alert('Cannot find arrow.gltf model! Please check assets folder!');
      }
      oldQRCodeValue = qrCode.data;
      //console.log(qrCode.data);
      $('#qrData').text(qrCode.data);
    } if (qrCode && qrCode.data != '' && qrCode.data == destRoom) {
        //Load Model Pin
        gltfModel = objects3D['pin'];
        if (gltfModel) {
            //objectEntity.setAttribute('gltf-model', 'url(' + gltfModel + ')');
        } else {
            alert('Cannot find pin.gltf model! Please check assets folder!');
        }
    } else {
      console.log('Currently there is no readable QR-Code!');
    }
  }
}, 300);

$('.btn-clear').click(function () {
  oldQRCodeValue = '';
  $('#qrData').text(oldQRCodeValue);
  objectEntity.removeAttribute('gltf-model');
});
