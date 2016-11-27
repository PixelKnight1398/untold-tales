<?php

	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
	
	$username = test_input($_COOKIE['userloggedin']);
	$userhash = test_input($_COOKIE['uservalue']);
	
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
		  mkdir("/home/masterassassin13/public_html/GameUploads/" . $username . "_games");
		  echo "No games found for this profile.";
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
					$temp .= $tempfn;
					if($i != count($dir) - 1){
						$temp .= ",";
					}
				}
			}
			echo $temp;
		}
	}

?>