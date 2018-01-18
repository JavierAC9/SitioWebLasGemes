

function registrar(){

	var comentario = {
		metodo: "insert",
		tema: $('#tema').val(),
		comentario: $('#comentario').val(),
		fecha: $('#fecha').val(),
		usuario: $('#usuario').val(),
		correo: $('#correo').val()

	}

	console.log(JSON.stringify(comentario));

	$.ajax({
		url: "../php/comentario.php",
		method: "POST",
		data: comentario,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(comentario_response) {

			var comentarioLogueado = sessionStorage.getItem("comentarioLogueado");

			if (comentarioLogueado) {
				if (comentario_response == "Exito!") {
				alertify.success("Comentario registrado con éxito!");
				}else{
				alertify.error("Error al registrar comentario!");
				}
			}else{
				alertify.success("Se ha registrado con éxito!");
				registrarBitacora();
			}
				
		}
		
	});

	return false;

}





function listarComentarios(){

	var comentari = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/comentario.php",
		method: "POST",
		data: comentari ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(comentario_response) {

console.log(JSON.stringify(comentario_response));

		if(comentario_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{

			var comentarios = JSON.parse(comentario_response);
			comentarios.map(function(comentario){

				var fila = document.createElement("tr");

				//nombre
				var tema = document.createElement("td");
				$(tema).text(comentario.tema);
				$(fila).append(tema);
				//ingredientes
				var comentarioVal = comentario.comentario;
				comentarioVal = comentarioVal.replace(/\r?\n/g, "<br>");
				var comentario1 = document.createElement("td");
				$(comentario1).html(comentarioVal);
				$(fila).append(comentario1);
				//foto
				var fecha1 = document.createElement("td");
				$(fecha1).text(comentario.fechayhora);
				$(fila).append(fecha1);
				//foto
				var usuario = document.createElement("td");
				$(usuario).text(comentario.usuario);
				$(fila).append(usuario);
				var correo = document.createElement("td");
				$(correo).text(comentario.correo);
				$(fila).append(correo);
				
				//borrar
				var borrar = document.createElement("td");
				$(borrar).html("<a href=\"#\"><i id='borrar' class=\"fa fa-lg fa fa-trash-o rojo\" aria-hidden=\"true\"></i></a>");
				

				$(borrar).click(function(){

					alertify.confirm('labels changed!').set('labels', {ok:'Sí', cancel:'No'}); 
					alertify.confirm("Las Gemes","Está seguro que quiere borrar el comentario?", 
					function(){
					    alertify.success('Sí');
					    	function borrar(idComentario){
					    		registrarBitacoraBorrar();
							var comentario = {
								metodo: "delete",
								idcomentarios : idComentario
							}

							$.ajax({
								url: "../php/comentario.php",
								method: "POST",
								data: comentario ,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(borrar_response) {

								console.log(borrar_response);
								window.location.href = "listaComentarios.html";
								
								}

							});
							return false;
						}

					borrar(comentario.idcomentarios)

					},
					function(){
					  	alertify.error('El comentario no fue borrado');
					});
	
				});



				$(borrar).addClass("rojo");
				$(borrar).addClass("botonCentrar");
				$(fila).append(borrar);


				$('#listaConsultas').append(fila);
				
			});
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
								actividad: 'Borrar comentario'
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

