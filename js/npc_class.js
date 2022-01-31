console.log("Loaded npc class");

function npc (x, y, z, w, v){
	this.zID = Math.floor(Math.random() * 1000000);
	this.name = x;
	this.zClass = y;
	this.behavior = z;
	this.health = w;
	this.damage = v;
}

var getCurrentNPC = function(){
	for(var i = 0; i < dungeon.rooms[getRoomIndex()].npcs.length; i++){
		if(dungeon.rooms[getRoomIndex()].npcs[i].zID == dungeon.currentNPCEditing){
			return i;
		}
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
	if(y == ""){
		alert("Please select a class for your npc");
		return;
	}
	if(z == ""){
		alert("Please select a behavior for your npc");
		return;
	}
	if(w == ""){
		alert("Please enter a health amount for your npc");
		return;
	}
	if(v == ""){
		alert("Please enter a damage amount for your npc");
		return;
	}
	dungeon.rooms[getRoomIndex()].npcs.push(new npc(x, y, z, w, v));
	rebuildManager();
	closeDialogues();
}

var editNPC = function(x){
	dungeon.currentNPCEditing = x;
	toggleNPCEditor();
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
