
function listarBanner(){

	var banner = {
		metodo: "selectAllBanner",
	}

	$.ajax({
		url: "/php/banner.php",
		method: "POST",
		data: banner ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(banner_response) {

		if(banner_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{	


			var banners = JSON.parse(banner_response);
			banners.map(function(banner){

				
				
				$('#bannerUno1').attr('src', 'imgs/Banner/' + banner.banner_Uno_1);
				$('#bannerDos1').attr('src', 'imgs/Banner/' + banner.banner_Dos_1);
				$('#bannerDos2').attr('src', 'imgs/Banner/' + banner.banner_Dos_2);
				$('#bannerTres1').attr('src', 'imgs/Banner/' + banner.banner_Tres_1);
				$('#bannerTres2').attr('src', 'imgs/Banner/' + banner.banner_Tres_2);
				$('#bannerTres3').attr('src', 'imgs/Banner/' + banner.banner_Tres_3);
								
			});
		}
	}
	});

	return false;

}







function traerID(idBanner){

	var banner = {
		metodo: "selectID",
		idbanner : idBanner
	}

	$.ajax({
		url: "../php/banner.php",
		method: "POST",
		data: banner ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(banner_response) {

		if(banner_response == 'Error'){
			console.log('');
		}else{
			var banner = JSON.parse(banner_response);
			$('#idbanner').val(banner.idbanner);
			$('#formBannerUno1').val(banner.banner_Uno_1);
			$('#formBannerDos1').val(banner.banner_Dos_1);
			$('#formBannerDos2').val(banner.banner_Dos_2);
			$('#formBannerTres1').val(banner.banner_Tres_1);
			$('#formBannerTres2').val(banner.banner_Tres_2);
			$('#formBannerTres3').val(banner.banner_Tres_3);
		}

		
		
		}
	});

	return false;

}



function editar(){

	var banner = {
		metodo: "update",
		idbanner: $('#idbanner').val(),
		bannerUno1: $('#formBannerUno1').val(),
		bannerDos1: $('#formBannerDos1').val(),
		bannerDos2: $('#formBannerDos2').val(),
		bannerTres1: $('#formBannerTres1').val(),
		bannerTres2: $('#formBannerTres2').val(),
		bannerTres3: $('#formBannerTres3').val()
		
	}

	$.ajax({
		url: "../php/banner.php",
		method: "POST",
		data: banner,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(banner_response) {

			if (banner_response == "Exito!") {
				alertify.success("Banner editado con éxito!");

				registrarBitacora();
						
			}else{
				alertify.error("Error al editar banner!");
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
								actividad: 'Edición de banner'
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



