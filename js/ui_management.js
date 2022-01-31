console.log("Loaded UI Management");

var currentRoomEditing;
var currentObjectEditing;
var currentTimerEditing;
var currentNPCEditing;

var createNewProject = function(){
	console.log("Creating new project");
	var startButtons = document.getElementsByClassName("startButton");
	startButtons[0].style.display = "none";
	startButtons[1].style.display = "none";
	document.getElementById("createNewProjectForm").style.display = "block";
}

var toggleRoomOrganizer = function(){
	console.log("Toggled room organizer");
	if(document.getElementById("roomOrganizer").style.display == "none"){
		document.getElementById("roomOrganizer").style.display = "block";
	}
	else if(document.getElementById("roomOrganizer").style.display == "block"){
		document.getElementById("roomOrganizer").style.display = "none";
	}
	else{
		document.getElementById("roomOrganizer").style.display = "block";
	}
	displayDungeonDetails();
}

var displayDungeonDetails = function(){
	closeDialogues();
	document.getElementById("dungeonDetails").style.display = "block";
	document.getElementById("adventureNameEdit").value = dungeon.name;
	document.getElementById("authorEdit").value = dungeon.creator;
}

var updateDungeonDetails = function(x){
	if(x == 1){
		dungeon.name = document.getElementById("adventureNameEdit").value;
	}
	else if(x == 2){
		dungeon.creator = document.getElementById("authorEdit").value;
	}
	else{
		//nothing
	}
}

var closeDialogues = function(){
	document.getElementById("dungeonDetails").style.display = "none";
	document.getElementById("objectCreator").style.display = "none";
	document.getElementById("roomEditor").style.display = "none";
	document.getElementById("objectEditor").style.display = "none";
	document.getElementById("playerEditor").style.display = "none";
	document.getElementById("roomCreator").style.display = "none";
	document.getElementById("timerCreator").style.display = "none";
	document.getElementById("timerEditor").style.display = "none";
	document.getElementById("npcCreator").style.display = "none";
	document.getElementById("npcEditor").style.display = "none";
}

var toggleRoomCreator = function(){
	closeDialogues();
	document.getElementById("roomCreator").style.display = "block";
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

var cancelCreateRoom = function(){
	document.getElementById("roomName").value = "";
	document.getElementById("roomDescription").value = "";
	document.getElementById("roomCreator").style.display = "none";
	return true;
}

var setVisibleObjectTextStatus = function(){
	var temp;
	if(document.getElementById("visibleObjectTextStatus").value == "true"){
		temp = true;
	}
	else{
		temp = false;
	}
	dungeon.rooms[getRoomIndex()].visibleObjectTextDisplay = temp;
}

var rebuildManager = function(){
	document.getElementById("dungeonManagerPane").innerHTML = "";
	var x = document.createElement("ul");
	var y = document.createElement("li");
	x.appendChild(y);
	y.innerHTML += "<h5 onclick = 'toggleRoomOrganizer()'>Dungeon</h5>"
	var z = document.createElement("ul");
	z.id = "roomOrganizer";
	y.appendChild(z);
	var temp;
	var temp_room_name;
	for(var i = 0; i < dungeon.rooms.length; i++){
		temp = "\
		<li id = 'room_" + dungeon.rooms[i].zid + "'>\
			<h5 onclick = 'toggleRoomObjects(this.parentElement.id)'>" + dungeon.rooms[i].name + "</h5>\
			<ul class = 'objectManager' id = 'objectManager_" + dungeon.rooms[i].zid + "'>";
				for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
					temp += "<li id = 'object_" + dungeon.rooms[i].objects[j].zid + "' onclick = 'toggleObjectDetails(" + dungeon.rooms[i].objects[j].zid + ")'>" + dungeon.rooms[i].objects[j].name + "</li>";
				}
				temp += "<li onclick = 'toggleObjectCreator()'>+ Add Object</li>";
				for(j = 0; j < dungeon.rooms[i].timers.length; j++){
					temp += "<li id = 'timer_" + dungeon.rooms[i].timers[j].zid + "' onclick = 'toggleTimerEditor(" + dungeon.rooms[i].timers[j].zid + ")'>timer_" + dungeon.rooms[i].timers[j].functionType + "</li>";
				}
				temp += "<li onclick = 'toggleTimerCreator()'>+ Add timer</li>";
				for(j = 0; j < dungeon.rooms[i].npcs.length; j++){
					temp += "<li id = 'npc_" + dungeon.rooms[i].npcs[j].zID + "' onclick = 'editNPC(" + dungeon.rooms[i].npcs[j].zID + ")'>" + dungeon.rooms[i].npcs[j].name + "</li>";
				}
				temp += "<li onclick = 'toggleNPCCreator()'>+ Add npc</li>\
			</ul>\
		</li>";
		z.innerHTML += temp;
	}
	z.innerHTML += "<li onclick = 'toggleRoomCreator()'><p>+ Add Room</p></li>"
	document.getElementById("dungeonManagerPane").innerHTML = "<ul style = 'display: block'>" + x.innerHTML + "<li><h5 onmousedown = 'togglePlayerDetails()'>Player</h5></li></ul>";
	for(var j = 0; j < dungeon.rooms.length; j++){
		if(dungeon.rooms[j].uiDisplay){
			document.getElementById("objectManager_" + dungeon.rooms[j].zid).style.display = "block";
		}
		/* for(var h = 0; h < dungeon.rooms[j].objects.length; h++){
			if(dungeon.rooms[j].objects[h].uiDisplay){
				document.getElementById()
			}
		} */
	}
	document.getElementById("roomOrganizer").style.display = "block";
	cancelCreateRoom();
}

