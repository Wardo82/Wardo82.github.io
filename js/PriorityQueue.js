// Master Practikum in Multimedia Systems
// Sommer Semester 2019

// Priority Queue to make Dijkstra more efficient.
// Implemented as a Binary Heap
function PriorityQueue(source){
  // List with the Priority of each node. This is an implementation of a binary tree
  // as a list.
  // @param source: Node of type Vertex used as first element of the list
  this.heapList = [0, {weight: 0, vertex: source}]; // Initialize list with '0' so that integer division can be done easily
  this.currentSize = 1; // Initial size of 0
}

PriorityQueue.prototype._percUp = function (i) {
  // Keeps the heap structure property (that the key of the parent should be greater than
  // that of the child). This functions positions the appended node in position i where
  // it corresponds.
  // @param i: The position of the node to order
  while(Math.floor(i/2) > 0){
    // If the weight of the child is less than the weight of the parent
    if(this.heapList[i].weight < this.heapList[Math.floor(i/2)].weight){
      // Swap positions
      var tmp = this.heapList[Math.floor(i/2)];
      this.heapList[Math.floor(i/2)] = this.heapList[i];
      this.heapList[i] = tmp;
    }
    i = Math.floor(i/2);
  }
};

PriorityQueue.prototype._percDown = function (i) {
  // Keeps the heap structure property (that the key of the parent should be greater than
  // that of the child). This functions positions the appended node in position i where
  // it corresponds.
  // @param i: The position of the node to order
  while ((i*2) <= this.currentSize){
    var mc = this._minChild(i)
    if (this.heapList[i] > this.heapList[mc]) {
      var tmp = this.heapList[i];
      this.heapList[i] = this.heapList[mc];
      this.heapList[mc] = tmp;
    }
    i = mc;
  }
};

PriorityQueue.prototype._minChild = function (i) {
  if (i*2+1 > this.currentSize) {
    return i*2;
  } else {
    if (this.heapList[i*2] < this.heapList[i*2+1]) {
      return i*2;
    } else {
      return i*2+1;
    }
  }
};

PriorityQueue.prototype.buildHeap = function (alist) {
  var i = Math.floor(array.length/2) ;
  this.currentSize = i;
  this.heapList = this.heapList.concat(array);
  while (i > 0) {
    this._percDown(i);
    i = i-1;
  }
};

PriorityQueue.prototype.insert = function (vertex) {
  // Inserts a node into the queue
  // @param vertex: Pair of the form {weight: int, vertex: Vertex}
  this.heapList.push(vertex);
  this.currentSize = this.currentSize + 1;
  this._percUp(this.currentSize);
};

PriorityQueue.prototype.delMin = function () {
  // Returns the id of the first element of the heap. That with the highest Priority.
  var retval = this.heapList[1];
  this.heapList[1] = this.heapList[this.currentSize];
  this.heapList.pop();
  this._percDown(1);
  this.currentSize = this.currentSize - 1;
  return retval.vertex.id;
};

PriorityQueue.prototype.isEmpty = function () {
  // Returns true if Queue is empty, otherwise false
  return this.currentSize == 0;
};
//
// var q = new PriorityQueue();
//
// console.log(q.isEmpty());
// q.insert({weight:13,vertex: undefined});
// q.insert({weight:15,vertex: undefined});
// q.insert({weight:5,vertex: undefined});
// q.insert({weight:0,vertex: undefined});
// console.log(q.heapList);
// q.delMin();
// q.delMin();
// q.delMin();
// q.delMin();
// console.log(q.isEmpty());
