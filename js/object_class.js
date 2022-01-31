console.log("Loaded object class");

var getObjectIndex = function(){
	for(var i = 0; i < dungeon.rooms.length; i++){
		for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
			if(dungeon.rooms[i].objects[j].zid == dungeon.currentObjectEditing){
				return j;
			}
		}
	}
	return -1;
}

function game_object (n, d, c, pid){
	this.zid = Math.floor(Math.random() * 1000000);
	this.parentId = pid;
	this.name = n;
	this.description = d;
	this.isContainer = c;

	this.objects = null;

	this.verbs = [];

	if(this.isContainer){
		this.objects = [];
	}

	this.uiDisplay = false;
}

game_object.prototype.setName = function(x){
	this.name = x;
}

game_object.prototype.setDescription = function(x){
	this.description = x;
}

game_object.prototype.loadEdit = function(){
	closeDialogues();
	document.getElementById("objectEditor").style.display = "block";
	document.getElementById("objectNameEdit").value = this.name;
	document.getElementById("objectDescriptionEdit").value = this.description;
	document.getElementById("verbsList").innerHTML = "";
	for(var k = 0; k < this.verbs.length; k++){
		document.getElementById("verbsList").innerHTML += "<span id = 'span_" + this.verbs[k].zid + "'>" + this.verbs[k].text + "</span><br />\
		<input type = 'text' placeholder = 'Output' id = 'input_" + this.verbs[k].zid + "' onfocus = 'dungeon.currentVerbEditing = " + this.verbs[k].zid + "' onchange = 'dungeon.rooms[getRoomIndex()].objects[getObjectIndex()].verbs[getVerbIndex()].updateOutput()'>\
		<span>Adds object to inventory: </span><input type = 'checkbox' id = 'checkbox_" + this.verbs[k].zid + "' onfocus = 'dungeon.currentVerbEditing = " + this.verbs[k].zid + "' onchange = 'dungeon.rooms[getRoomIndex()].objects[getObjectIndex()].verbs[getVerbIndex()].updateInventoryBoolean()'></input>";
		document.getElementById("checkbox_" + this.verbs[k].zid).checked = this.verbs[k].addToPlayerInventory;
	}
	document.getElementById("verbsList").innerHTML += "<br /><span>Add Verb</span><br /><input type = 'text' placeholder = 'Add Verb' id = 'addVerbInput'></input><input onclick = 'dungeon.rooms[getRoomIndex()].objects[getObjectIndex()].appendVerb()' type = 'button' value = 'Add'></input>";
	return;
}

game_object.prototype.appendVerb = function(){
	if(document.getElementById("addVerbInput").value.trim().length > 0){
		this.verbs.push(new verb(document.getElementById("addVerbInput").value));
		document.getElementById("addVerbInput").value = "";
		this.loadEdit();
	}
	else{
		alert("Please enter an input for your verb");
	}
}

var createObject = function(){
	var x = document.getElementById("objectName").value;
	var y = document.getElementById("objectDescription").value;
	var z = false;//document.getElementById("objectIsContainer").checked;
	if(x.trim().length > 0){
		if(y.trim().length > 0){
			dungeon.rooms[getRoomIndex()].objects.push(new game_object(x, y, z, dungeon.rooms[getRoomIndex()].zid));
			rebuildManager();
			return true;
		}
		alert("Please enter a value for the object description");
		return false;
	}
	alert("Please enter a value for the object name");
	return false;
}

var cancelCreateObject = function(){
	document.getElementById("objectName").value = "";
	document.getElementById("objectDescription").value = "";
	document.getElementById("objectIsContainer").checked = false;
	document.getElementById("objectCreator").style.display = "none";
	return true;
}

function verb (text){
	this.zid = Math.floor(Math.random() * 1000000);
	this.text = text;
	this.displayText;
	this.addToPlayerInventory = false;
}

verb.prototype.updateOutput = function(){
	this.displayText = document.getElementById("input_" + this.zid).value;
}

verb.prototype.updateInventoryBoolean = function(){
	this.addToPlayerInventory = document.getElementById("checkbox_" + this.zid).checked;
}

var getVerbIndex = function(){
	for(var i = 0; i < dungeon.rooms.length; i++){
		for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
			for(var q = 0; q < dungeon.rooms[i].objects[j].verbs.length; q++){
				if(dungeon.rooms[i].objects[j].verbs[q].zid == dungeon.currentVerbEditing){
					return q;
				}
			}
		}
	}
	return -1;
}
