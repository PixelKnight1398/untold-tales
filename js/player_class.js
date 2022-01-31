console.log("Loaded player class");

var player_o = {
	spawnPoint: 0,
	currentRoom: 0,

	inventoryEnabled: true,
	inventory: [],

	healthEnabled: false,
	totalHealth: 0,
	currentHealth: 0,

	staminaEnabled: false,
	totalStamina: 0,
	currentStamina: 0,

	magicEnabled: false,
	totalMagic: 0,
	currentMagic: 0,

	setInventoryEnabledStatus: function(){
		this.inventoryEnabled = document.getElementById("inventoryEnabledStatus").value;
	},

	setHealthEnabledStatus: function(){
		this.healthEnabled = document.getElementById("healthEnabledStatus").value;
		if(this.healthEnabled == "true"){
			document.getElementById("playerTotalHealthInputContainer").style.display = "block";
		}
		else{
			document.getElementById("playerTotalHealthInputContainer").style.display = "none";
		}
	},

	setPlayerTotalHealth: function(){
		this.totalHealth = document.getElementById("playerTotalHealthInput").value;
	},

	setStaminaEnabledStatus: function(){
		this.staminaEnabled = document.getElementById("staminaEnabledStatus").value;
		if(this.staminaEnabled == "true"){
			document.getElementById("playerTotalStaminaInputContainer").style.display = "block";
		}
		else{
			document.getElementById("playerTotalStaminaInputContainer").style.display = "none";
		}
	},

	setPlayerTotalStamina: function(){
		this.totalStamina = document.getElementById("playerTotalStaminaInput").value;
	},

	setMagicEnabledStatus: function(){
		this.magicEnabled = document.getElementById("magicEnabledStatus").value;
		if(this.magicEnabled == "true"){
			document.getElementById("playerTotalMagicInputContainer").style.display = "block";
		}
		else{
			document.getElementById("playerTotalMagicInputContainer").style.display = "none";
		}
	},

	setPlayerTotalMagic: function(){
		this.totalMagic = document.getElementById("playerTotalMagicInput").value;
	},
}
