

function listarBitacora(){

	var bitacora = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/bitacora.php",
		method: "POST",
		data: bitacora ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(bitacora_response) {


		if(bitacora_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{

			var bitacoras = JSON.parse(bitacora_response);
			bitacoras.map(function(bitacora){

				var fila = document.createElement("tr");
				

				var fecha = document.createElement("td");
				$(fecha).text(bitacora.fechayhora);
				$(fila).append(fecha);

				var actividad = document.createElement("td");
				$(actividad).text(bitacora.actividad);
				$(fila).append(actividad);

				var nombre = document.createElement("td");
				$(nombre).text(bitacora.nombre);
				$(fila).append(nombre);
				
				var nombreUsuario = document.createElement("td");
				$(nombreUsuario).text(bitacora.nombre_usuario);
				$(fila).append(nombreUsuario);

				$('#listaBitacora').append(fila);
				
			});
		}
	}
	});

	return false;

}












