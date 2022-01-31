console.log("Loaded initialization process");

var isLoggedIn = function(){
	console.log("Document loaded, now checking for login");
	if(document.cookie.indexOf("userloggedin") > -1 && document.cookie.indexOf("uservalue") > -1){
		var myCookie = document.cookie.split(';');
		var ok = true;
		for(var i = 0; i < myCookie.length; i++){

			if(myCookie[i].split("=")[0] == "userloggedin"){
				if(myCookie[i].split("=")[1] == ""){
					ok = false;
				}
				else{
					console.log("Found: " + myCookie[i].split("=")[1]);
				}
			}
			if(myCookie[i].split("=")[0] == "uservalue"){
				if(myCookie[i].split("=")[1] == ""){
					ok = false;
				}
				else{
					console.log("Found: " + myCookie[i].split("=")[1]);
				}
			}
		}
		console.log("OK: " + ok);
		if(ok){
			console.log("Logging in user using credentials");
			var findProfile = new XMLHttpRequest();
			findProfile.onreadystatechange = function(){
				if(findProfile.readyState == 4 && findProfile.status == 200){
					if(findProfile.responseText != "Failed to find user"){
						document.getElementById("greeting").innerHTML = "Welcome, " + findProfile.responseText;
						document.getElementById("loginButtons").style.display = "none";
					}
					else{
						console.log("Failed to login user");
					}
				}
			};
			findProfile.open("GET", "", true);
			findProfile.send();
			return;
		}
	}
	else{
		console.log("Login credentials not found");
	}
}

var loadGames = function(){
	var loadGamesConnect = new XMLHttpRequest();
	loadGamesConnect.onreadystatechange = function(){
		if(loadGamesConnect.readyState == 4 && loadGamesConnect.status == 200){
			var listGames = loadGamesConnect.responseText;
			listGames = listGames.split(",");
			document.getElementById("projectLoadDisplay").innerHTML = "";
			for(var i = 0; i < listGames.length; i++){
				document.getElementById("projectLoadDisplay").innerHTML += "<div class = 'gameLoadListItem' onclick = 'grabDungeon(this.innerHTML)'>" + listGames[i] + "</div>";
			}
			document.getElementById("createNewButton").style.display = "none";
			document.getElementById("loadGameButton").style.display = "none";
			document.getElementById("projectLoadDisplay").style.display = "block";
		}
	};
	loadGamesConnect.open("GET", "http://toymakersdev.com/untoldTales/php/loadGames.php", true);
	loadGamesConnect.send();
	return;
}

var grabDungeon = function(x){
	var grabGame = new XMLHttpRequest();
	grabGame.onreadystatechange = function(){
		if(grabGame.readyState == 4 && grabGame.status == 200){
			dungeon = JSON.parse(grabGame.responseText);
			player_o = dungeon.player;
			document.getElementById("startActivity").style.display = "none";
			document.getElementById("builderActivity").style.display = "block";
			document.getElementById("saveButton").style.display = "block";
			document.getElementById("runButton").style.display = "block";
			rebuildManager();
		}
	};
	grabGame.open("GET", "http://toymakersdev.com/untoldTales/php/grabGame.php?dungeon=" + x, true);
	grabGame.send();
	return;
}