var toggleObjectDetails = function(x){
	closeDialogues();
	document.getElementById("objectEditor").style.display = "block";
	var y;
	for(var i = 0; i < dungeon.rooms.length; i++){
		for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
			if(dungeon.rooms[i].objects[j].zid == x){
				dungeon.currentObjectEditing = x;
				y = dungeon.rooms[i].objects[j];
				document.getElementById("objectNameEdit").value = y.name;
				document.getElementById("objectDescriptionEdit").value = y.description;
				document.getElementById("verbsList").innerHTML = "";
				for(var k = 0; k < dungeon.rooms[i].objects[j].verbs.length; k++){
					document.getElementById("verbsList").innerHTML += "<span id = 'span_" + dungeon.rooms[i].objects[j].verbs[k].zid + "'>" + dungeon.rooms[i].objects[j].verbs[k].text + "</span><br />\
					<input type = 'text' placeholder = 'Output' id = 'input_" + dungeon.rooms[i].objects[j].verbs[k].zid + "'></input><input type = 'button' value = 'Update' onclick = 'updateVerbOutput(this.previousSibling.id)'></input>\
					<span>Adds object to inventory: </span><input type = 'checkbox' id = 'checkbox_" + dungeon.rooms[i].objects[j].verbs[k].zid + "' onchange = 'updateCheckVerb(this.id)'></input><br />";
					document.getElementById("checkbox_" + dungeon.rooms[i].objects[j].verbs[k].zid).check = dungeon.rooms[i].objects[j].verbs[k].addToPlayerInventory;
				}
				document.getElementById("verbsList").innerHTML += "<br /><span>Add Verb</span><br /><input type = 'text' placeholder = 'Add Verb' id = 'addVerbInput'></input><input onclick = 'addVerbToObject()' type = 'button' value = 'Add'></input>";
				return;
			}
		}
	}
}

var addVerbToObject = function(){
	console.log("Adding verb to object");
	console.log("There is " + dungeon.rooms.length + " dungeon room(s)");
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == dungeon.currentRoomEditing){
			console.log("Found matching room");
			console.log("This room has " + dungeon.rooms[i].objects.length + " object(s)");
			for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
				if(dungeon.rooms[i].objects[j].zid == dungeon.currentObjectEditing){
					console.log(document.getElementById("addVerbInput").value.trim());
					if(document.getElementById("addVerbInput").value.trim().length > 0){
						console.log(1);
						dungeon.rooms[i].objects[j].verbs.push(new verb(document.getElementById("addVerbInput").value));
						document.getElementById("addVerbInput").value = "";
						toggleObjectDetails(dungeon.currentObjectEditing);
					}
					else{
						alert("Please enter an input for your verb");
					}
				}
			}
		}
	}
}

var updateCheckVerb = function(x){
	x = x.split("_")[1];
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == dungeon.currentRoomEditing){
			for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
				if(dungeon.rooms[i].objects[j].zid == dungeon.currentObjectEditing){
					for(var w = 0; w < dungeon.rooms[i].objects[j].verbs.length; w++){
						if(dungeon.rooms[i].objects[j].verbs[w].zid == x){
							dungeon.rooms[i].objects[j].verbs[w].addToPlayerInventory = document.getElementById("checkbox_" + x).checked;
						}
					}
				}
			}
		}
	}
}

