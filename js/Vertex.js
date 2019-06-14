// Master Practikum in Multimedia Systems
// Sommer Semester 2019

function Vertex(id) {
  this.id = id; // The identifying number of this node
  this.neighbors = {}; // A dictionary of the form {neighborID: {weight, degree}}
  this.qrCode = ''; // URL of the QR code of this Vertex
  this.coordinates = {'x':0, 'y':0, 'z':0}; // May be used in future implementations
}

// ===== Method declaration =====
Vertex.prototype.addNeighbor = function (neighbor, degree) {
  // Adds a neighbor to the node.
  // @param neighbor: Node of type Vertex
  // @param degree: Number of type int that represents the degree to neighbor with respect to the horizontal line of this node.
  var distance = this.getDistance(neighbor); // TODO: In future versions, the coordinates could be used to calculate the distance.
  this.neighbors[neighbor.id] =  {distance, degree};
};

Vertex.prototype.removeNeighbor = function (neighbor) {
  // Removes neighbor from node.
  // @param neighbor: Node of type Vertex
  delete this.neighbors[neighbor.id];
};

// == Setter for Coordinates ==
Vertex.prototype.setCoordinates = function (coordinates) {
  // Sets the distance between this and neighbor to be used as weights of the graph. Default is 1.
  // @param neighbor: Node of type Vertex
  // @param distance: Distance between this and neighbor
  this.coordinates = coordinates;
};

// == Get and Set for Distance ==
Vertex.prototype.getDistance = function (neighbor) {
  // TODO: In future versions, the coordinates could be used to calculate the distance.
  // @param neighbor: Node of type Vertex from which to calculate distance.
  var distance = 1;
  if(this.neighbors[neighbor.id] != undefined) {
    distance = this.neighbors[neighbor.id];
  }

  return distance;
};

Vertex.prototype.setDistance = function (neighbor, distance) {
  // Sets the distance between this and neighbor to be used as weights of the graph. Default is 1.
  // @param neighbor: Node of type Vertex
  // @param distance: Distance between this and neighbor
  this.neighbors[neighbor.id] = distance;
  neighbor.neighbors[this.id] = distance;
};

// == Set for QR code ==
Vertex.prototype.setQRCode = function (url) {
  this.qrCode = url;
};
