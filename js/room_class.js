console.log("Loaded room class");

function room_c (n, d){
	this.zid = Math.floor(Math.random() * 1000000);
	this.name = n;
	this.description = d;

	this.directions = [];

	this.interactions = [];

	this.objects = [];

	this.timers = [];
	this.activeTimers = [];

	this.npcs = [];

	this.visibleObjectTextDisplay = true;

	this.uiDisplay = false;

	return this.zid;
}

room_c.prototype.getDescription = function(){
	if(this.visibleObjectTextDisplay){
		var temp = "You can see ";
		for(var j = 0; j < this.objects.length; j++){
			if(j < this.objects.length - 1){
				temp += "a " + this.objects[j].name + ", ";
			}
			else{
				temp += "and a " + this.objects[j].name + ".";
			}
		}
		if(this.objects.length < 1){
			temp += "nothing.";
		}
		return this.description + "<br /><br />" + temp;
	}
	else{
		return this.description;
	}
}

room_c.prototype.getIndexOfDirection = function(y){
	for(var j = 0; j < this.directions.length; j++){
		if(this.directions[j].type.toLowerCase() == y){
			return this.directions[j].finalDest;
		}
	}
	return false;
}

room_c.prototype.appendDirection = function(){
	var x = document.getElementById("addDirectionSelect").value;
	if(x != "Select Direction"){
		for(var j = 0; j < this.directions.length; j++){
			if(this.directions[j].type == x){
				return false;
			}
		}
		this.directions.push(new direction(x));
		document.getElementById("currentDirections").innerHTML = "";
		var tempText = "";
		for(var i = 0; i < this.directions.length; i++){
			tempText += "<span>" + this.directions[i].type + "<br /></span><select onchange = 'dungeon.rooms[getRoomIndex()].setFinalDestination(\"" + this.directions[i].type + "\",this.value)'>";
			tempText += "<option>Please Select Destination Room</option>";
			for(var j = 0; j < dungeon.rooms.length; j++){
				tempText += "<option>" + dungeon.rooms[j].name + "</option>";
			}
			tempText += "</select><br />";
		}
		document.getElementById("currentDirections").innerHTML = tempText;
		return;
	}
}

room_c.prototype.setFinalDestination = function(y, z){
	for(var j = 0; j < this.directions.length; j++){
		console.log(this.directions[j]);
		if(this.directions[j].type == y){
			this.directions[j].finalDest = z;
			return;
		}
	}
}

room_c.prototype.setName = function(x){
	this.name = x;
	rebuildManager();
}

room_c.prototype.setDescription = function(x){
	this.description = x;
}

var createRoom = function(){
	var x = document.getElementById("roomName").value;
	var y = document.getElementById("roomDescription").value;
	if(x.trim().length > 0){
		if(y.trim().length > 0){
			if(dungeon.rooms.length == 0){
				var w = true;
			}
			dungeon.rooms.push(new room_c(x, y));
			if(w){
				player_o.spawnPoint = dungeon.rooms[0].zid;
			}
			rebuildManager();
			return true;
		}
		else{
			alert("Please enter a value for the room description");
			return false;
		}
	}
	else{
		alert("Please enter a value for the room name");
		return false;
	}
}

var getRoomIndex = function(){
	//console.log("Grabbing Room Index");
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == dungeon.currentRoomEditing){
			console.log("Found Room Index: " + i);
			return i;
		}
	}
	console.log("Could not retrieve a room index");
	return -1;
}

var getRoomIndexOnPlayer = function(){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == player_o.currentRoom){
			return i;
		}
	}
	return -1;
}

var getRoomIdByName = function(x){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].name == x){
			return dungeon.rooms[i].zid;
		}
	}
}

function direction (type){
	this.type = type;
	this.finalDest = "Please Select Destination Room";
}
