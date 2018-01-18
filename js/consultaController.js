

function registrar(){

	var consulta = {
		metodo: "insert",
		tema: $('#tema').val(),
		consulta: $('#consulta').val(),
		fecha: $('#fecha').val(),
		usuario: $('#usuario').val(),
		correo: $('#correo').val(),
		telefono: $('#telefono').val()
		
	}

	console.log(JSON.stringify(consulta));

	$.ajax({
		url: "../php/consulta.php",
		method: "POST",
		data: consulta,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(consulta_response) {

			var consultaLogueada = sessionStorage.getItem("consultaLogueada");

			if (consultaLogueada) {
				if (consulta_response == "Exito!") {
				alertify.success("Consulta registrada con éxito!");
				}else{
				alertify.error("Error al registrar consulta!");
				}
			}else{
				alertify.success("Se ha registrado con éxito!");
				registrarBitacora();
			}
				
		}
		
	});

	return false;

}





function listarConsultas(){

	var consult = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/consulta.php",
		method: "POST",
		data: consult ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(consulta_response) {

console.log(JSON.stringify(consulta_response));


		if(consulta_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{

			var consultas = JSON.parse(consulta_response);
			consultas.map(function(consulta){

				var fila = document.createElement("tr");

				//nombre
				var tema = document.createElement("td");
				$(tema).text(consulta.tema);
				$(fila).append(tema);
				//ingredientes
				var consultaVal = consulta.consulta;
				consultaVal = consultaVal.replace(/\r?\n/g, "<br>");
				var consulta1 = document.createElement("td");
				$(consulta1).html(consultaVal);
				$(fila).append(consulta1);
				//foto
				var fecha = document.createElement("td");
				$(fecha).text(consulta.fechayhora);
				$(fila).append(fecha);
				//foto
	
				var usuario = document.createElement("td");
				$(usuario).text(consulta.usuario);
				$(fila).append(usuario);
				var correo = document.createElement("td");
				$(correo).text(consulta.correo);
				$(fila).append(correo);
				var telefono = document.createElement("td");
				$(telefono).text(consulta.telefono);
				$(fila).append(telefono);

				//borrar
				var borrar = document.createElement("td");
				$(borrar).html("<a href=\"#\"><i class=\"fa fa-lg fa fa-trash-o rojo\" aria-hidden=\"true\"></i></a>");



				$(borrar).click(function(){

					alertify.confirm('labels changed!').set('labels', {ok:'Sí', cancel:'No'}); 
					alertify.confirm("Las Gemes","Está seguro que quiere borrar la consulta?", 
					function(){
					    alertify.success('Sí');
					    	function borrar(idConsulta){
					    		registrarBitacoraBorrar();
							var consulta = {
								metodo: "delete",
								idconsultas : idConsulta
							}

							$.ajax({
								url: "../php/consulta.php",
								method: "POST",
								data: consulta ,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(borrar_response) {

								console.log(borrar_response);
								window.location.href = "listaConsultas.html";
								
								}

							});
							return false;
						}

					borrar(consulta.idconsultas)

					},
					function(){
					  	alertify.error('La consulta no fue borrada');
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
								actividad: 'Borrar consulta'
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

