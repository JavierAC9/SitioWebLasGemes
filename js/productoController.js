function listarCategorias() {
    var categoriaProducto = {
        metodo: "selectAll"
    }
    $.ajax({
        url: "../php/categoriaProducto.php",
        method: "POST",
        data: categoriaProducto,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (categoria_response) {
            var categorias = JSON.parse(categoria_response);
            categorias.map(function (categoriaProducto) {
                $('<option>').val(categoriaProducto.idcategoria_productos).text(categoriaProducto.nombre_categoria_producto).appendTo('#categoria');

            });
            console.log(JSON.stringify(categoria_response));
        }
    });
    return false;
}



function registrar(){

	var producto = {
		metodo: "insert",
		nombre: $('#nombre').val(),
		foto: $('#foto').val(),
		categoria: $('select[name="categoria"]').val(),
		descripcion: $('#descripcion').val()
		
	}

	console.log(JSON.stringify(producto));

	$.ajax({
		url: "../php/producto.php",
		method: "POST",
		data: producto,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(producto_response) {

			var productoLogueado = sessionStorage.getItem("productoLogueado");
			if (productoLogueado) {
				console.log(JSON.stringify(producto_response));
				if (producto_response == "Exito!") {
				alertify.success("Producto registrado con éxito!");
				}else{
				alertify.error("Error al registrar producto!");
				}
			}else{
				alertify.success("Se ha registrado con éxito!");
				registrarBitacora();
			}
				
		}
		
	});

	return false;

}



function listarProductos(){

	var product = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/producto.php",
		method: "POST",
		data: product ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(producto_response) {


		if(producto_response == 'Error'){
			console.log('No hay datos en la tabla');
		}else{

			var productos = JSON.parse(producto_response);
			productos.map(function(producto){

				var fila = document.createElement("tr");
				
				//foto
				var foto = document.createElement("td");
				$(foto).append('<img class="border border-white rounded" src="imgs/Productos/'+producto.foto+'" height="auto" width="75px">');
				$(foto).addClass("botonCentrar");
				$(fila).append(foto);
				//nombre
				var nombre = document.createElement("td");
				$(nombre).text(producto.nombre);
				$(fila).append(nombre);
				//categoria
				var categoria = document.createElement("td");
				$(categoria).text(producto.nombre_categoria_producto);
				$(fila).append(categoria);

				//foto
				var descripcion = document.createElement("td");
				$(descripcion).text(producto.descripcion);
				$(fila).append(descripcion);

				//editar
				var editar = document.createElement("td");
				$(editar).html("<a href=\"editarProducto.html?"+ producto.idproductos +"\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
				$(editar).addClass("verde");
				$(editar).addClass("botonCentrar");
				$(fila).append(editar);

				//borrar
				var borrar = document.createElement("td");
				$(borrar).html("<a href=\"#\"><i class=\"fa fa-lg fa fa-trash-o rojo\" aria-hidden=\"true\"></i></a>");
				$(borrar).click(function(){

					alertify.confirm('labels changed!').set('labels', {ok:'Sí', cancel:'No'}); 
					alertify.confirm("Las Gemes","Está seguro que quiere borrar el producto?", 
					function(){
					    alertify.success('Sí');
					    	function borrar(idProducto){
					    		registrarBitacoraBorrar();
							var producto = {
								metodo: "delete",
								idproductos : idProducto
							}

							$.ajax({
								url: "../php/producto.php",
								method: "POST",
								data: producto ,
								error: function(xhr) {
									console.log(xhr.statusText);
								},
								success: function(borrar_response) {

								console.log(borrar_response);
								window.location.href = "listaProductos.html";
								
								}

							});
							return false;
						}

					borrar(producto.idproductos)

					},
					function(){
					  	alertify.error('El producto no fue borrado');
					});
	
				});

				$(borrar).addClass("rojo");
				$(borrar).addClass("botonCentrar");
				$(fila).append(borrar);


				$('#listaProductos').append(fila);
				
			});
		}
	}
	});

	return false;

}




function mostrarProductos(){

	var product = {
		metodo: "selectAll",
	}

	$.ajax({
		url: "/php/producto.php",
		method: "POST",
		data: product ,

		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(producto_response) {

console.log(JSON.stringify(producto_response));

			var productos = JSON.parse(producto_response);
			productos.map(function(producto){

				var bloqueProducto = document.createElement("div");
				$(bloqueProducto).addClass("card col-3 ");
				

				//foto
				var foto = document.createElement("figure");
				$(foto).append('<img class="border border-white rounded" src="imgs/Productos/'+producto.foto+'" height="auto" width="100%">');
				$(foto).addClass("card-img-top");
				$(bloqueProducto).append(foto);

				var body = document.createElement("div");
				$(body).addClass("card-body ");

				//nombre
				var nombre = document.createElement("h3");
				$(nombre).text(producto.nombre);
				$(nombre).addClass("botonCentrar");
				$(nombre).addClass("card-title");
				$(body).append(nombre);
				
				//categoria
				var categoria = document.createElement("h5");
				$(categoria).text(producto.nombre_categoria_producto);
				$(categoria).addClass("botonCentrar");
				$(categoria).addClass("card-title");
				$(body).append(categoria);
				

				//descripcion
				var descripcionVal = producto.descripcion;
				descripcionVal = descripcionVal.replace(/\r?\n/g, "<br>");
				var descripcion = document.createElement("p");
				$(descripcion).html(descripcionVal );
				// $(descripcion).addClass("botonCentrar");
				$(descripcion).addClass("card-text");
				$(body).append(descripcion);

				
				$(bloqueProducto).append(body);
				$('#mostrarProductos').addClass("row col-12 ");
				$('#mostrarProductos').append(bloqueProducto);
				
				
			});
		}
	});

	return false;

}




function traerID(idProducto){

	var producto = {
		metodo: "selectID",
		idproductos : idProducto
	}

	$.ajax({
		url: "../php/producto.php",
		method: "POST",
		data: producto ,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(producto_response) {
		

		if(producto_response == 'Error'){
			console.log('');
		}else{
			var producto = JSON.parse(producto_response);
			$('#idproductos').val(producto.idproductos);
			$('#nombre').val(producto.nombre);
			$('#foto').val(producto.foto);
			$('#categoria').val(producto.categoria_productos_idcategoria_productos);
			$('#descripcion').val(producto.descripcion);
		}

		
		
		}
	});

	return false;

}



function editar(){

	var producto = {
		metodo: "update",
		idproductos: $('#idproductos').val(),
		nombre: $('#nombre').val(),
		foto: $('#foto').val(),
		categoria: $('#categoria').val(),
		descripcion: $('#descripcion').val()
		
	}

	console.log(JSON.stringify(producto));

	$.ajax({
		url: "../php/producto.php",
		method: "POST",
		data: producto,
		error: function(xhr) {
			console.log(xhr.statusText);
		},
		success: function(producto_response) {
			if (producto_response == "Exito!") {
				alertify.success("Producto editado con éxito!");
				registrarBitacora();
			}else{
				alertify.error("Error al editar producto!");
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
								actividad: 'Borrar producto'
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