var updateVerbOutput = function(x){
	console.log("Updating verb output with ID:" + x);
	x = x.split("_")[1];
	console.log("New ID: " + x);
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == dungeon.currentRoomEditing){
			console.log("Found current room editing");
			for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
				if(dungeon.rooms[i].objects[j].zid == dungeon.currentObjectEditing){
					console.log("Found current object editing");
					for(var w = 0; w < dungeon.rooms[i].objects[j].verbs.length; w++){
						if(dungeon.rooms[i].objects[j].verbs[w].zid == x){
							console.log("Found current verb editing");
							dungeon.rooms[i].objects[j].verbs[w].displayText = document.getElementById("input_" + x).value;
							console.log("Updated display text");
							return;
						}
					}
				}
			}
		}
	}
}

var toggleRoomObjects = function(zid){
	dungeon.currentRoomEditing = zid.split("_")[1];
	if(document.getElementById("objectManager_" + zid.split("_")[1]).style.display == "block"){
		document.getElementById("objectManager_" + zid.split("_")[1]).style.display = "none";
		for(var i = 0; i < dungeon.rooms.length; i++){
			if(dungeon.rooms[i].zid == dungeon.currentRoomEditing){
				dungeon.rooms[i].uiDisplay = false;
			}
		}
	}
	else{
		document.getElementById("objectManager_" + zid.split("_")[1]).style.display = "block";
		for(var i = 0; i < dungeon.rooms.length; i++){
			if(dungeon.rooms[i].zid == dungeon.currentRoomEditing){
				dungeon.rooms[i].uiDisplay = true;
			}
		}
	}
	toggleRoomEditor();
}

var toggleRoomEditor = function(){
	closeDialogues();
	document.getElementById("roomEditor").style.display = "block";
	var y;
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == dungeon.currentRoomEditing){
			y = dungeon.rooms[i];
		}
	}
	document.getElementById("roomNameEdit").value = y.name;
	document.getElementById("roomDescriptionEdit").value = y.description;

	document.getElementById("currentDirections").innerHTML = "";
	var tempText = "";
	for(var i = 0; i < y.directions.length; i++){
		tempText += "<span>" + y.directions[i].type + "<br /></span><select onchange = 'updateFinalDestination(" + y.zid + ",\"" + y.directions[i].type + "\",this.value)'>";
		tempText += "<option>Please Select Destination Room</option>";
		for(var j = 0; j < dungeon.rooms.length; j++){
			tempText += "<option>" + dungeon.rooms[j].name + "</option>";
		}
		tempText += "</select><br />";
	}
	document.getElementById("currentDirections").innerHTML = tempText;
	document.getElementById("interactionWords").innerHTML = "Default words for rooms are currently: 'look', 'go'";
}

var updateFinalDestination = function(x, y, z){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == x){
			for(var j = 0; j < dungeon.rooms[i].directions.length; j++){
				console.log(dungeon.rooms[i].directions[j]);
				if(dungeon.rooms[i].directions[j].type == y){
					dungeon.rooms[i].directions[j].finalDest = z;
					return;
				}
			}
		}
	}
}

var toggleObjectCreator = function(){
	closeDialogues();
	document.getElementById("objectName").value = "";
	document.getElementById("objectDescription").value = "";
	document.getElementById("objectCreator").style.display = "block";
}

var createObject = function(){
	var x = document.getElementById("objectName").value;
	var y = document.getElementById("objectDescription").value;
	var z = false;//document.getElementById("objectIsContainer").checked;
	if(x.trim().length > 0){
		if(y.trim().length > 0){
			for(var i = 0; i < dungeon.rooms.length; i++){
				if(dungeon.rooms[i].zid == dungeon.currentRoomEditing){
					dungeon.rooms[i].objects.push(new game_object(x, y, z, dungeon.rooms[i].zid));
				}
			}
			rebuildManager();
			return true;
		}
		else{
			alert("Please enter a value for the object description");
			return false;
		}
	}
	else{
		alert("Please enter a value for the object name");
		return false;
	}
	rebuildManager();
}

var cancelCreateObject = function(){
	document.getElementById("objectName").value = "";
	document.getElementById("objectDescription").value = "";
	//document.getElementById("objectIsContainer").checked = false;
	document.getElementById("objectCreator").style.display = "none";
	return true;
}

var toggleTimerCreator = function(){
	closeDialogues();
	document.getElementById("timerCreator").style.display = "block";
}

