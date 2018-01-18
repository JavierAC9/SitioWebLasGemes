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
		$sql = "select * from comentarios";
		$comentarios = array();
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
				while($row = mysqli_fetch_assoc($result)){
					array_push($comentarios, $row);
				}
				echo json_encode($comentarios);
		}else{
			echo "Error";
		}
	}else{
		if ($_POST['metodo'] == 'insert') {
			$sql = "insert into comentarios (tema, comentario, fechayhora, usuario, correo) values('"
			.$_POST["tema"]."', '"
			.$_POST["comentario"]."', '"
			.$_POST["fecha"]."', '"
			.$_POST["usuario"]."', '"
			.$_POST["correo"]."')";
		}
		
		
		if ($conn->query($sql) === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}


	$conn->close();


?>