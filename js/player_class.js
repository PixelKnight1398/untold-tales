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
	
	updatePlayerTotalHealth: function(){
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
	
	updatePlayerTotalStamina: function(){
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
	
	updatePlayerTotalMagic: function(){
		this.totalMagic = document.getElementById("playerTotalMagicInput").value;
	},
}

var togglePlayerAdvancedDetails = function(){
	if(document.getElementById("playerAdvancedSettings").style.display == "none"){
		document.getElementById("playerAdvancedSettings").style.display = "block";
		document.getElementById("advancedSettingsButton").value = "-";
	}
	else{
		document.getElementById("playerAdvancedSettings").style.display = "none";
		document.getElementById("advancedSettingsButton").value = "+";
	}
}