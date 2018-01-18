 window.onload = function () {
	
 	mostrarProductos();
	
	var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

	if(!usuarioLogueado){
		$('#menuAdmin').hide();
		$('#login').attr("href", "iniciarSesion.html");
		$('#login').text("Iniciar sesión");
		$('#login').addClass("nav-link");
		$('#login').prepend( "<i class='fa fa-sign-in'></i> " );
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

}