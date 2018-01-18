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
			listarCategoriaProductos();
		}else{
			$('#barraMenuAdmin').hide();
			$('#hola').text("Hola " + usuarioLogueado.nombre);
		}
	}

	var idUsuario = window.location.search;
	idUsuario = idUsuario.replace("?","");

	if (idUsuario) {
		traerID(idUsuario);
	}else{
		var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
		if (usuarioLogueado) {
			usuarioLogueado = JSON.parse(usuarioLogueado);
			traerID(usuarioLogueado.idusuarios);
		}
	}

}