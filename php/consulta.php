<?php 

	$username = "root";
	$password = "cajdrol9";
	$servername = "localhost";
	$dbname = "lasgemes";

	$conn = new mysqli($servername, $username, $password, $dbname);
	mysqli_set_charset($conn,"utf8"); //Ññ y acentos


	if ($_POST['metodo'] == 'delete') {
		$sql = "delete from consultas where idconsultas = ".$_POST["idconsultas"];
		$result = $conn->query($sql);

		if ($result === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}else if ($_POST['metodo'] == 'selectAll') {
		$sql = "select * from consultas";
		$consultas = array();
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
				while($row = mysqli_fetch_assoc($result)){
					array_push($consultas, $row);
				}
				echo json_encode($consultas);
		}else{
			echo "Error";
		}
	}else{
		if ($_POST['metodo'] == 'insert') {
			$sql = "insert into consultas (tema, consulta, fechayhora, usuario, correo, telefono) values('"
			.$_POST["tema"]."', '"
			.$_POST["consulta"]."', '"
			.$_POST["fecha"]."', '"
			.$_POST["usuario"]."', '"
			.$_POST["correo"]."', '"
			.$_POST["telefono"]."')";
		}
		
		if ($conn->query($sql) === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}


	$conn->close();


?>