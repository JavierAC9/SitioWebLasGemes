

function registrar(){

	var categoriaProducto = {
		metodo: "insert",
		nombre: $('#nombre').val(),
		descripcion: $('#descripcion').val()
		
	}

	console.log(JSON.stringify(categoriaProducto));

	$.ajax({
		url: "../php/categoriaProducto.php",
		method: "POST",
		data: categoriaProducto,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(categoriaProducto_response) {

			var categoriaProductoLogueado = sessionStorage.getItem("categoriaProductoLogueado");
			if (categoriaProductoLogueado) {
				if (categoriaProducto_response == "Exito!") {
				alertify.success("Categoría de producto registrado con éxito!");

				

				}else{
				alertify.error("Error al registrar categoría de producto!");
				}
			}else{
				alertify.success("Se ha registrado con éxito!");
				registrarBitacora();
			}
				
		}
		
	});

	return false;

}





function listarCategoriaProductos(){

	var categoriaProduct = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/categoriaProducto.php",
		method: "POST",
		data: categoriaProduct ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(categoriaProducto_response) {


		if(categoriaProducto_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{

			var categoriaProductos = JSON.parse(categoriaProducto_response);
			categoriaProductos.map(function(categoriaProducto){

				var fila = document.createElement("tr");

				//nombre
				var nombre = document.createElement("td");
				$(nombre).text(categoriaProducto.nombre_categoria_producto);
				$(fila).append(nombre);
				//foto
				var descripcion = document.createElement("td");
				$(descripcion).text(categoriaProducto.descripcion_categoria_producto);
				$(fila).append(descripcion);
				

				
				//editar
				var editar = document.createElement("td");
				$(editar).html("<a href=\"editarCategoriaProducto.html?"+ categoriaProducto.idcategoria_productos +"\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
				$(editar).addClass("verde");
				$(editar).addClass("botonCentrar");
				$(fila).append(editar);

				//borrar
				var borrar = document.createElement("td");
				$(borrar).html("<a href=\"#\"><i class=\"fa fa-lg fa fa-trash-o rojo\" aria-hidden=\"true\"></i></a>");

				$(borrar).click(function(){

					alertify.confirm('labels changed!').set('labels', {ok:'Sí', cancel:'No'}); 
					alertify.confirm("Las Gemes","Está seguro que quiere borrar la categoría de producto?", 
					function(){
					    alertify.success('Sí');
					    	function borrar(idCategoriaProducto){
					    		registrarBitacoraBorrar();
							var categoriaProducto = {
								metodo: "delete",
								idcategoria_productos : idCategoriaProducto
							}

							$.ajax({
								url: "../php/categoriaProducto.php",
								method: "POST",
								data: categoriaProducto ,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(borrar_response) {

								console.log(borrar_response);
								window.location.href = "listaCategoriasProductos.html";
								
								}

							});
							return false;
						}

					borrar(categoriaProducto.idcategoria_productos);

					},
					function(){
					  	alertify.error('La categoría de producto no fue borrada');
					});
	
				});

				$(borrar).addClass("rojo");
				$(borrar).addClass("botonCentrar");
				$(fila).append(borrar);


				$('#listaCategoriasProductos').append(fila);
				
			});
		}
	}
	});

	return false;

}




function traerID(idCategoriaProducto){

	var categoriaProducto = {
		metodo: "selectID",
		idcategoria_productos : idCategoriaProducto
	}

	$.ajax({
		url: "../php/categoriaProducto.php",
		method: "POST",
		data: categoriaProducto ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(categoriaProducto_response) {


			if(categoriaProducto_response == 'Error'){
				console.log('');
			}else{

			var categoriaProducto = JSON.parse(categoriaProducto_response);

			$('#idcategoria_productos').val(categoriaProducto.idcategoria_productos);
			$('#nombre').val(categoriaProducto.nombre_categoria_producto);
			$('#descripcion').val(categoriaProducto.descripcion_categoria_producto);
			}
		}
	});

	return false;

}



function editar(){

	var categoriaProducto = {
		metodo: "update",
		idcategoria_productos: $('#idcategoria_productos').val(),
		nombre: $('#nombre').val(),
		descripcion: $('#descripcion').val()
		
	}

	console.log(JSON.stringify(categoriaProducto));

	$.ajax({
		url: "../php/categoriaProducto.php",
		method: "POST",
		data: categoriaProducto,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(categoriaProducto_response) {
			if (categoriaProducto_response == "Exito!") {
				alertify.success("Categoría de producto editada con éxito!");
				registrarBitacora();

			}else{
				alertify.error("Error al editar categoría de producto!");
			}
	}
		
	});

	return false;

}




function registrarBitacora(){

							var bitacora = {
								metodo: "insertBitacora",
								nombreUsuario: $('#nombre_usuario').val(),
								nombre: $('#nombre_completo').val(),
								fecha: $('#fecha').val(),
								actividad: $('#actividad').val()
							}

							$.ajax({
								url: "../php/bitacora.php",
								method: "POST",
								data: bitacora,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(bitacora_response) {

										if (bitacora_response == "Exito!") {
										console.log("Bitácora registrada con éxito!");
										}else{
										console.log("Error al registrar bitácora!");
										}
								}
								
							});
							return false;
}



function registrarBitacoraBorrar(){


var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
usuarioLogueado = JSON.parse(usuarioLogueado);


var d = new Date();
var time =   d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " / " +  d.getDate()  + "-" + (d.getMonth()+1)  + "-" + d.getFullYear() ;


							var bitacora = {
								metodo: "insertBitacora",
								nombreUsuario: usuarioLogueado.username,
								nombre: usuarioLogueado.nombre +" "+ usuarioLogueado.apellidos,
								fecha: time,
								actividad: 'Borrar categoría de producto'
							}

							$.ajax({
								url: "../php/bitacora.php",
								method: "POST",
								data: bitacora,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(bitacora_response) {

										if (bitacora_response == "Exito!") {
										console.log("Bitácora registrada con éxito!");
										}else{
										console.log("Error al registrar bitácora!");
										}
								}
								
							});
							return false;
}