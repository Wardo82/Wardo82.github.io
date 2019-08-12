
function RoomStore(file){
    this.rooms = new Map();

    // Load constructor from files
    if (file) {
      var request = new XMLHttpRequest();
      request.open('get', file, true);
      request.onreadystatechange = function() {
        if(request.readyState==4) {
        console.log(request.responseText);
        }
      }
      request.send(null);
    }

    console.log("Created Map for Rooms and Nodes");
}

/*
*   This function is for the MI-Building only please modify it, if you use another layout system
    Assigns a room to the _bestmatching_ node
    Parameter: room = "01.02.003" node = id
*/
RoomStore.prototype.addRoom = function(room, node) {
    if(!this.rooms.has(room)) {
        this.rooms.set(room, node);
        //console.log("Added room " + room + " and assigned node " + node + "to it.");
    } else {
        //console.log("Room " + room + " already exists!");
    }
}

/*
*   This function is for the MI-Building only please modify it, if you use another layout system
    Updates a room to another node
    Parameter: room = "01.02.003" node = id
*/
RoomStore.prototype.updateRoom = function(room, node) {
    if(this.rooms.has(room)) {
        this.rooms.set(room, node);
        //console.log("Updated room " + room + " to node " + node + ".");
    } else {
        //console.log("Room " + room + " does not exist!");
    }
}

/*
*   Adds all rooms of a finger and assigns them to a specific node
*   This is for fast and rough mapping of a building
*   Parameter: room = "X.X.*" node = id
*/
RoomStore.prototype.addFinger = function(room, node) {
    var rsplit = room.split('*');
    var tempRoom = undefined;
    for(var i=0; i< 100; i++){
        temproom=rsplit[0]+i.toString().padStart(3, '0');
        this.rooms.set(temproom, node);
        //console.log("Added room " + temproom + " and assigned node " + node + "to it.");
    }
}

/*
*   return corresponding node of a specific room
*/
RoomStore.prototype.getRoom = function(room) {
    if(this.rooms.has(room)) {
        return this.rooms.get(room);
    } else {
        //console.log("Room " + room + " does not exist!");
    }
}
/*
*   Deltes all entries with a specific node assigned to
*/
RoomStore.prototype.deleteNode = function(node) {
    console.log("Start deletion of Node " + node +":");
    for( var [k,v] of this.rooms) {
        if(v==node) {
            this.rooms.delete(k);
            //console.log("Deleted room "+ k +".")
        }
    }
}

/*
*   Deletes the entry with specified room id
*/
RoomStore.prototype.deleteRoom = function(room) {
    if(this.rooms.has(room)){
        this.rooms.delete(room);
        //console.log("Deleted room "+ room +".")
    }
    else {
        //console.log("Room " + room + " does not exist");
    }
}

/*
*   Prints all stored rooms
*/
RoomStore.prototype.printAll = function() {
    for(var [k,v] of this.rooms) {
        //console.log("Room: " + k + " Node: "+ v);
    }
}

RoomStore.prototype.getSize = function() {
    return this.rooms.size;
}