var toggleTimerEditor = function(x){
	dungeon.currentTimerEditing = x;
	closeDialogues();
	document.getElementById("timerEditor").style.display = "block";
	for(var i = 0; i < dungeon.rooms[getRoomIndex()].timers.length; i++){
		if(dungeon.rooms[getRoomIndex()].timers[i].zid == x){
			document.getElementById("timerIntervalEdit").value = dungeon.rooms[getRoomIndex()].timers[i].intervalGap;
			document.getElementById("timerRepeatEdit").value = dungeon.rooms[getRoomIndex()].timers[i].timerLimit;
			switch(dungeon.rooms[getRoomIndex()].timers[i].functionType){
				case "output":
					document.getElementById("timerFunctionEdit").selectedIndex = 1;
				break;
				case "player":
					document.getElementById("timerFunctionEdit").selectedIndex = 2;
				break;
				case "object":
					document.getElementById("timerFunctionEdit").selectedIndex = 3;
				break;
				case "room":
					document.getElementById("timerFunctionEdit").selectedIndex = 4;
				break;
				default:
					//do nothing
				break;
			}
		}
	}
}

var changeTimerFunctionTier2 = function(x){
	if(x){
		document.getElementById("timerFunctionOutputDetailsEdit").style.display = "none";
		document.getElementById("timerFunctionPlayerDetailsEdit").style.display = "none";
		document.getElementById("timerFunctionObjectDetailsEdit").style.display = "none";
		document.getElementById("timerFunctionRoomDetailsEdit").style.display = "none";
		switch(document.getElementById("timerFunctionEdit").value){
			case "output":
				document.getElementById("timerFunctionOutputDetailsEdit").style.display = "block";
			break;
			case "player":
				document.getElementById("timerFunctionPlayerDetailsEdit").style.display = "block";
			break;
			case "object":
				document.getElementById("timerFunctionObjectDetailsEdit").style.display = "block";
			break;
			case "room":
				document.getElementById("timerFunctionRoomDetailsEdit").style.display = "block";
			break;
			default:
				//do nothing
			break;
		}
	}
	else{
		document.getElementById("timerFunctionOutputDetails").style.display = "none";
		document.getElementById("timerFunctionPlayerDetails").style.display = "none";
		document.getElementById("timerFunctionObjectDetails").style.display = "none";
		document.getElementById("timerFunctionRoomDetails").style.display = "none";
		switch(document.getElementById("timerFunctionCreate").value){
			case "output":
				document.getElementById("timerFunctionOutputDetails").style.display = "block";
			break;
			case "player":
				document.getElementById("timerFunctionPlayerDetails").style.display = "block";
			break;
			case "object":
				document.getElementById("timerFunctionObjectDetails").style.display = "block";
			break;
			case "room":
				document.getElementById("timerFunctionRoomDetails").style.display = "block";
			break;
			default:
				//do nothing
			break;
		}
	}
}

var checkChangeValues = function(w, q){
	if(q){
		var x = document.getElementById("changePlayerHealthFunctionValueEdit").value;
		var y = document.getElementById("changePlayerMagicFunctionValueEdit").value;
		var z = document.getElementById("changePlayerStaminaFunctionValueEdit").value;
		var u = 0;
		if(x != "0"){
			u++;
		}
		if(y != "0"){
			u++;
		}
		if(z != "0"){
			u++;
		}
		if(u > 1){
			if(w != "changePlayerHealthFunctionValueEdit"){
				document.getElementById("changePlayerHealthFunctionValueEdit").value = "0";
			}
			if(w != "changePlayerMagicFunctionValueEdit"){
				document.getElementById("changePlayerMagicFunctionValueEdit").value = "0";
			}
			if(w != "changePlayerStaminaFunctionValueEdit"){
				document.getElementById("changePlayerStaminaFunctionValueEdit").value = "0";
			}
		}
	}
	else{
		var x = document.getElementById("changePlayerHealthFunctionValue").value;
		var y = document.getElementById("changePlayerMagicFunctionValue").value;
		var z = document.getElementById("changePlayerStaminaFunctionValue").value;
		var u = 0;
		if(x != "0"){
			u++;
		}
		if(y != "0"){
			u++;
		}
		if(z != "0"){
			u++;
		}
		if(u > 1){
			if(w != "changePlayerHealthFunctionValue"){
				document.getElementById("changePlayerHealthFunctionValue").value = "0";
			}
			if(w != "changePlayerMagicFunctionValue"){
				document.getElementById("changePlayerMagicFunctionValue").value = "0";
			}
			if(w != "changePlayerStaminaFunctionValue"){
				document.getElementById("changePlayerStaminaFunctionValue").value = "0";
			}
		}
	}
}

