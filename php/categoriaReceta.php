<?php 

	$username = "root";
	$password = "cajdrol9";
	$servername = "localhost";
	$dbname = "lasgemes";

	$conn = new mysqli($servername, $username, $password, $dbname);
	mysqli_set_charset($conn,"utf8"); //Ññ y acentos

	 if ($_POST['metodo'] == 'selectID') {
		$sql = "select * from categoria_recetas where idcategoria_recetas = ".$_POST["idcategoria_recetas"];
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			echo json_encode(mysqli_fetch_assoc($result)) ;
		}else{
			echo "Error";
		}

	}else  if ($_POST['metodo'] == 'delete') {
		$sql = "delete from categoria_recetas where idcategoria_recetas = ".$_POST["idcategoria_recetas"];
		$result = $conn->query($sql);

		if ($result === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}

	}else if ($_POST['metodo'] == 'selectAll') {
		$sql = "select * from categoria_recetas ORDER BY nombre_categoria_receta ASC";
		$categoriaRecetas = array();
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
				while($row = mysqli_fetch_assoc($result)){
					array_push($categoriaRecetas, $row);
				}
				echo json_encode($categoriaRecetas);
		}else{
			echo "Error";
		}
	}else{
		if ($_POST['metodo'] == 'insert') {
			$sql = "insert into categoria_recetas (nombre_categoria_receta, descripcion_categoria_receta) values('"
			.$_POST["nombre"]."', '"
			.$_POST["descripcion"]."')";
		}else if($_POST['metodo'] == 'update'){
			$sql = "update categoria_recetas set 
        nombre_categoria_receta='".$_POST["nombre"]."',
        descripcion_categoria_receta='".$_POST["descripcion"]."'
        where idcategoria_recetas = ".$_POST["idcategoria_recetas"];
		}

		if ($conn->query($sql) === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}


	$conn->close();


?>