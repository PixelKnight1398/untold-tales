<?php

	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
	
	$username = test_input($_COOKIE['userloggedin']);
	$userhash = test_input($_COOKIE['uservalue']);
	$gamenamesub = test_input($_POST['saveDungeonN']);
	$gameData = test_input($_POST['saveDungeonD']);
	
	$connect = mysqli_connect("localhost", "masterassassin13", "Thebeast1398", "websiteMembers") or die("Could not connect.  <a href = 'http://tomakersdev.com/login.html'>Back</a>");
	$query = "SELECT * FROM memberHandler WHERE `username`='" . $username . "' AND `hash`='" . $userhash . "'";
	$result = mysqli_query($connect, $query);
	if(mysqli_num_rows($result) != 1){
		die("Failed to find user");
	}
	else{
		$check_dir = "/home/masterassassin13/public_html/GameUploads/" . $username . "_games/UNTOLD_" . $gamenamesub;//fill in the rest with user information
		//use file_exists(file) to see if it exists
	
		if(!file_exists($check_dir)){
		  mkdir("/home/masterassassin13/public_html/GameUploads/" . $username . "_games/UNTOLD_" . $gamenamesub);
		}
		
		$gameinfo = fopen("/home/masterassassin13/public_html/GameUploads/" . $username . "_games/UNTOLD_" . $gamenamesub . "/dungeonData.txt", "w") or die("Unable to write info file");
		$gameinfotext = $gameData;
		fwrite($gameinfo, $gameinfotext);
		fclose($gameinfo);
		echo "<script>confirm('Game Saved!');</script>";
		header("Location: http://toymakersdev.com/untoldTales");
	}
?>