window.onload = function() {
    let contenidoVentana = window.opener;
    let cuerpo = document.getElementById("auxiliar");
    cuerpo.innerHTML = contenidoVentana.enviarDatos();


    let boton1 = document.getElementById("botonVolver");
    let boton2 = document.getElementById("botonTerminar");

    boton1.addEventListener("click", cerrarVentana, false);

    boton2.addEventListener("click", volverVentanaFruteria, false);
}


function cerrarVentana() {
    window.close();
}


function volverVentanaFruteria() {
    let contenidoVentana = window.opener;

    window.opener.document.getElementById("form1").submit();
    contenidoVentana.reiniciar();
    window.close();
}