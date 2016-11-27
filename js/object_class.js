function game_object (n, d, c, pid){
	this.zid = Math.floor(Math.random() * 1000000);
	this.parentId = pid;
	console.log(this.parentId);
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

function direction (type){
	this.type = type;
	this.finalDest = "Please Select Destination Room";
}

function verb (text){
	this.zid = Math.floor(Math.random() * 1000000);
	this.text = text;
	this.displayText;
	this.addToPlayerInventory = false;
}