function UndirectedGraph(){
  this.edges = {}; // AdjacencyList of nodes in graph
  this.nodes = []; // Array of existing nodes of type Vertex
}

// Method declaration
UndirectedGraph.prototype.addVertex = function (vertex) {
  this.edges[vertex] = {};
};

UndirectedGraph.prototype.addEdge = function (vertex1, vertex2, weight) {
  if (weight == undefined) {
    weight = 0;
  }

  this.edges[vertex1][vertex2] = weight;
  this.edges[vertex2][vertex1] = weight;
};

UndirectedGraph.prototype.removeEdge = function (vertex1, vertex2) {
  if (this.edges[vertex1] &&
    this.edges[vertex1][vertex2] != undefined){
      delete this.edges[vertex1][vertex2];
    }
  if (this.edges[vertex2] &&
    this.edges[vertex2][vertex1] != undefined){
      delete this.edge[vertex2][vertex1];
    }
};

UndirectedGraph.prototype.removeVertex = function (vertex) {
  for(var adjacentVertex in this.edges[vertex]) {
    this.removeEdge(adjacentVertex, vertex);
  }
  delete this.edges[vertex];
};

UndirectedGraph.prototype.Dijkstra = function (source) {
  // Create vertex set Q
  var Q = {}, dist = {}, path = {};
  for (var vertex in this.edges) {
    // Unkown distances set to Infinity
    dist[vertex] = Infinity;
    // Path to undefined
    path[vertex] = [];
    // Add neighbor vertices of vertex to the Queue
    Q[vertex] = this.edges[vertex];
  }
  // Distance from source to source init to 0
  dist[source] = 0;

  while (!_isEmpty(Q)) {
    var u = _extractMin(Q, dist); // get the min distances

    // remove u from Q
    delete Q[u];

    // for each neighbor of vertex u:
    // where the neighbor is still in Q.
    for (var neighbor in this.edges[u]) {
      // current distance
      var alt = dist[u] + this.edges[u][neighbor];
      // a shorter path has been found
      if (alt < dist[neighbor]) {
        path[neighbor] = u;
        dist[neighbor] = alt;
      }
    }
    console.log(path);

  }

  return {distances: dist,
          path: path};
};

// Helper functions
function _isEmpty(obj) {
  // Return true if the obj has no elements, i.e. is empty
  return Object.keys(obj).length === 0;
};

function _extractMin(Q, dist) {
  // Get the neighboring node for which there is the minimum distance
  // from a given vertex
  var minimumDistance = Infinity,
      nodeWithMinimumDistance = null;
  console.log(Q);
  for (var node in Q) { // For each node in the Queue
    console.log("Node: "+node);
    console.log(dist[node]);
    if (dist[node] <= minimumDistance) {
      minimumDistance = dist[node];
      nodeWithMinimumDistance = node;
    }
  }
  return nodeWithMinimumDistance;
};




// -------------------------------------------------------
// ---------------------- Main ---------------------------
// -------------------------------------------------------
var graph1 = new UndirectedGraph();
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addEdge(1, 2, 10);
console.log(graph1.edges);

graph1.addVertex(3);
graph1.addVertex(4);
graph1.addVertex(5);
graph1.addEdge(2, 3, 80);
graph1.addEdge(3, 4, 20);
graph1.addEdge(4, 5, 50);
graph1.addEdge(1, 5, 70);
console.log(graph1.edges)

var dijkstra = graph1.Dijkstra(2);
console.log(dijkstra.distances);
console.log(dijkstra.path);