var changeObjectTimerFunctionDetails = function(y){
	if(y){
		var x = document.getElementById("objectTimerFunctionEdit").value;
		switch(x){
			case "":
				//document.getElementById("").style.display = "none";
			break;
			default:
				//document.getElementById("").style.display = "block";
				document.getElementById("objectSelectorEdit").innerHTML = "";
				if(dungeon.rooms[getRoomIndex()].objects.length < 1){
					document.getElementById("objectSelectorEdit").innerHTML = "<option value = ''>No objects in room</option>";
				}
				else{
					document.getElementById("objectSelectorEdit").innerHTML = "<option value = ''>Select an object</option>";
				}
				for(var i = 0; i < dungeon.rooms[getRoomIndex()].objects.length; i++){
					document.getElementById("objectSelectorEdit").innerHTML += "<option value = '" + dungeon.rooms[getRoomIndex()].objects[i].zid + "'>" + dungeon.rooms[getRoomIndex()].objects[i].name + "</option>";
				}
			break;
		}
	}
	else{
		var x = document.getElementById("objectTimerFunction").value;
		switch(x){
			case "":
				//document.getElementById("").style.display = "none";
			break;
			default:
				//document.getElementById("").style.display = "block";
				document.getElementById("objectSelector").innerHTML = "";
				if(dungeon.rooms[getRoomIndex()].objects.length < 1){
					document.getElementById("objectSelector").innerHTML = "<option value = ''>No objects in room</option>";
				}
				else{
					document.getElementById("objectSelector").innerHTML = "<option value = ''>Select an object</option>";
				}
				for(var i = 0; i < dungeon.rooms[getRoomIndex()].objects.length; i++){
					document.getElementById("objectSelector").innerHTML += "<option value = '" + dungeon.rooms[getRoomIndex()].objects[i].zid + "'>" + dungeon.rooms[getRoomIndex()].objects[i].name + "</option>";
				}
			break;
		}
	}
}

var changeRoomFunction = function(y){
	if(y){
		var x = document.getElementById("roomTimerFunctionEdit").value;
		switch(x){
			case "":

			break;
			case "directionChange":
				document.getElementById("directionChangeDestinationSelectEdit").innerHTML = "";
				if(dungeon.rooms.length < 2){
					document.getElementById("directionChangeDestinationSelectEdit").innerHTML += "<option value = ''>No more rooms</option>";
				}
				else{
					document.getElementById("directionChangeDestinationSelectEdit").innerHTML += "Please select a destination";
				}
				for(var i = 0; i < dungeon.rooms.length; i++){
					if(i != getRoomIndex()){
						document.getElementById("directionChangeDestinationSelectEdit").innerHTML += "<option value = '" + dungeon.rooms[i].zid + "'>" + dungeon.rooms[i].name + "</option>";
					}
				}
			break;
		}
	}
	else{
		var x = document.getElementById("roomTimerFunction").value;
		switch(x){
			case "":

			break;
			case "directionChange":
				document.getElementById("directionChangeDestinationSelect").innerHTML = "";
				if(dungeon.rooms.length < 2){
					document.getElementById("directionChangeDestinationSelect").innerHTML += "<option value = ''>No more rooms</option>";
				}
				else{
					document.getElementById("directionChangeDestinationSelect").innerHTML += "Please select a destination";
				}
				for(var i = 0; i < dungeon.rooms.length; i++){
					if(i != getRoomIndex()){
						document.getElementById("directionChangeDestinationSelect").innerHTML += "<option value = '" + dungeon.rooms[i].zid + "'>" + dungeon.rooms[i].name + "</option>";
					}
				}
			break;
		}
	}
}

var toggleNPCCreator = function(){
	closeDialogues();
	document.getElementById("npcCreator").style.display = "block";
}

var addDirection = function(){
	var x = document.getElementById("addDirectionSelect").value;
	var y = -1;
	if(x != "Select Direction"){
		for(var i = 0; i < dungeon.rooms.length; i++){
			if(dungeon.rooms[i].zid == currentRoomEditing){
				y = i;
			}
		}

		for(var j = 0; j < dungeon.rooms[y].directions.length; j++){
			if(dungeon.rooms[y].directions[j].type == x){
				return false;
			}
		}
		dungeon.rooms[y].directions.push(new direction(x));
		for(var i = 0; i < dungeon.rooms.length; i++){
			if(dungeon.rooms[i].zid == currentRoomEditing){
				y = dungeon.rooms[i];
			}
		}
		document.getElementById("currentDirections").innerHTML = "";
		var tempText = "";
		for(var i = 0; i < y.directions.length; i++){
			tempText += "<span>" + y.directions[i].type + "<br /></span><select onchange = 'updateFinalDestination(" + y.zid + ",\"" + y.directions[i].type + "\",this.value)'>";
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

var setPlayerStart = function(){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == currentRoomEditing){
			player_o.spawnPoint = dungeon.rooms[i].zid;
			player_o.spawnPoint = dungeon.rooms[i].zid;
		}
	}
}

var updateRoomDescription = function(x){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == currentRoomEditing){
			dungeon.rooms[i].description = x;
		}
	}
}

