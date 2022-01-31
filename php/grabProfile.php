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
		echo "Failed to find user";
	}
	else{
		$row = mysqli_fetch_assoc($result);
		echo $row['username'];
	}
?>