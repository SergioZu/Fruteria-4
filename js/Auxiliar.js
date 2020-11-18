window.onload = function() {
    let contenidoVentana=window.opener;
    let cuerpo = document.getElementById("auxiliar");
    setTimeout(contenidoVentana.enviarDatos(),5000);
    cuerpo.innerHTML =contenidoVentana.enviarDatos();
}