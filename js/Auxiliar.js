window.onload = function() {
    let cuerpo = document.getElementById("auxiliar");

    cuerpo.innerHTML = window.opener.enviarDatos();
}