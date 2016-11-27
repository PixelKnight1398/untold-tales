var dungeon = {
	name: "test_dungeon",
	creator: "PixelKnight",
	
	player: null,
	
	rooms: [],
};

var getRoomIndex = function(){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == currentRoomEditing){
			return i;
		}
	}
	return -1;
}

var getObjectIndex = function(){
	for(var i = 0; i < dungeon.rooms.length; i++){
		for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
			if(dungeon.rooms[i].objects[j].zid == currentObjectEditing){
				return j;
			}
		}
	}
	return -1;
}

var createDungeon = function(){
	dungeon.name = document.getElementById("adventureName").value;
	dungeon.creator = document.getElementById("authorName").value;
	if(dungeon.name.trim() == ""){
		alert("Please enter a value for your adventure name.");
		return;
	}
	if(dungeon.name.trim().length > 50){
		alert("Please enter a shorter name for you adventure");
		return;
	}
	if(dungeon.creator.trim() == ""){
		alert("Please enter a value for the author name.");
		return;
	}
	if(dungeon.creator.trim().length > 50){
		alert("Please enter a shorter name for the author");
		return;
	}
	document.getElementById("startActivity").style.display = "none";
	document.getElementById("builderActivity").style.display = "block";
	document.getElementById("saveButton").style.display = "block";
	document.getElementById("runButton").style.display = "block";
}