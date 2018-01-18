
function login(){

	var user = {
		metodo: "select",
		username: $('#username').val(),
		password: $('#password').val()
	}

	$.ajax({
		url: "../php/usuario.php",
		method: "POST",
		data: user ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(usuario_response) {
			if (usuario_response=="Error") {
				alertify.error('El usuario digitado no existe!');
			}else{
				var usuarioGuardado = JSON.parse(usuario_response);
				if (usuarioGuardado.password == user.password){
					sessionStorage.setItem("usuarioLogueado", usuario_response);
					window.location.href = "index.html";
				}else{
					alertify.error('El password es incorrecto!');
				}
			}
		}
	});

	return false;

}



function registrar(){

	var user = {
		metodo: "insert",
		nombre: $('#nombre').val(),
		apellidos: $('#apellidos').val(),
		telefono: $('#telefono').val(),
		correo: $('#correo').val(),
		provincia: $('#provincia').val(),
		genero: $('input[name="genero"]:checked').val(),
		username: $('#username').val(),
		password: $('#password').val(),
		rol: "1"
	}

	$.ajax({
		url: "../php/usuario.php",
		method: "POST",
		data: user ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(usuario_response) {

			var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
			if (usuarioLogueado) {
				if (usuario_response == "Exito!") {
				alertify.success('Usuario registrado con éxito!');
				}else{
				alertify.error('Error al registrar usuario!');
				}
			}else{
				alertify.success('Se ha registrado con éxito!', function(){window.location.href = "/";});
			}

		}
		
	});

	return false;

}


function listarUsuarios(){

	var user = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "../php/usuario.php",
		method: "POST",
		data: user ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(usuario_response) {

		if(usuario_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{

			var usuarios = JSON.parse(usuario_response);
			usuarios.map(function(usuario){
				var fila = document.createElement("tr");

				var nombreUsuario = document.createElement("td");
				$(nombreUsuario).text(usuario.username);
				$(fila).append(nombreUsuario);
				//nombre
				var nombre = document.createElement("td");
				$(nombre).text(usuario.nombre);
				$(fila).append(nombre);
				//apellidos
				var apellidos = document.createElement("td");
				$(apellidos).text(usuario.apellidos);
				$(fila).append(apellidos);
				//telefono
				var telefono = document.createElement("td");
				$(telefono).text(usuario.telefono);
				$(fila).append(telefono);
				//correo
				var correo = document.createElement("td");
				$(correo).text(usuario.correo);
				$(fila).append(correo);
				//provincia
				var provincia = document.createElement("td");
				$(provincia).text(usuario.provincia);
				$(fila).append(provincia);
				//genero
				var genero = document.createElement("td");
				$(genero).text(usuario.genero);
				$(fila).append(genero);

				//editar
				var editar = document.createElement("td");
				$(editar).html("<a href=\"editarUsuario.html?"+ usuario.idusuarios +"\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
				$(editar).addClass("verde");
				$(editar).addClass("botonCentrar");
				$(fila).append(editar);

				//borrar
				var borrar = document.createElement("td");
				$(borrar).html("<a href=\"#\"><i class=\"fa fa-lg fa fa-trash-o rojo\" aria-hidden=\"true\"></i></a>");


				$(borrar).click(function(){

					alertify.confirm('labels changed!').set('labels', {ok:'Sí', cancel:'No'}); 
					alertify.confirm("Las Gemes","Está seguro que quiere borrar el usuario?", 
					function(){
					    alertify.success('Sí');
					    	function borrar(idUsuario){
					    		registrarBitacoraBorrar();
							var usuario = {
								metodo: "delete",
								idusuarios : idUsuario
							}

							$.ajax({
								url: "../php/usuario.php",
								method: "POST",
								data: usuario ,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(borrar_response) {
								
								console.log(borrar_response);
								window.location.href = "listaUsuarios.html";
								
								}

							});
							return false;
						}

					borrar(usuario.idusuarios)

					},
					function(){
					  	alertify.error('El usuario no fue borrado');
					});
	
				});


				$(borrar).addClass("rojo");
				$(borrar).addClass("botonCentrar");
				$(fila).append(borrar);


				$('#listaUsuario').append(fila);
				
			});
		}
	}
	});

	return false;

}


function traerID(idUsuario){

	var user = {
		metodo: "selectID",
		idusuarios : idUsuario
	}

	$.ajax({
		url: "../php/usuario.php",
		method: "POST",
		data: user ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(usuario_response) {

			if(usuario_response == 'Error'){
				console.log('');
			}else{

			var usuario = JSON.parse(usuario_response);

			$('#nombre').val(usuario.nombre);
			$('#apellidos').val(usuario.apellidos);
			$('#telefono').val(usuario.telefono);
			$('#correo').val(usuario.correo);
			$('#provincia').val(usuario.provincia);
			$('input[value="'+ usuario.genero +'"]').prop("checked",true);
			$('#username').val(usuario.username);
			$('#password').val(usuario.password);
			$('#idusuarios').val(usuario.idusuarios);
			$('#rol').val(usuario.rol);
			}
		}
	});

	return false;

}



function editar(){

	var user = {
		metodo: "update",
		nombre: $('#nombre').val(),
		apellidos: $('#apellidos').val(),
		telefono: $('#telefono').val(),
		correo: $('#correo').val(),
		provincia: $('#provincia').val(),
		genero: $('input[name="genero"]:checked').val(),
		username: $('#username').val(),
		password: $('#password').val(),
		idusuarios: $('#idusuarios').val(),
		rol: $('#rol').val()
	}

	console.log(JSON.stringify(user));

	$.ajax({
		url: "../php/usuario.php",
		method: "POST",
		data: user ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(usuario_response) {
			if (usuario_response == "Exito!") {
				alertify.success('Usuario editado con éxito!');
				registrarBitacora();
			}else{
				alertify.error('Error al editar usuario!');
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
								actividad: 'Borrar usuario'
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