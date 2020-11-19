window.onload = function() {
    let contenidoVentana = window.opener;
    let cuerpo = document.getElementById("auxiliar");
    cuerpo.innerHTML = contenidoVentana.enviarDatos();//añade la informacion del cuerpo


    let boton1 = document.getElementById("botonVolver");
    let boton2 = document.getElementById("botonTerminar");

    boton1.addEventListener("click", cerrarVentana, false);//añade la funcion cerrarVentaba

    boton2.addEventListener("click", volverVentanaFruteria, false);//añade la funcion volverVentanaFruteria
}


//metodo que cierra la ventana
function cerrarVentana() {
    window.close();
}

//metodo que cierra la ventana llama al metodo reiniciar y ejecuta el submit del formulario
function volverVentanaFruteria() {
    let contenidoVentana = window.opener;

    window.opener.document.getElementById("form1").submit();
    contenidoVentana.reiniciar();
    window.close();
}