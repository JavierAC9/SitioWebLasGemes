 window.onload = function () {
	
	var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

	if(!usuarioLogueado){
		$('#menuAdmin').hide();
		$('#login').attr("href", "iniciarSesion.html");
		$('#login').text("Iniciar sesión");
		$('#login').addClass("nav-link");
		$('#login').prepend( "<i class='fa fa-sign-in'></i> " );
		alertify.alert("Las Gemes", "Para poder responder a su consulta de la mejor manera, le aconsejamos registrarse e iniciar sesión", function(){window.location.href = "/";});
	}else{

		$('#login').empty();
		$('#login').attr("href", "#");
		$('#login').text("Salir");
		$('#login').prepend( "<i class='fa fa-sign-out'></i> " );
		$('#login').addClass("nav-link");
		$('#login').click(function(){
        	sessionStorage.removeItem("usuarioLogueado");
			alertify.alert("Las Gemes", "Gracias por visitarnos", function(){window.location.href = "/";});
    	});
    	$('#registrarse').hide();

		usuarioLogueado = JSON.parse(usuarioLogueado);
		if (usuarioLogueado.rol  == "0") {
			$('#barraMenuAdmin').show();
			$('#hola').text("Hola " + usuarioLogueado.nombre);
		}else{
			$('#barraMenuAdmin').hide();
			$('#hola').text("Hola " + usuarioLogueado.nombre);

			$('#editar').attr("href", "editarUsuario.html");
			$('#editar').text("Editar");
			$('#editar').prepend( "<i class='fa fa-lg fa-pencil-square-o'></i> " );
			$('#editar').addClass("nav-link");
		}
	}

var d = new Date();
var time =   d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " / " +  d.getDate()  + "-" + (d.getMonth()+1)  + "-" + d.getFullYear() ;

$('#usuario').val(usuarioLogueado.nombre +" "+ usuarioLogueado.apellidos);
$('#fecha').val(time);
$('#correo').val(usuarioLogueado.correo);
$('#telefono').val(usuarioLogueado.telefono);
$('#nombre_usuario').val(usuarioLogueado.username);
$('#nombre_completo').val(usuarioLogueado.nombre +" "+ usuarioLogueado.apellidos);


}