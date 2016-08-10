var master = {
    title: "",
    description: "",
    roomHandler: [],
};

function room(){
    this.id = 0;
    this.name = "";
    this.look = "";
    this.objectHandler = [];
}

function object(){
    this.id = 0;
    this.name = "";
    this.look = "";
    this.itemHandler = [];
}

var player = {
    inventory: [],
};