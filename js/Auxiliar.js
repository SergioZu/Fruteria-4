window.onload = function() {
    let contenidoVentana=window.opener;
    let cuerpo = document.getElementById("auxiliar");
    cuerpo.innerHTML=contenidoVentana.enviarDatos();
}