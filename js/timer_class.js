function gameTimer (type, x, y, z){
	//x parameter can represent multiple types of data.
	this.functionType = type;
	this.zid = Math.floor(Math.random() * 1000000);
	
	switch(type){
		case "output":
			this.outputMessage = x;
		break;
		case "player":
			this.changePlayer = x[0];
			this.changeValue = x[1];
		break;
		case "object":
			this.changeObject = x[0];
			this.objectId = x[1];
		break;
		case "room":
			this.direction = x;
		break;
		default:
			//do nothing
		break;
	}
	
	this.intervalGap = y;
	this.timerLimit = z;
}

var createTimer = function(){
	if(document.getElementById("timerIntervalCreate").value != ""){
		if(document.getElementById("timerRepeatCreate").value != ""){
			if(document.getElementById("timerFunctionCreate").value != ""){
				var x = document.getElementById("timerFunctionCreate").value;
				var y;
				switch(x){
					case "output":
						y = document.getElementById("tFuncOutputMessInput").value;
					break;
					case "player":
						y = [];
						if(document.getElementById("changePlayerHealthFunctionValue").value > 0){
							y[0] = "health";
							y[1] = document.getElementById("changePlayerHealthFunctionValue").value;
						}
						else if(document.getElementById("changePlayerMagicFunctionValue").value > 0){
							y[0] = "magic";
							y[1] = document.getElementById("changePlayerMagicFunctionValue").value;
						}
						else if(document.getElementById("changePlayerStaminaFunctionValue").value > 0){
							y[0] = "stamina";
							y[1] = document.getElementById("changePlayerStaminaFunctionValue").value;
						}
						else{
							alert("Please select a player effect and value =)");
							return;
						}
					break;
					case "object":
						y[0] = document.getElementById("objectTimerFunction").value;
						if(y[0] == ""){
							alert("Please select an object function =)");
							return;
						}
						else{
							y[1] = document.getElementById("objectSelector").value;
						}
					break;
					case "room":
						y = document.getElementById("directionChangeDestinationSelect").value;
						if(y == ""){
							alert("Please select a room destination =)");
							return;
						}
					break;
				}
				var z = document.getElementById("timerIntervalCreate").value;
				var w = document.getElementById("timerRepeatCreate").value;
				dungeon.rooms[getRoomIndex()].timers.push(new gameTimer(x, y, parseInt(z), parseInt(w)));
				document.getElementById("timerCreator").style.display = "none";
				toggleRoomEditor();
				rebuildManager();
			}
			else{
				alert("Please choose a function type =)");
			}
		}
		else{
			alert("Please enter a repeat limit");
		}
	}
	else{
		alert("Please enter a time interval in milliseconds =)");
	}
}

var cancelCreateTimer = function(){
	document.getElementById("timerCreator").style.display = "none";
	document.getElementById("timerIntervalCreate").value = "";
	document.getElementById("timerFunctionCreate").selectedIndex = 0;
	document.getElementById("tFuncOutputMessInput").value = "";
	document.getElementById("changePlayerHealthFunctionValue").value = "";
	document.getElementById("changePlayerMagicFunctionValue").value = "";
	document.getElementById("changePlayerStaminaFunctionValue").value = "";
	document.getElementById("objectTimerFunction").selectedIndex = 0;
	document.getElementById("objectSelector").innerHTML = "";
	document.getElementById("roomTimerFunction").selectedIndex = 0;
	document.getElementById("directionChangeDestinationSelect").innerHTML = "";
	document.getElementById("timerRepeatCreate").value = "";
}

var saveTimerChanges = function(){
	if(document.getElementById("timerIntervalEdit").value != ""){
		if(document.getElementById("timerRepeatEdit").value != ""){
			if(document.getElementById("timerFunctionEdit").value != ""){
				var x = document.getElementById("timerFunctionEdit").value;
				var y;
				switch(x){
					case "output":
						y = document.getElementById("tFuncOutputMessInput").value;
					break;
					case "player":
						y = [];
						if(document.getElementById("changePlayerHealthFunctionValueEdit").value > 0){
							y[0] = "health";
							y[1] = document.getElementById("changePlayerHealthFunctionValueEdit").value;
						}
						else if(document.getElementById("changePlayerMagicFunctionValueEdit").value > 0){
							y[0] = "magic";
							y[1] = document.getElementById("changePlayerMagicFunctionValueEdit").value;
						}
						else if(document.getElementById("changePlayerStaminaFunctionValueEdit").value > 0){
							y[0] = "stamina";
							y[1] = document.getElementById("changePlayerStaminaFunctionValueEdit").value;
						}
						else{
							alert("Please select a player effect and value =)");
							return;
						}
					break;
					case "object":
						y[0] = document.getElementById("objectTimerFunctionEdit").value;
						if(y[0] == ""){
							alert("Please select an object function =)");
							return;
						}
						else{
							y[1] = document.getElementById("objectSelectorEdit").value;
						}
					break;
					case "room":
						y = document.getElementById("directionChangeDestinationSelectEdit").value;
						if(y == ""){
							alert("Please select a room destination =)");
							return;
						}
					break;
				}
				var z = document.getElementById("timerIntervalEdit").value;
				var w = document.getElementById("timerRepeatEdit").value;
				for(var i = 0; i < dungeon.rooms[getRoomIndex()].timers.length; i++){
					if(dungeon.rooms[getRoomIndex()].timers[i].zid == currentTimerEditing){
						dungeon.rooms[getRoomIndex()].timers[i].functionType = x;
						switch(x){
							case "output":
								dungeon.rooms[getRoomIndex()].timers[i].outputMessage = y;
							break;
							case "player":
								dungeon.rooms[getRoomIndex()].timers[i].changePlayer = y[0];
								dungeon.rooms[getRoomIndex()].timers[i].changeValue = y[1];
							break;
							case "object":
								dungeon.rooms[getRoomIndex()].timers[i].changeObject = y[0];
								dungeon.rooms[getRoomIndex()].timers[i].objectId = y[1];
							break;
							case "room":
								dungeon.rooms[getRoomIndex()].timers[i].direction = y;
							break;
							default:
								//do nothing
							break;
						}
						dungeon.rooms[getRoomIndex()].timers[i].intervalGap = z;
						dungeon.rooms[getRoomIndex()].timers[i].timerLimit = w;
					}
				}
				rebuildManager();
			}
			else{
				alert("Please choose a function type =)");
			}
		}
		else{
			alert("Please enter a repeat limit");
		}
	}
	else{
		alert("Please enter a time interval in milliseconds =)");
	}
}

var cancelTimerChanges = function(){
	closeDialogues();
}