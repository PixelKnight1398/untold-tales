function room_c (n, d){
	this.zid = Math.floor(Math.random() * 1000000);
	this.name = n;
	this.description = d;
	
	this.directions = [];
	
	this.interactions = [];
	
	this.objects = [];
	
	this.timers = [];
	
	this.visibleObjectTextDisplay = true;
	
	this.uiDisplay = false;
	
	return this.zid;
}

var getRoomDescription = function(x){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == x){
			if(dungeon.rooms[i].visibleObjectTextDisplay){
				var temp = "You can see ";
				for(var j = 0; j < dungeon.rooms[i].objects.length; j++){
					if(j < dungeon.rooms[i].objects.length - 1){
						temp += "a " + dungeon.rooms[i].objects[j].name + ", ";
					}
					else{
						temp += "and a " + dungeon.rooms[i].objects[j].name + ".";
					}
				}
				if(dungeon.rooms[i].objects.length < 1){
					temp += "nothing.";
				}
				return dungeon.rooms[i].description + "<br /><br />" + temp;
			}
			else{
				return dungeon.rooms[i].description;
			}
		}
	}
}

var roomDirectionExists = function(x, y){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].zid == x){
			console.log(0);
			for(var j = 0; j < dungeon.rooms[i].directions.length; j++){
				console.log(dungeon.rooms[i].directions[j].type.toLowerCase() + ", " + y);
				if(dungeon.rooms[i].directions[j].type.toLowerCase() == y){
					return dungeon.rooms[i].directions[j].finalDest;
				}
			}
			return false;
		}
	}
}

var getRoomIdByName = function(x){
	for(var i = 0; i < dungeon.rooms.length; i++){
		if(dungeon.rooms[i].name == x){
			return dungeon.rooms[i].zid;
		}
	}
}