var updateObjectDescription = function(x){
	for(var i = 0; i < dungeon.rooms.length; i++){
		for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
			if(dungeon.rooms[i].objects[j].zid == currentObjectEditing){
				dungeon.rooms[i].objects[j].description = x;
			}
		}
	}
}

var updateRoomName = function(x){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == currentRoomEditing){
			dungeon.rooms[i].name = x;
		}
	}
}

var updateObjectName = function(x){
	for(var i = 0; i < dungeon.rooms.length; i++){
		for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
			if(dungeon.rooms[i].objects[j].zid == currentObjectEditing){
				dungeon.rooms[i].objects[j].name = x;
			}
		}
	}
}

var replaceHTMLCharacters = function(text){
	text = text.replace(/\n/g, "\\n");
	return text;
}

var saveDungeon = function(){
	dungeon.player = player_o;
	var temp = "{";
	temp += "\"name\":\"" + dungeon.name + "\",";
	temp += "\"creator\":\"" + dungeon.creator + "\",";
	if(dungeon.player == null){
		temp += "\"player\":null,";
	}
	else{
		temp += "\"player\":{"
		temp += "\"spawnPoint\":" + player_o.spawnPoint;
		temp += "},";
	}
	temp += "\"rooms\":[";
	for(var i = 0; i < dungeon.rooms.length; i++){
		temp += "{";
		temp += "\"zid\":" + dungeon.rooms[i].zid + ",";
		temp += "\"name\":\"" + replaceHTMLCharacters(dungeon.rooms[i].name) + "\",";
		temp += "\"description\":\"" + replaceHTMLCharacters(dungeon.rooms[i].description) + "\",";
		temp += "\"directions\":[";
		for(var j = 0; j < dungeon.rooms[i].directions.length; j++){
			temp += "{";
			temp += "\"type\":\"" + dungeon.rooms[i].directions[j].type + "\",";
			temp += "\"finalDest\":\"" + dungeon.rooms[i].directions[j].finalDest + "\"";
			if(j == dungeon.rooms[i].directions.length - 1){
				temp += "}";
			}
			else{
				temp += "},";
			}
		}
		temp += "],";
		temp += "\"interactions\":[";
		for(j = 0; j < dungeon.rooms[i].interactions.length; j++){
			temp += "{";
			temp += "\"zid\":" + dungeon.rooms[i].interactions[j].zid + ",";
			temp += "\"text\":\"" + dungeon.rooms[i].interactions[j].text + "\",";
			temp += "\"displayText\":\"" + replaceHTMLCharacters(dungeon.rooms[i].interactions[j].displayText) + "\",";
			temp += "\"addToPlayerInventory\":" + dungeon.rooms[i].interactions[j].addToPlayerInventory + "";
			temp += "},";
		}
		temp += "],";
		temp += "\"objects\":[";
		for(j = 0; j < dungeon.rooms[i].objects.length; j++){
			temp += "{";
			temp += "\"zid\":" + dungeon.rooms[i].objects[j].zid + ",";
			if(dungeon.rooms[i].objects[j].pid != undefined){
				temp += "\"parentId\":" + dungeon.rooms[i].objects[j].pid + ",";
			}
			else{
				temp += "\"parentId\":\"undefined\",";
			}
			temp += "\"name\":\"" + replaceHTMLCharacters(dungeon.rooms[i].objects[j].name) + "\",";
			temp += "\"description\":\"" + replaceHTMLCharacters(dungeon.rooms[i].objects[j].description) + "\",";
			temp += "\"isContainer\":" + dungeon.rooms[i].objects[j].isContainer + ",";
			temp += "\"objects\":[],";//add object scanner
			temp += "\"verbs\":[";
			for(var k = 0; k < dungeon.rooms[i].objects[j].verbs.length; k++){
				temp += "{";
				temp += "\"zid\":" + dungeon.rooms[i].objects[j].verbs[k].zid + ",";
				temp += "\"text\":\"" + dungeon.rooms[i].objects[j].verbs[k].text + "\",";
				temp += "\"displayText\":\"" + replaceHTMLCharacters(dungeon.rooms[i].objects[j].verbs[k].displayText) + "\",";
				temp += "\"addToPlayerInventory\":" + dungeon.rooms[i].objects[j].verbs[k].addToPlayerInventory + "";
				if(k == dungeon.rooms[i].objects[j].verbs.length - 1){
					temp += "}";
				}
				else{
					temp += "},";
				}
			}
			temp += "]";
			//temp += "\"uiDisplay\":" + dungeon.rooms[i].objects[j].uiDisplay + "";
			if(j == dungeon.rooms[i].objects.length - 1){
				temp += "}";
			}
			else{
				temp += "},";
			}
		}
		temp += "]";
		//temp += "\"uiDisplay\":" + dungeon.rooms[i].uiDisplay + "";
		if(i == dungeon.rooms.length - 1){
			temp += "}";
		}
		else{
			temp += "},";
		}
	}
	temp += "]";
	temp += "}";
	document.getElementById("saveDungeonData").value = temp;
	document.getElementById("saveDungeonName").value = dungeon.name;
	if(JSON.parse(temp)){
		console.log(temp);
		//document.getElementById("saveDungeonForm").submit();
	}
	else{
		alert("Saving error!");
	}
}

