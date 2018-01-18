<?php 

	$username = "root";
	$password = "cajdrol9";
	$servername = "localhost";
	$dbname = "lasgemes";

	$conn = new mysqli($servername, $username, $password, $dbname);
	mysqli_set_charset($conn,"utf8"); //Ññ y acentos

	 if ($_POST['metodo'] == 'selectID') {
		$sql = "select * from categoria_productos where idcategoria_productos = ".$_POST["idcategoria_productos"];
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			echo json_encode(mysqli_fetch_assoc($result)) ;
		}else{
			echo "Error";
		}

	}else  if ($_POST['metodo'] == 'delete') {
		$sql = "delete from categoria_productos where idcategoria_productos = ".$_POST["idcategoria_productos"];
		$result = $conn->query($sql);

		if ($result === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}

	}else if ($_POST['metodo'] == 'selectAll') {
		$sql = "select * from categoria_productos ORDER BY nombre_categoria_producto ASC";
		$categoriaProductos = array();
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
				while($row = mysqli_fetch_assoc($result)){
					array_push($categoriaProductos, $row);
				}
				echo json_encode($categoriaProductos);
		}else{
			echo "Error";
		}
	}else{
		if ($_POST['metodo'] == 'insert') {
			$sql = "insert into categoria_productos (nombre_categoria_producto, descripcion_categoria_producto) values('"
			.$_POST["nombre"]."', '"
			.$_POST["descripcion"]."')";
		}else if($_POST['metodo'] == 'update'){
			$sql = "update categoria_productos set 
        nombre_categoria_producto='".$_POST["nombre"]."',
        descripcion_categoria_producto='".$_POST["descripcion"]."'
        where idcategoria_productos = ".$_POST["idcategoria_productos"];
		}

		if ($conn->query($sql) === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}


	$conn->close();


?>