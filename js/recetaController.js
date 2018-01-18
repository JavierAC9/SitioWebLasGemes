
function listarCategorias() {
    var categoriaReceta = {
        metodo: "selectAll"
    }
    $.ajax({
        url: "../php/categoriaReceta.php",
        method: "POST",
        data: categoriaReceta,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (categoria_response) {
            var categorias = JSON.parse(categoria_response);
            categorias.map(function (categoriaReceta) {
                $('<option>').val(categoriaReceta.idcategoria_recetas).text(categoriaReceta.nombre_categoria_receta).appendTo('#categoria');

            });
            console.log(JSON.stringify(categoria_response));
        }
    });
    return false;
}




function registrar(){

	var receta = {
		metodo: "insert",
		nombre: $('#nombre').val(),
		ingredientes: $('#ingredientes').val(),
		foto: $('#foto').val(),
		categoria: $('select[name="categoria"]').val(),
		procedimiento: $('#procedimiento').val()
		
	}

	console.log(JSON.stringify(receta));

	$.ajax({
		url: "../php/receta.php",
		method: "POST",
		data: receta,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(receta_response) {

			var recetaLogueada = sessionStorage.getItem("recetaLogueada");
			if (recetaLogueada) {
				if (receta_response == "Exito!") {
				alertify.success("Receta registrada con éxito!");
				}else{
				alertify.error("Error al registrar receta!");
				}
			}else{
				alertify.success("Se ha registrado con éxito!");
				registrarBitacora();
			}
				
		}
		
	});

	return false;

}





function listarRecetas(){

	var receta = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/receta.php",
		method: "POST",
		data: receta ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(receta_response) {

console.log(JSON.stringify(receta_response));

		if(receta_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{

			var recetas = JSON.parse(receta_response);
			recetas.map(function(receta){

				var fila = document.createElement("tr");

				//foto
				var foto = document.createElement("td");
				$(foto).append('<img class="border border-white rounded" src="imgs/Recetas/'+receta.foto+'" height="auto" width="75px">');
				$(fila).append(foto);
				//nombre
				var nombre = document.createElement("td");
				$(nombre).text(receta.nombre);
				$(fila).append(nombre);
				//categoria
				var categoria = document.createElement("td");
				$(categoria).text(receta.nombre_categoria_receta);
				$(fila).append(categoria);
				//ingredientes
				var ingredientes = document.createElement("td");
				$(ingredientes).text(receta.ingredientes);
				$(fila).append(ingredientes);
				
				//procedimiento
				var procedimiento = document.createElement("td");
				$(procedimiento).text(receta.procedimiento);
				$(fila).append(procedimiento);
				
				//editar
				var editar = document.createElement("td");
				$(editar).html("<a href=\"editarReceta.html?"+ receta.idrecetas +"\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
				$(editar).addClass("verde");
				$(editar).addClass("botonCentrar");
				$(fila).append(editar);

				//borrar
				var borrar = document.createElement("td");
				$(borrar).html("<a href=\"#\"><i class=\"fa fa-lg fa fa-trash-o rojo\" aria-hidden=\"true\"></i></a>");


				$(borrar).click(function(){

					alertify.confirm('labels changed!').set('labels', {ok:'Sí', cancel:'No'}); 
					alertify.confirm("Las Gemes","Está seguro que quiere borrar la receta?", 
					function(){
					    alertify.success('Sí');
					    	function borrar(idReceta){
					    		registrarBitacoraBorrar();
							var receta = {
								metodo: "delete",
								idrecetas : idReceta
							}

							$.ajax({
								url: "../php/receta.php",
								method: "POST",
								data: receta ,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(borrar_response) {
								
								console.log(borrar_response);
								window.location.href = "listaRecetas.html";
								
								}

							});
							return false;
						}

					borrar(receta.idrecetas)

					},
					function(){
					  	alertify.error('La receta no fue borrada');
					});
	
				});


				$(borrar).addClass("rojo");
				$(borrar).addClass("botonCentrar");
				$(fila).append(borrar);


				$('#listaRecetas').append(fila);
				
			});
		}
	}
	});

	return false;

}



