console.log("Loaded dungeon class");

var dungeon = {
	name: "test_dungeon",
	creator: "PixelKnight",

	player: null,

	rooms: [],

	currentRoomEditing: null,
	currentObjectEditing: null,
	currentVerbEditing: null,
	currentTimerEditing: null,
	currentNPCEditing: null,

	set: function(){
		console.log("Setting dungeon name and author");
		this.name = document.getElementById("adventureName").value;
		this.creator = document.getElementById("authorName").value;
		if(this.name.trim() == ""){
			alert("Please enter a value for your adventure name.");
			console.log("ERROR: Need value for adventure");
			return;
		}
		if(this.name.trim().length > 50){
			alert("Please enter a shorter name for you adventure");
			console.log("ERROR: Need shorter value for adventure");
			return;
		}
		if(this.creator.trim() == ""){
			alert("Please enter a value for the author name.");
			console.log("ERROR: Need value for adventure");
			return;
		}
		if(this.creator.trim().length > 50){
			alert("Please enter a shorter name for the author");
			console.log("ERROR: Need shorter value for author");
			return;
		}
		document.getElementById("startActivity").style.display = "none";
		document.getElementById("builderActivity").style.display = "block";
		document.getElementById("saveButton").style.display = "block";
		document.getElementById("runButton").style.display = "block";
		console.log("New interface loaded");
	},

	update: function(){
		this.player = player_o;
		var temp = "{";
		temp += "\"name\":\"" + this.name + "\",";
		temp += "\"creator\":\"" + this.creator + "\",";
		if(this.player == null){
			temp += "\"player\":null,";
		}
		else{
			temp += "\"player\":{"
			temp += "\"spawnPoint\":" + player_o.spawnPoint;
			temp += "},";
		}
		temp += "\"rooms\":[";
		for(var i = 0; i < this.rooms.length; i++){
			temp += "{";
			temp += "\"zid\":" + this.rooms[i].zid + ",";
			temp += "\"name\":\"" + replaceHTMLCharacters(this.rooms[i].name) + "\",";
			temp += "\"description\":\"" + replaceHTMLCharacters(this.rooms[i].description) + "\",";
			temp += "\"directions\":[";
			for(var j = 0; j < this.rooms[i].directions.length; j++){
				temp += "{";
				temp += "\"type\":\"" + this.rooms[i].directions[j].type + "\",";
				temp += "\"finalDest\":\"" + this.rooms[i].directions[j].finalDest + "\"";
				if(j == this.rooms[i].directions.length - 1){
					temp += "}";
				}
				else{
					temp += "},";
				}
			}
			temp += "],";
			temp += "\"interactions\":[";
			for(j = 0; j < this.rooms[i].interactions.length; j++){
				temp += "{";
				temp += "\"zid\":" + this.rooms[i].interactions[j].zid + ",";
				temp += "\"text\":\"" + this.rooms[i].interactions[j].text + "\",";
				temp += "\"displayText\":\"" + replaceHTMLCharacters(this.rooms[i].interactions[j].displayText) + "\",";
				temp += "\"addToPlayerInventory\":" + this.rooms[i].interactions[j].addToPlayerInventory + "";
				temp += "},";
			}
			temp += "],";
			temp += "\"objects\":[";
			for(j = 0; j < this.rooms[i].objects.length; j++){
				temp += "{";
				temp += "\"zid\":" + this.rooms[i].objects[j].zid + ",";
				if(this.rooms[i].objects[j].pid != undefined){
					temp += "\"parentId\":" + this.rooms[i].objects[j].pid + ",";
				}
				else{
					temp += "\"parentId\":\"undefined\",";
				}
				temp += "\"name\":\"" + replaceHTMLCharacters(this.rooms[i].objects[j].name) + "\",";
				temp += "\"description\":\"" + replaceHTMLCharacters(this.rooms[i].objects[j].description) + "\",";
				temp += "\"isContainer\":" + this.rooms[i].objects[j].isContainer + ",";
				temp += "\"objects\":[],";//add object scanner
				temp += "\"verbs\":[";
				for(var k = 0; k < this.rooms[i].objects[j].verbs.length; k++){
					temp += "{";
					temp += "\"zid\":" + this.rooms[i].objects[j].verbs[k].zid + ",";
					temp += "\"text\":\"" + this.rooms[i].objects[j].verbs[k].text + "\",";
					temp += "\"displayText\":\"" + replaceHTMLCharacters(this.rooms[i].objects[j].verbs[k].displayText) + "\",";
					temp += "\"addToPlayerInventory\":" + this.rooms[i].objects[j].verbs[k].addToPlayerInventory + "";
					if(k == this.rooms[i].objects[j].verbs.length - 1){
						temp += "}";
					}
					else{
						temp += "},";
					}
				}
				temp += "]";
				//temp += "\"uiDisplay\":" + this.rooms[i].objects[j].uiDisplay + "";
				if(j == this.rooms[i].objects.length - 1){
					temp += "}";
				}
				else{
					temp += "},";
				}
			}
			temp += "]";
			//temp += "\"uiDisplay\":" + this.rooms[i].uiDisplay + "";
			if(i == this.rooms.length - 1){
				temp += "}";
			}
			else{
				temp += "},";
			}
		}
		temp += "]";
		temp += "}";
		document.getElementById("saveDungeonData").value = temp;
		document.getElementById("saveDungeonName").value = this.name;
		if(JSON.parse(temp)){
			console.log(temp);
			return temp;
			//document.getElementById("saveDungeonForm").submit();
		}
		else{
			alert("Saving error!");
		}
	},

	save: function(){
		var gameData = dungeon.update();
		var fileName = dungeon.name + "_" + dungeon.creator + ".txt";
	},

};
