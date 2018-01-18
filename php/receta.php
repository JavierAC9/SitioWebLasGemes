<?php 

	$username = "root";
	$password = "cajdrol9";
	$servername = "localhost";
	$dbname = "lasgemes";

	$conn = new mysqli($servername, $username, $password, $dbname);
	mysqli_set_charset($conn,"utf8"); //Ññ y acentos

	 if ($_POST['metodo'] == 'selectID') {
		$sql = "select * from recetas where idrecetas = ".$_POST["idrecetas"];
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			echo json_encode(mysqli_fetch_assoc($result)) ;
		}else{
			echo "Error";
		}

	}else  if ($_POST['metodo'] == 'delete') {
		$sql = "delete from recetas where idrecetas = ".$_POST["idrecetas"];
		$result = $conn->query($sql);

		if ($result === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}

	}else if ($_POST['metodo'] == 'selectAll') {
		$sql = "select * from recetas inner join categoria_recetas on recetas.categoria_recetas_idcategoria_recetas=categoria_recetas.idcategoria_recetas ORDER BY nombre ASC";
		$recetas = array();
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
				while($row = mysqli_fetch_assoc($result)){
					array_push($recetas, $row);
				}
				echo json_encode($recetas);
		}else{
			echo "Error";
		}
	}else{
		if ($_POST['metodo'] == 'insert') {
			$sql = "insert into recetas (nombre, ingredientes, foto, categoria_recetas_idcategoria_recetas, procedimiento) values('"
			.$_POST["nombre"]."', '"
			.$_POST["ingredientes"]."', '"
			.$_POST["foto"]."', '"
			.$_POST["categoria"]."', '"
			.$_POST["procedimiento"]."')";
		}else if($_POST['metodo'] == 'update'){
			$sql = "update recetas set 
        nombre='".$_POST["nombre"]."',
        foto='".$_POST["foto"]."',
        ingredientes='".$_POST["ingredientes"]."',
        categoria_recetas_idcategoria_recetas='".$_POST["categoria"]."',
        procedimiento='".$_POST["procedimiento"]."'
        where idrecetas = ".$_POST["idrecetas"];
		}

		if ($conn->query($sql) === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}


	$conn->close();


?>