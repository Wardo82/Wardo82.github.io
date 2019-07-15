// Master Practikum in Multimedia Systems
// Sommer Semester 2019

// Graph implementation of building's nodes for navigation.
// Note: 'Vertex' and 'Node' are used interchangebly.
function UndirectedGraph(){
  this.edges = {}; // Adjacency list of nodes in graph. This is used for computation of Dijkstra
  this.nodes = {}; // Dictionary of existing nodes of the form {ID: Vertex}. This is used as record of nodes
}

// ===== Method declaration =====
UndirectedGraph.prototype.addVertex = function (vertex) {
  // Adds a vertex to de graph
  // @param vertex: Node to be added
  this.edges[vertex.id] = {}; // Adds it to the adjacency list
  this.nodes[vertex.id] = vertex; // Keeps it on record
};

UndirectedGraph.prototype.addEdge = function (vertex1, vertex2, degree) {
  // Adds connection between two nodes
  // @param vertex1: Node of type Vertex
  // @param vertex2: Node of type Vertex
  // @param degree: Value of type int representing the degree between vertex1 and
  // vertex2 with respect to the horizontal line that goes through vertex1
  var distance = vertex1.getDistance(vertex2); // Get distance btw. nodes

  var v1 = vertex1.id;
  var v2 = vertex2.id;
  // Add it to the adjacency list
  this.edges[v1][v2] = distance;
  this.edges[v2][v1] = distance;
  // Add connection to nodes record
  this.nodes[v1].addNeighbor(vertex2, degree);
  this.nodes[v2].addNeighbor(vertex1, (180+degree)%360);
};

UndirectedGraph.prototype.removeEdge = function (vertex1, vertex2) {
  // Removes connection between two nodes
  // @param vertex1: Node of type Vertex
  // @param vertex2: Node of type Vertex
  // Delete edge from adjacency list
  var v1 = vertex1.id;
  var v2 = vertex2.id;
  if (this.edges[v1] &&
    this.edges[v1][v2] != undefined){
      delete this.edges[v1][v2];
    }
  if (this.edges[v2] &&
    this.edges[v2][v1] != undefined){
      delete this.edge[v2][v1];
    }

  // Delete connection from nodes record
  this.nodes[v1].removeNeighbor(vertex2);
  this.nodes[v2].removeNeighbor(vertex1);
};

UndirectedGraph.prototype.removeVertex = function (vertex) {
  // Removes a node from the graph and all its acompanying connections.
  // @param vertex: Node of type Vertex to be removed
  // Remove all edges from the graph spanning from vertex.
  for(var adjacentVertex in this.edges[vertex.id]) {
    this.removeEdge(adjacentVertex, vertex);
  }
  // Remove it from the adjacency list
  delete this.edges[vertex.id];
  // Remove it from the nodes record
  delete this.nodes[vertex.id];
};

UndirectedGraph.prototype.Dijkstra = function (source, destination) {
  // Dijkstra algorithm to compute the shortest path between the source node
  // and destination.
  // TODO: If destination is not given, all shortest paths will be
  // computed.
  // @param source: Source node of type Vertex from which to calculate the path.
  // @param destination: (optional) Destination node of type Vertex to calculate the path.

  // Create vertex set Q
  var pq = new PriorityQueue(source); // Priority queue used to make Dijkstra faster
  var dist = {}; // Distances dictionary of the form {ID: distance}
  // Path dictionary of the form {ID: previous node}. That means that to reach ID
  // first reach previous node.
  var path = {};

  // Variables initalization for Dijkstra
  for (var vertex in this.edges) { // For each node in the graph
    dist[vertex] = Infinity; // Unkown distances set to Infinity
    path[vertex] = []; // Path to such node unkown (empty)
  }
  dist[source.id] = 0; // Distance from source to source init to 0
  path[source.id] = source.id; // Path to source is the source

  while (!pq.isEmpty()) {
    var v = pq.delMin(); // Extract minimum distance vertex from pq.

    if (this.nodes[v] == destination) return {distances: dist, path: path}; // We have already found our destination

    // For every adjacent node of v
    for (var neighbor in this.edges[v]) {
      // Calculate the distance to reach neighbor passing through v
      var alt = dist[v] + this.edges[v][neighbor];
      // If there is a shorter path to neighbor through v
      if (alt < dist[neighbor]) {
        dist[neighbor] = alt; // Update the new minimum distance
        path[neighbor] = v; // To reach neighbor is better to go through u
        // Insert neighbor in queue to keep exploring the graph
        pq.insert({weight: dist[neighbor], vertex: this.nodes[neighbor]})
      }
    }


    //console.log(path);
  }

  return {distances: dist,
          path: path};
};

UndirectedGraph.prototype.getPathBetween = function (vertex1, vertex2) {
  // getPathBetween: Returns the path between two nodes as an array of Vertex
  // @param vertex1: Source node
  // @param vertex2: Destination node
  dijkstraList = this.Dijkstra(vertex1, vertex2); // Get minimum distance path

  path = [vertex2]; // We start from the destination
  tmp = vertex2.id;
  while (tmp != vertex1.id) { // While we have not reached our origin
    previous = dijkstraList.path[tmp]; // The previous node before reaching tmp
    path.push(this.nodes[previous]); // Insert it in the path
    tmp = previous // Jump to previous node until source is reached
  }

  return path.reverse();
}

UndirectedGraph.prototype.getVertexById = function (id) {
  // Returns Vertex by ID
  // @param id: ID of Vertex
  return this.nodes[id];
};

UndirectedGraph.prototype.getDegree = function (idRoot, idDest) {
  // Returns Degree between Root and Destination Nodes
  // @param idRoot: ID of Root-Node
  // @param IdDest: ID of Dest-Node

  return this.nodes[idRoot].getDegree(idDest);
};
