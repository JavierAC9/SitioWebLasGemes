

function registrar(){

	var categoriaReceta = {
		metodo: "insert",
		nombre: $('#nombre').val(),
		descripcion: $('#descripcion').val()
		
	}

	console.log(JSON.stringify(categoriaReceta));

	$.ajax({
		url: "../php/categoriaReceta.php",
		method: "POST",
		data: categoriaReceta,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(categoriaReceta_response) {

			var categoriaRecetaLogueada = sessionStorage.getItem("categoriaRecetaLogueada");
			if (categoriaRecetaLogueada) {
				if (categoriaReceta_response == "Exito!") {
				alertify.success("Categoría de receta registrada con éxito!");
				}else{
				alertify.error("Error al registrar categoría de receta!");
				}
			}else{
				alertify.success("Se ha registrado con éxito!");
				registrarBitacora();
			}
				
		}
		
	});

	return false;

}





function listarCategoriaRecetas(){

	var categoriaRecet = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/categoriaReceta.php",
		method: "POST",
		data: categoriaRecet ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(categoriaReceta_response) {


		if(categoriaReceta_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{

			var categoriaProductos = JSON.parse(categoriaReceta_response);
			categoriaProductos.map(function(categoriaReceta){

				var fila = document.createElement("tr");

				//nombre
				var nombre = document.createElement("td");
				$(nombre).text(categoriaReceta.nombre_categoria_receta);
				$(fila).append(nombre);
				//foto
				var descripcion = document.createElement("td");
				$(descripcion).text(categoriaReceta.descripcion_categoria_receta);
				$(fila).append(descripcion);
				

				
				//editar
				var editar = document.createElement("td");
				$(editar).html("<a href=\"editarCategoriaReceta.html?"+ categoriaReceta.idcategoria_recetas +"\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
				$(editar).addClass("verde");
				$(editar).addClass("botonCentrar");
				$(fila).append(editar);

				//borrar
				var borrar = document.createElement("td");
				$(borrar).html("<a href=\"#\"><i class=\"fa fa-lg fa fa-trash-o rojo\" aria-hidden=\"true\"></i></a>");

				$(borrar).click(function(){

					alertify.confirm('labels changed!').set('labels', {ok:'Sí', cancel:'No'}); 
					alertify.confirm("Las Gemes","Está seguro que quiere borrar la categoría de receta?", 
					function(){
					    alertify.success('Sí');
					    	function borrar(idCategoriaReceta){
					    		registrarBitacoraBorrar();
							var categoriaReceta = {
								metodo: "delete",
								idcategoria_recetas : idCategoriaReceta
							}

							$.ajax({
								url: "../php/categoriaReceta.php",
								method: "POST",
								data: categoriaReceta ,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(borrar_response) {

								console.log(borrar_response);
								window.location.href = "listaCategoriasRecetas.html";
								
								}

							});
							return false;
						}

					borrar(categoriaReceta.idcategoria_recetas);

					},
					function(){
					  	alertify.error('La categoría de receta no fue borrada');
					});
	
				});


				$(borrar).addClass("rojo");
				$(borrar).addClass("botonCentrar");
				$(fila).append(borrar);
				//Fin atributos-------------------------------------------------------------------------


				$('#listaCategoriasRecetas').append(fila);
				
			});
		}
	}
	});

	return false;

}




function traerID(idCategoriaReceta){

	var categoriaReceta = {
		metodo: "selectID",
		idcategoria_recetas : idCategoriaReceta
	}

	$.ajax({
		url: "../php/categoriaReceta.php",
		method: "POST",
		data: categoriaReceta ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(categoriaReceta_response) {

			if(categoriaReceta_response == 'Error'){
				console.log('');
			}else{

			var categoriaReceta = JSON.parse(categoriaReceta_response);

			$('#idcategoria_recetas').val(categoriaReceta.idcategoria_recetas);
			$('#nombre').val(categoriaReceta.nombre_categoria_receta);
			$('#descripcion').val(categoriaReceta.descripcion_categoria_receta);
			}
		
		}
	});

	return false;

}



function editar(){

	var categoriaReceta = {
		metodo: "update",
		idcategoria_recetas: $('#idcategoria_recetas').val(),
		nombre: $('#nombre').val(),
		descripcion: $('#descripcion').val()
		
	}

	console.log(JSON.stringify(categoriaReceta));

	$.ajax({
		url: "../php/categoriaReceta.php",
		method: "POST",
		data: categoriaReceta,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(categoriaReceta_response) {
			if (categoriaReceta_response == "Exito!") {
				alertify.success("Categoría de receta editada con éxito!");
				registrarBitacora();
			}else{
				alertify.error("Error al editar categoría de receta!");
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
								actividad: 'Borrar categoría de receta'
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