console.log("Loaded timer class");

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

gameTimer.prototype.setInfo = function(){
	var myData = testTimerInfo("Edit");
	if(myData != false){
		this.functionType = myData[0];
		switch(myData[0]){
			case "output":
				this.outputMessage = myData[1];
			break;
			case "player":
				this.changePlayer = myData[1][0];
				this.changeValue = myData[1][0];
			break;
			case "object":
				this.changeObject = myData[1][0];
				this.objectId = myData[1][0];
			break;
			case "room":
				this.direction = myData[1];
			break;
			default:
				//do nothing
			break;
		}
		this.intervalGap = myData[2];
		this.timerLimit = myData[3];
		rebuildManager();
	}
}

var getTimerIndex = function(){
	for(var i = 0; i < dungeon.rooms.length; i++){
		for(var j = 0; j < dungeon.rooms[i].timers.length; j++){
			if(dungeon.rooms[i].timers[j].zid == dungeon.currentTimerEditing){
				return j;
			}
		}
	}
	return -1;
}

var testTimerInfo = function(x){
	console.log("Pulling timer data: " + x);
	if(document.getElementById("timerInterval" + x).value != ""){
		console.log("TimerIntervalCreate value: " + document.getElementById("timerInterval" + x).value);
		if(document.getElementById("timerRepeat" + x).value != ""){
			console.log("TimerIntervalRepeat value: " + document.getElementById("timerRepeat" + x).value);
			if(document.getElementById("timerFunction" + x).value != ""){
				console.log("TimerIntervalFunction value: " + document.getElementById("timerFunction" + x).value);
				var x = document.getElementById("timerFunction" + x).value;
				var y = "";
				var z = document.getElementById("timerIntervalCreate").value;
				var w = document.getElementById("timerRepeatCreate").value;
				console.log("(" + x + ", " + y + ", " + z + ", " + w + ")");
				switch(x){
					case "output":
						console.log("Function is output type");
						y = document.getElementById("tFuncOutputMessInput").value;
					break;
					case "player":
						y = [];
						if(document.getElementById("changePlayerHealthFunctionValue" + x).value > 0){
							y[0] = "health";
							y[1] = document.getElementById("changePlayerHealthFunctionValue" + x).value;
						}
						else if(document.getElementById("changePlayerMagicFunctionValue" + x).value > 0){
							y[0] = "magic";
							y[1] = document.getElementById("changePlayerMagicFunctionValue" + x).value;
						}
						else if(document.getElementById("changePlayerStaminaFunctionValue" + x).value > 0){
							y[0] = "stamina";
							y[1] = document.getElementById("changePlayerStaminaFunctionValue" + x).value;
						}
						else{
							alert("Please select a player effect and value =)");
							return false;
						}
					break;
					case "object":
						y[0] = document.getElementById("objectTimerFunction" + x).value;
						if(y[0] == ""){
							alert("Please select an object function =)");
							return false;
						}
						else{
							y[1] = document.getElementById("objectSelector" + x).value;
						}
					break;
					case "room":
						y = document.getElementById("directionChangeDestinationSelect" + x).value;
						if(y == ""){
							alert("Please select a room destination =)");
							return false;
						}
					break;
					default:
						console.warn("ERROR: Failed to find function value");
					break;
				}
				console.log("New Y Data: " + y);
				return new Array(x, y, z, w);
			}
			else{
				alert("Please choose a function type =)");
				return false;
			}
		}
		else{
			alert("Please enter a repeat limit");
			return false;
		}
	}
	else{
		alert("Please enter a time interval in milliseconds =)");
		return false;
	}
}

var createTimer = function(){
	var myData = testTimerInfo("Create");
	if(myData != false){
		dungeon.rooms[getRoomIndex()].timers.push(new gameTimer(myData[0], myData[1], parseInt(myData[2]), parseInt(myData[3])));
		document.getElementById("timerCreator").style.display = "none";
		toggleRoomEditor();
		rebuildManager();
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

var cancelTimerChanges = function(){
	closeDialogues();
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
