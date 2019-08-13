//Get Object Element: Arrow or Pin
objectEntity = document.getElementById('arrowObject');
/*
* 1.- Load room data: The first thing to do should be to load a file (maybe.txt or json)
* with all data regarding the registered rooms. It can start small with a txt file to later
* become a more thorough description of the building.
*/
/* TODO: Change the RoomStore constructor to initialize from a file
var rooms = new RoomStore(file: "/assets/files/rooms.txt"); */
//Assign Rooms to Nodes
var rooms = new RoomStore();
rooms.addFinger("00.01.*", 1);
rooms.addFinger("00.02.*", 2);
rooms.addFinger("01.03.*", 3);
rooms.addFinger("01.04.*", 4);
rooms.addRoom("01.04.005", 5);

/*
* 2.- Build graph from RoomStore: Second, build our model representation (a graph)
* straight from a file which contains all the ids, connections and position information of
* the nodes
*/
/* TODO: Change UndirectedGraph constructor to initialize from a file
var graph = new UndirectedGraph(file: "/assets/files/nodes.json");*/
//Build Graph
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

graph.addEdge(a, b, 10, 90);
graph.addEdge(b, c, 10, 90);
graph.addEdge(c, e, 10, 180);
graph.addEdge(c, d, 10, 0);

// Compute the path between a, b to test functionality
console.log(graph.Dijkstra(a, b));

/*
* 3.- Get user request: Get the users search request
*/
// Get destination out of local storage
// TODO: Uncomment when testing is done.
// var destRoom = localStorage.getItem('input_search');
var destRoom = rooms.getRoom("01.04.005"); // Get id of searched destination

/*
* 4.- Process search: Now we are ready to compute the path to take the user to the destination.
* This task can be divided in two problems to solve. The first one is that of knowing where the
* user is and the second is rendering the arrow to where the user should go next.
*/
// Variables for the positioning problem
var originNode = null; // Origin variable. This will have the Vertex of the node where the user is
var destination = graph.getVertexById(destRoom); // Get the Vertex of the destination
var shortestPath; // Array containning the nodes from origin to destination
var oldQRCodeValue = ''; // ID of the node where the user currently is

// Variables for the rendering problem
var gltfModel; // Filename of the object to be rendered
var canvasElement = document.createElement("canvas"); // Canvas element used for scanning and rendering
var canvasContext = canvasElement.getContext("2d"); // The context of the HTML canvas object
var objects3D = {
    'arrow': 'assets/arrow.gltf',
    'pin': 'assets/pin.gltf',
}; // Dictionary for the objects that can be displayed
var rotationAngle = 0; // Initial rotation of the object with respect to the north (The arrow points up)
var qrOrientation = new Translation(); // Object used to compute the orientation of the QRCode
var counter = 0; // Leeway for rendering the arrow

/*
* Main function
* Try to read a QR Code every 300 Milliseconds and load, change and
* render model based on the QRCode's value
*/
function main() {
  video = document.querySelector("video"); // Get video element that A-Frame creates

  if (video && video.readyState === video.HAVE_ENOUGH_DATA) { // If video element is up and running
    canvasElement.height = video.videoHeight; // Get video height
    canvasElement.width = video.videoWidth; // Get video width
    // Draw the image from the video element in our canvas
    canvasContext.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    //Reading out QR Code by using the current frame of the camera produced by A-Frame
    var imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
    // Get QR code object using jsQR library. It takes an image a tries to detect the QR within it
    var qrCode = jsQR(imageData.data, imageData.width, imageData.height);

    if(qrCode && qrCode.data != ''){ // If QR code exists and data is not empty
      counter = 0;
      /*
      * 4.1.- User positioning: Get user position from camera
      */
      /* TODO: Can this be moved to a separate file and call pos = getUserPosition() ?*/
      /* Based on qrCode.data the system decides if a new path has to be rendered and what
      model to display on-top of the marker*/
      if (qrCode.data != oldQRCodeValue) { // If the scanned id is new
        //Calculate Shortest Path from current position
        originNode = graph.getVertexById(qrCode.data); // Get vertex with id = qrCode.data
        if (originNode) {
            objectEntity.object3D.visible = true;
            shortestPath = graph.getPathBetween(originNode, destination); // Call Dijkstra's algorithm
        }

        gltfModel = objects3D['arrow']; //Load Model Arrow
      }

      if (qrCode.data == destRoom) { // If destination is reached
        gltfModel = objects3D['pin']; //Load Model Pin
        objectEntity.object3D.rotation.set(90,
                                           objectEntity.object3D.rotation['y'],
                                           objectEntity.object3D.rotation['z']);
      }

      if (gltfModel) { // If a gltf model was assigned
        // Set object entity attribute to the filename of the model
        objectEntity.setAttribute('gltf-model', 'url(' + gltfModel + ')');
      } else {
        alert('Cannot find'+ gltfModel +'! Please check assets folder!');
      }

      /*
      * 4.2.- Scene rendering: render the objects accordingly in the scene
      */
      // Get the degree from the origin node to the next in the path
      if(shortestPath && qrCode) { // If there is a computed shortest path and a scanned
        if (qrCode.data != destRoom) { // If destination is reached
          var degree = shortestPath[0].getDegree(shortestPath[1].id); // Get angle for next node
          var angle = qrOrientation.getOrientation(qrCode); //Get orientation of qrCode

          rotationAngle = (angle + degree - 90) % 360;
          var angleRad = qrOrientation.toRadian(rotationAngle); // Transform to radians

          objectEntity.object3D.rotation.set(objectEntity.object3D.rotation['x'],
                                            objectEntity.object3D.rotation['y'],
                                            angleRad);
        }
      }

    }else{ // If no QR code exists
      counter += 300;
      if (counter >= 1200 ) {
        objectEntity.object3D.visible = false; // Hide arrow
      }
      console.log('Currently there is no readable QR-Code!');
    }

    }

    requestAnimationFrame(main);
  };
  requestAnimationFrame(main);
