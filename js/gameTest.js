console.log("Loaded game emulator");

var filter = function(event){
	if(event.keyCode == 13){
		testInput();
	}
}

var untoldOutput = function(x){
	document.getElementById("outputArea").innerHTML += "<br />> " + x + "<br />";
}

var testInput = function(){
	var input = document.getElementById("untoldInput").value;
	document.getElementById("outputArea").innerHTML += "<br /> " + document.getElementById('untoldInput').value + "<br />";
	document.getElementById("untoldInput").value = "";
	input = input.toLowerCase().trim().split(" ");
	switch(input.length){
		case 0:
			return;
		break;
		case 1:
			switch(input[0]){
				case "look":
					untoldOutput(dungeon.rooms[getRoomIndexOnPlayer()].getDescription() + "<br />");
				break;
				case "go":
					untoldOutput("Which direction do you want to go?");
				break;
				case "grab":
					untoldOutput("Grab what?");
				break;
				case "get":
					untoldOutput("Get what?");
				break;
				default:
					untoldOutput("I'm sorry I don't understand that command");
				break;
			}
		break;
		case 2:
			switch(input[0]){
				case "go":
					var directionExists = dungeon.rooms[getRoomIndexOnPlayer()].getIndexOfDirection(input[1]);
					if(directionExists != false){
						console.log(directionExists);
						player_o.currentRoom = getRoomIdByName(directionExists);
						untoldOutput(dungeon.rooms[getRoomIndexOnPlayer()].getDescription());
						return;
					}
					else{
						untoldOutput("You cannot go that direction");
						return;
					}
				break;
				default:
					for(var i = 0; i < dungeon.rooms.length; i++){
						if(dungeon.rooms[i].zid == player_o.currentRoom){
							for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
								if(input[1] == dungeon.rooms[i].objects[j].name.toLowerCase()){
									for(var k = 0; k < dungeon.rooms[i].objects[j].verbs.length; k++){
										if(dungeon.rooms[i].objects[j].verbs[k].text == input[0]){
											untoldOutput(dungeon.rooms[i].objects[j].verbs[k].displayText);
											if(dungeon.rooms[i].objects[j].verbs[k].addToPlayerInventory){
												console.log(dungeon.rooms[i].objects + ", " + player_o.inventory);
												player_o.inventory.push(dungeon.rooms[i].objects[j]);
												dungeon.rooms[i].objects.splice(j, 1);
												console.log(dungeon.rooms[i].objects + ", " + player_o.inventory);
											}
											return;
										}
									}
								}
							}
						}
					}
					untoldOutput("I'm sorry I don't understand that command.");
					return;
				break;
			}
		break;
		case 3:
			switch(input[0]){
				default:
					for(var i = 0; i < dungeon.rooms.length; i++){
						if(dungeon.rooms[i].zid == player_o.currentRoom){
							for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
								if(input[2] == dungeon.rooms[i].objects[j].name.toLowerCase() && input[1] == "the" || input[1] == "a"){
									for(var k = 0; k < dungeon.rooms[i].objects[j].verbs.length; k++){
										if(dungeon.rooms[i].objects[j].verbs[k].text == input[0]){
											untoldOutput(dungeon.rooms[i].objects[j].verbs[k].displayText);
											return;
										}
									}
								}
							}
							untoldOutput("I'm sorry I don't understand that command.");
						}
					}
				break;
			}
		break;
	}
	//console.log(document.getElementById("outputArea").scrollTop);
	//console.log(document.getElementById("outputArea").scrollHeight);
	document.getElementById("outputArea").scrollTop = document.getElementById("outputArea").scrollHeight;
}

var initiateRoomEnvironment = function(){

	console.log("Initializing Room Environment");

	//start timers or start delayed timers
	for(var i = 0; i < dungeon.rooms[getRoomIndexOnPlayer()].timers.length; i++){
		console.log(dungeon.rooms[getRoomIndexOnPlayer()].timers[i]);
		switch(dungeon.rooms[getRoomIndexOnPlayer()].timers[i].functionType){
			case "output":
				console.log("output function type");
				var outputInterval = setInterval(function(){
					console.log(dungeon.rooms[getRoomIndexOnPlayer()].timers[0]);
					untoldOutput(dungeon.rooms[getRoomIndexOnPlayer()].timers[0].outputMessage);
					clearInterval(outputInterval);
				}, (dungeon.rooms[getRoomIndexOnPlayer()].timers[i].intervalGap*1000));
			break;
		}
	}


}

var setPlayerStart = function(){
	player_o.spawnPoint = dungeon.rooms[getRoomIndex()].zid;
}
