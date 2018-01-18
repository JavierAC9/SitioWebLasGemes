<?php 

	$username = "root";
	$password = "cajdrol9";
	$servername = "localhost";//localhost
	$dbname = "lasgemes";

	$conn = new mysqli($servername, $username, $password, $dbname);
	mysqli_set_charset($conn,"utf8"); //Ññ y acentos

	 if ($_POST['metodo'] == 'selectID') {
		$sql = "select * from banner where idbanner = ".$_POST["idbanner"];
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			echo json_encode(mysqli_fetch_assoc($result)) ;
		}else{
			echo "Error";
		}


	}else if ($_POST['metodo'] == 'selectAllBanner') {
		$sql = "select * from banner";
		$banner = array();
		$result = $conn->query($sql);



		if ($result->num_rows > 0) {
				while($row = mysqli_fetch_assoc($result)){
					array_push($banner, $row);
				}
				echo json_encode($banner);
		}else{
			echo "Error";
		}

	}
	else{
		if($_POST['metodo'] == 'update'){
			$sql = "update banner set 
        banner_Uno_1='".$_POST["bannerUno1"]."',
        banner_Dos_1='".$_POST["bannerDos1"]."',
        banner_Dos_2='".$_POST["bannerDos2"]."',
        banner_Tres_1='".$_POST["bannerTres1"]."',
        banner_Tres_2='".$_POST["bannerTres2"]."',
        banner_Tres_3='".$_POST["bannerTres3"]."'
        where idbanner=".$_POST["idbanner"];
		}

		if ($conn->query($sql) === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}


	$conn->close();


?>