var devGame = function(){
	document.getElementById("runActivity").style.display = "none";
	document.getElementById("builderActivity").style.display = "block";
	document.getElementById("devButton").style.display = "none";
	dungeon = savedDungeon;
	player_o.inventory = [];
	console.log(dungeon);
	rebuildManager();
}

var savedDungeon;

var runGame = function(){
	if(savedDungeon != null){
		dungeon = savedDungeon;
	}
	player_o.inventory = [];
	document.getElementById("runActivity").style.display = "block";
	document.getElementById("builderActivity").style.display = "none";
	document.getElementById("devButton").style.display = "block";
	//reset game stuff
	savedDungeon = null;
	savedDungeon = dungeon;
	document.getElementById("outputArea").innerHTML = "";
	document.getElementById("untoldInput").value = "";
	player_o.currentRoom = player_o.spawnPoint;
	if(dungeon.rooms.length > 0){
		document.getElementById("outputArea").innerHTML += "> " + dungeon.rooms[getRoomIndexOnPlayer()].getDescription() + "<br />";
	}
	else{
		document.getElementById("outputArea").innerHTML += "> You need to create a room to start your development journey =)" + "<br />";
	}
	//initiateRoomEnvironment();
}

var isLoggedIn = function(){
	var myCookie = document.cookie.split(';');
	var ok = true;
	for(var i = 0; i < myCookie.length; i++){
		if(myCookie[i].split("=")[0] == "userloggedin"){
			if(myCookie[i].split("=")[1] == ""){
				ok = false;
			}
		}
		if(myCookie[i].split("=")[0] == "uservalue"){
			if(myCookie[i].split("=")[1] == ""){
				ok = false;
			}
		}
	}
	if(ok){
		var findProfile = new XMLHttpRequest();
		findProfile.onreadystatechange = function(){
			if(findProfile.readyState == 4 && findProfile.status == 200){
				if(findProfile.responseText != "Failed to find user"){
					document.getElementById("greeting").innerHTML = "Welcome, " + findProfile.responseText;
					document.getElementById("loginButtons").style.display = "none";
				}
				else{
					console.log("Failed to login user");
				}
			}
		};
		findProfile.open("GET", "http://toymakersdev.com/untoldTales/php/grabProfile.php", true);
		findProfile.send();
		return;
	}
}

var loadGames = function(){
	var loadGamesConnect = new XMLHttpRequest();
	loadGamesConnect.onreadystatechange = function(){
		if(loadGamesConnect.readyState == 4 && loadGamesConnect.status == 200){
			var listGames = loadGamesConnect.responseText;
			listGames = listGames.split(",");
			document.getElementById("projectLoadDisplay").innerHTML = "";
			for(var i = 0; i < listGames.length; i++){
				document.getElementById("projectLoadDisplay").innerHTML += "<div class = 'gameLoadListItem' onclick = 'grabDungeon(this.innerHTML)'>" + listGames[i] + "</div>";
			}
			document.getElementById("createNewButton").style.display = "none";
			document.getElementById("loadGameButton").style.display = "none";
			document.getElementById("projectLoadDisplay").style.display = "block";
		}
	};
	loadGamesConnect.open("GET", "http://toymakersdev.com/untoldTales/php/loadGames.php", true);
	loadGamesConnect.send();
	return;
}

