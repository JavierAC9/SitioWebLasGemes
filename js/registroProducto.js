 window.onload = function () {
	
	var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

	if(!usuarioLogueado){
		$('#menuAdmin').hide();
		$('#login').attr("href", "iniciarSesion.html");
		$('#login').text("Iniciar sesión");
		$('#login').addClass("nav-link");
		alertify.alert("Las Gemes", "Usted no tiene permiso para accesar esta página", function(){window.location.href = "/";});
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
			$('#header').hide();
			$('#barraMenuAdmin').show();
			$('#hola').text("Hola " + usuarioLogueado.nombre);
			listarCategorias(); 
		}else{
			$('#barraMenuAdmin').hide();
			$('#hola').text("Hola " + usuarioLogueado.nombre);
		}
	}

var d = new Date();
var time =   d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " / " +  d.getDate()  + "-" + (d.getMonth()+1)  + "-" + d.getFullYear() ;

$('#nombre_usuario').val(usuarioLogueado.username);
$('#nombre_completo').val(usuarioLogueado.nombre +" "+ usuarioLogueado.apellidos);
$('#fecha').val(time);

	

}