function mostrarRecetas(){

	var recet = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/receta.php",
		method: "POST",
		data: recet ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(receta_response) {

console.log(JSON.stringify(receta_response));

			
			var recetas = JSON.parse(receta_response);
			recetas.map(function(receta){



				var bloqueReceta = document.createElement("div");
				$(bloqueReceta).addClass("card col-3");
				

				//foto
				var foto = document.createElement("figure");
				$(foto).append('<img class="border border-white rounded" id="imagen" src="imgs/Recetas/'+receta.foto+'" height="auto" width="100%">');
				$(foto).addClass("botonCentrar");
				$(foto).addClass("card-img-top");
				$(bloqueReceta).append(foto);

				//nombre
				var nombre = document.createElement("h3");
				$(nombre).text(receta.nombre);
				$(nombre).addClass("botonCentrar");
				$(nombre).addClass("card-title");
				$(bloqueReceta).append(nombre);

				//categoria
				var categoria = document.createElement("h5");
				$(categoria).text(receta.nombre_categoria_receta);
				$(categoria).addClass("botonCentrar");
				$(categoria).addClass("card-title");
				$(bloqueReceta).append(categoria);
				
				//boton
				var boton = document.createElement("button");
				var idBotonReceta = $(boton).attr('id', recetas.idrecetas);
				$(boton).addClass("botonCentrar botonReceta btn btn-outline-success "); 
				$(boton).text("Ver");
				$(bloqueReceta).append(boton);

				
				$(idBotonReceta).click(function() {
        			$('#myModal').css('display','block');
        			$('#tituloModal').text(receta.nombre);
						$('#tituloIngredientes').text("Ingredientes");
						var ingredientesVal = receta.ingredientes;
							ingredientesVal = ingredientesVal.replace(/\r?\n/g, "<br>");
						$('#pIngredientes').html(ingredientesVal);
						$('#tituloProcedimientos').text("Procedimiento");
						var procedimientoVal = receta.procedimiento;
							procedimientoVal = procedimientoVal.replace(/\r?\n/g, "<br>");
						$('#pProcedimientos').html(procedimientoVal);
    			});
			
				 $('.close').click (function() {
        			$('#myModal').css('display','none');
    			});


				$('#mostrarRecetas').addClass("row col-12");
				$('#mostrarRecetas').append(bloqueReceta);

				
				
			});
			

		}

	});

	return false;

}






function traerID(idReceta){

	var receta = {
		metodo: "selectID",
		idrecetas : idReceta
	}

	$.ajax({
		url: "../php/receta.php",
		method: "POST",
		data: receta ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(receta_response) {

			if(receta_response == 'Error'){
				console.log('');
			}else{

			var receta = JSON.parse(receta_response);

			$('#idrecetas').val(receta.idrecetas);
			$('#nombre').val(receta.nombre);
			$('#ingredientes').val(receta.ingredientes);
			$('#foto').val(receta.foto);
			$('#categoria').val(receta.categoria_recetas_idcategoria_recetas);
			$('#procedimiento').val(receta.procedimiento);
			}
		
		
		}
	});

	return false;

}



function editar(){

	var receta = {
		metodo: "update",
		idrecetas: $('#idrecetas').val(),
		nombre: $('#nombre').val(),
		ingredientes: $('#ingredientes').val(),
		foto: $('#foto').val(),
		procedimiento: $('#procedimiento').val(),
		categoria: $('#categoria').val()
		
		
	}

	console.log(JSON.stringify(receta));

	$.ajax({
		url: "../php/receta.php",
		method: "POST",
		data: receta,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(receta_response) {
			if (receta_response == "Exito!") {
				alertify.success("Receta editada con éxito!");
				registrarBitacora();
			}else{
				alertify.error("Error al editar receta!");
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
								actividad: 'Borrar receta'
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