var grabDungeon = function(x){
	var grabGame = new XMLHttpRequest();
	grabGame.onreadystatechange = function(){
		if(grabGame.readyState == 4 && grabGame.status == 200){
			dungeon = JSON.parse(grabGame.responseText);
			player_o = dungeon.player;
			document.getElementById("startActivity").style.display = "none";
			document.getElementById("builderActivity").style.display = "block";
			document.getElementById("saveButton").style.display = "block";
			document.getElementById("runButton").style.display = "block";
			rebuildManager();
		}
	};
	grabGame.open("GET", "http://toymakersdev.com/untoldTales/php/grabGame.php?dungeon=" + x, true);
	grabGame.send();
	return;
}


var togglePlayerDetails = function(){
	closeDialogues();
	document.getElementById("playerEditor").style.display = "block";
}

var togglePlayerAdvancedDetails = function(){
	if(document.getElementById("playerAdvancedSettings").style.display == "none"){
		document.getElementById("playerAdvancedSettings").style.display = "block";
		document.getElementById("advancedSettingsButton").value = "-";
	}
	else if(document.getElementById("playerAdvancedSettings").style.display == "block"){
		document.getElementById("playerAdvancedSettings").style.display = "none";
		document.getElementById("advancedSettingsButton").value = "+";
	}
	else{
		document.getElementById("playerAdvancedSettings").style.display = "block";
		document.getElementById("advancedSettingsButton").value = "-";
	}
}

var createNPC = function(){
	var x = document.getElementById("npcNameCreate").value;
	var y = document.getElementById("npcClassCreate").value;
	var z = document.getElementById("npcBehaviorCreate").value;
	var w = document.getElementById("npcHealthCreate").value;
	var v = document.getElementById("npcDamageCreate").value;
	if(x == ""){
		alert("Enter a name for your npc");
		return;
	}
	else{
		if(y == ""){
			alert("Please select a class for your npc");
			return;
		}
		else{
			if(z == ""){
				alert("Please select a behavior for your npc");
				return;
			}
			else{
				if(w == ""){
					alert("Please enter a health amount for your npc");
					return;
				}
				else{
					if(v == ""){
						alert("Please enter a damage amount for your npc");
						return;
					}
					else{
						dungeon.rooms[getRoomIndex()].npcs.push(new npc(x, y, z, w, v));
						rebuildManager();
						closeDialogues();
					}
				}
			}
		}
	}
}

var editNPC = function(x){
	currentNPCEditing = x;
	toggleNPCEditor();
}

var toggleNPCEditor = function(){
	var x = dungeon.rooms[getRoomIndex()].npcs[getCurrentNPC()];
	closeDialogues();
	document.getElementById("npcEditor").style.display = "block";
	document.getElementById("npcNameEdit").value = x.name;
	document.getElementById("npcClassEdit").value = x.zClass;
	document.getElementById("npcBehaviorEdit").value = x.behavior;
	document.getElementById("npcHealthEdit").value = x.health;
	document.getElementById("npcDamageEdit").value = x.damage;
}

var saveNPC = function(x){
	switch(x){
		case "npcNameEdit":
			if(document.getElementById(x).value == ""){
				alert("Please enter a name for the npc");
				return;
			}
			dungeon.rooms[getRoomIndex()].npcs[getCurrentNPC()].name = document.getElementById(x).value;
		break;
		case "npcClassEdit":
			if(document.getElementById(x).value == ""){
				alert("Please select a class for the npc");
				return;
			}
			dungeon.rooms[getRoomIndex()].npcs[getCurrentNPC()].name = document.getElementById(x).value;
		break;
		case "npcBehaviorEdit":
			if(document.getElementById(x).value == ""){
				alert("Please select a behavior for the npc");
				return;
			}
			dungeon.rooms[getRoomIndex()].npcs[getCurrentNPC()].behavior = document.getElementById(x).value;
		break;
		case "npcHealthEdit":
			if(document.getElementById(x).value == ""){
				alert("Please enter a health for the npc");
				return;
			}
			dungeon.rooms[getRoomIndex()].npcs[getCurrentNPC()].health = document.getElementById(x).value;
		break;
		case "npcDamageEdit":
			if(document.getElementById(x).value == ""){
				alert("Please enter a damage for the npc");
				return;
			}
			dungeon.rooms[getRoomIndex()].npcs[getCurrentNPC()].damage = document.getElementById(x).value;
		break;
		default:
			console.log("error");
		break;
	}
}
