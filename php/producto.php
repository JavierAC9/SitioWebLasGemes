<?php 

	$username = "root";
	$password = "cajdrol9";
	$servername = "localhost";
	$dbname = "lasgemes";

	$conn = new mysqli($servername, $username, $password, $dbname);
	mysqli_set_charset($conn,"utf8"); //Ññ y acentos

	 if ($_POST['metodo'] == 'selectID') {
		$sql = "select * from productos where idproductos = ".$_POST["idproductos"];
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			echo json_encode(mysqli_fetch_assoc($result)) ;
		}else{
			echo "Error";
		}


	}else  if ($_POST['metodo'] == 'delete') {
		$sql = "delete from productos where idproductos = ".$_POST["idproductos"];
		$result = $conn->query($sql);

		if ($result === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}

	}else if ($_POST['metodo'] == 'selectAll') {
		$sql = "select *
from productos inner join categoria_productos on productos.categoria_productos_idcategoria_productos=categoria_productos.idcategoria_productos ORDER BY nombre ASC";
		$productos = array();
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
				while($row = mysqli_fetch_assoc($result)){
					array_push($productos, $row);
				}
				echo json_encode($productos);
		}else{
			echo "Error";
		}


	}else{
		if ($_POST['metodo'] == 'insert') {
			$sql = "insert into productos (nombre, foto, categoria_productos_idcategoria_productos, descripcion) values('"
			.$_POST["nombre"]."', '"
			.$_POST["foto"]."', '"
			.$_POST["categoria"]."', '"
			.$_POST["descripcion"]."')";
		}else if($_POST['metodo'] == 'update'){
			$sql = "update productos set 
        nombre='".$_POST["nombre"]."',
        foto='".$_POST["foto"]."',
        categoria_productos_idcategoria_productos='".$_POST["categoria"]."',
        descripcion='".$_POST["descripcion"]."'
        where idproductos = ".$_POST["idproductos"];
		}

		if ($conn->query($sql) === TRUE) {
			echo "Exito!";
		}else{
			echo "Error!";
		}
	}


	$conn->close();


?>