 window.onload = function () {
	var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

	if(!usuarioLogueado){
		
	}else{
		usuarioLogueado = JSON.parse(usuarioLogueado);
		if (usuarioLogueado.rol  == "0") {
			$('#menuAdmin').toggle();
		}else{
			$('#menuUsuario').toggle();
		}

var d = new Date();
var time =   d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " / " +  d.getDate()  + "-" + (d.getMonth()+1)  + "-" + d.getFullYear() ;

$('#nombre_usuario').val(usuarioLogueado.username);
$('#nombre_completo').val(usuarioLogueado.nombre +" "+ usuarioLogueado.apellidos);
$('#fecha').val(time);

	}
}