function gameTimer (type, x){
	//x parameter can represent multiple types of data.
	this.functionType = type;
	
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
				dungeon.rooms[getRoomIndex()].timers.push(new gameTimer(x, y));
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