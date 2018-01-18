<?php 

	$username = "root";
	$password = "cajdrol9";
	$servername = "localhost";
	$dbname = "lasgemes";

	$conn = new mysqli($servername, $username, $password, $dbname);
	mysqli_set_charset($conn,"utf8"); //Ññ y acentos

	
	if ($_POST['metodo'] == 'delete') {
		$sql = "delete from comentarios where idcomentarios = ".$_POST["idcomentarios"];
		$result = $conn->query($sql);

		if ($result === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}else if ($_POST['metodo'] == 'selectAll') {
		$sql = "select * from bitacora";
		$bitacora = array();
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
				while($row = mysqli_fetch_assoc($result)){
					array_push($bitacora, $row);
				}
				echo json_encode($bitacora);
		}else{
			echo "Error";
		}
	}else{
		if ($_POST['metodo'] == 'insertBitacora') {
			$sql = "insert into bitacora (nombre_usuario, nombre, fechayhora, actividad) values('"
			.$_POST["nombreUsuario"]."', '"
			.$_POST["nombre"]."', '"
			.$_POST["fecha"]."', '"
			.$_POST["actividad"]."')";
		}
		
		
		if ($conn->query($sql) === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}


	$conn->close();


?>