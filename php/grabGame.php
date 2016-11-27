<?php

	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
	
	$username = test_input($_COOKIE['userloggedin']);
	$userhash = test_input($_COOKIE['uservalue']);
	$dungeon_name = test_input($_GET['dungeon']);
	
	$connect = mysqli_connect("localhost", "masterassassin13", "Thebeast1398", "websiteMembers") or die("Could not connect.  <a href = 'http://tomakersdev.com/login.html'>Back</a>");
	$query = "SELECT * FROM memberHandler WHERE `username`='" . $username . "' AND `hash`='" . $userhash . "'";
	$result = mysqli_query($connect, $query);
	if(mysqli_num_rows($result) != 1){
		echo "Please <a href = 'http://toymakersdev.com/login.html'>Login</a>";
	}
	else{
		//loop through game files and print out each game name
		$check_dir = "/home/masterassassin13/public_html/GameUploads/" . $username . "_games";//fill in the rest with user information
		//use file_exists(file) to see if it exists
	
		if(!file_exists($check_dir)){
		  die("Error grabbing game: Game directory does not exist");
		}
		else{
			$dir = scandir($check_dir);
			$temp = "";
			for($i = 0; $i < count($dir); $i++){
				$tempfn = "";
				if(explode("_", $dir[$i])[0] == "UNTOLD"){
					$tempfn = explode("_", $dir[$i]);
					unset($tempfn[0]);
					$tempfn = implode("_", $tempfn);
					if($dungeon_name == $tempfn){
						$check_dir = "/home/masterassassin13/public_html/GameUploads/" . $username . "_games/UNTOLD_" . $dungeon_name;
						$dir2 = scandir($check_dir);
						if($dungeon_info = fopen($check_dir . "/dungeonData.txt", "r")){
							//open file
						}else{$temp .= "Failed to Open Dungeon File";}
						$read = "";
						if($read = fread($dungeon_info, filesize($check_dir . "/dungeonData.txt"))){
							$read = str_replace("&quot;", "\"", $read);
							$temp .= $read;
							//read file = true
						}else{$temp .= "Failed to Read File";}
						if(fclose($dungeon_info)){
							//closed file
						}else{$temp .= "Failed to Close File";}
					}
				}
			}
			echo $temp;
		}
	}

?>