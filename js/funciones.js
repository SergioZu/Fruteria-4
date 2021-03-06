//todas las variables auxiliares que se va a utilizar en el ejercicio
var inputs;
var total = 0;
var aux = 0;
var divEscribir;
var divLateral;
var colores;
var permitir = false;
var radioTarjeta1;
var radioTarjeta2;
var imagenes;
var codigo;
var spans;
var ventaAux;

//array que guardaran la informacion de los objetos, como los objetos
var precioFruta = new Array(0.80, 1.20, 2, 3.60, 1.10, 3.40, 6, 0.90, 1.60, 2.10);
var proximidadFruta = new Array(true, true, false, true, false, false, true, false, true, false);
var regionFruta = new Array("Canarias", "Leon", "Zamora", "Avila", "Caceres", "Barcelona", "Madrid", "Galicia", "Valencia", "Albacete");
var conservaFruta = new Array(false, true, true, true, true, false, true, false, false, true);
var nombrefruta = new Array("Platano", "Manzana", "Pera", "Sandia", "Melon", "Kiwi", "Naranja", "Pomelo", "Melocoton", "Cereza");
var almacenObjeto = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var cantidadFruta = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var precioTotal = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

//clase fruta
class Fruta {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 0;
    }
}

//clase fruta verano que hereda de fruta
class FrutaVerano extends Fruta {
    constructor(nombre, precio, proximidad, region) {
        super(nombre, precio);
        this.proximidad = proximidad;
        this.region = region;
    }
}
//clase fruta invierno que hereda de fruta
class FrutaInvierno extends Fruta {
    constructor(nombre, precio, conserva) {
        super(nombre, precio);
        this.conserva = conserva;
    }
}



window.onload = function() {
    
    inputs = document.getElementsByTagName("input");
    radioTarjeta1 = document.getElementById("tarjetaSi");
    radioTarjeta2 = document.getElementById("tarjetaNo");
    imagenes = document.getElementsByTagName("img");
    codigo = document.getElementById("parrafoCodigo");
    spans = document.getElementsByTagName("span");
    abrirVentana();//metodo que verifica el formulario y abre si es necesario la ventana auxiliar
    añadirEventosImagenes();//añade a las imagenes el evento click
    añadirEventosRadio();//añade a los radio buton el evento para que aparezca el codigo
    añadirSpan();//añade a los spans la informacion de la fruta
}


function añadirEventosImagenes() {
   
    for (let index = 0; index < imagenes.length; index++) {
        imagenes[index].addEventListener("click", almacen.bind(index));
    }
}

function añadirEventosRadio() {

    radioTarjeta1.addEventListener("change", comprobarCodigo);
    radioTarjeta2.addEventListener("change", comprobarCodigo);

}

function añadirSpan() {
    for (let index = 0; index < spans.length; index++) {
        spans[index].innerHTML = ventanaInfo(index);
    }
}

//metodo que genera el objeto de la fruta dependiendo de la imagen clicada, le añadimos informacion y lo añadimos a un array
function almacen(num) {
    num = this.toString();
    for (var i = 0; i < 10; i++) {
        if (i == num) {
            if (almacenObjeto[i] == 0 && i % 2 == 0) {
                let frutaV = new FrutaVerano();
                frutaV.nombre = nombrefruta[i];
                frutaV.precio = precioFruta[i];
                frutaV.proximidad = proximidadFruta[i];
                frutaV.region = regionFruta[i];
                almacenObjeto[i] = frutaV;

            } else if (almacenObjeto[i] == 0 && i % 2 != 0) {
                let frutaI = new FrutaInvierno();
                frutaI.nombre = nombrefruta[i];
                frutaI.precio = precioFruta[i];
                almacenObjeto[i] = frutaI;

            }
            cantidad(num);//metodo que verifica si los kilos se han añadido correctamento con el formato correcto
            precioTotal[i] = almacenObjeto[i].cantidad * almacenObjeto[i].precio;
        }
    }

}

function cantidad(num) {
    if (inputs[num].value == "" || Number(inputs[num].value) < 1 || Number.isInteger(Number(inputs[num].value)) == false) {
        alert("No has introducido un numero entero")
    } else {
        permitir = true;
        almacenObjeto[num].cantidad += Number(inputs[num].value);
        lateral(num, almacenObjeto[num].nombre);
        inputs[num].value = "";
    }

}

//comprueba que radio button esta clicado y visualiza o no el input del codigo
function comprobarCodigo() {
    var inputCo = document.getElementById("inputCodigo");
    if (radioTarjeta1.checked == true) {
        codigo.className = "visible";
        inputCo.required = true;
    }
    if (radioTarjeta1.checked == false) {
        codigo.className = "invisible";
        inputCo.required = false;
    }
}

//metodo que añade la informacion necesaria al div lateral, como el color a todos los parrafos de las mismas frutas
function lateral(num, nombre) {
    divLateral = document.getElementById("lateral");
    divLateral.scrollIntoView(false);
    divLateral.innerHTML += "<p class='fruta' name='" + almacenObjeto[num].nombre + "'> Nombre: " + almacenObjeto[num].nombre + " ---  Kilos" + " --- " + almacenObjeto[num].cantidad + "</p>";
    colores = document.getElementsByClassName('fruta');
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";

    for (let index = 0; index < colores.length; index++) {
        if (colores[index].getAttribute("name") == nombre) {
            colores[index].style.backgroundColor = bgColor;
        }
        if (colores[index].getAttribute("name") != nombre) {
            colores[index].removeAttribute("style");
        }

    }

}
//metodo que recoge la fecha, toda la informacion de cada fruta asi como el precio total y media. 
function enviarDatos() {
    var textoVentana = "";
    if (permitir) {
        textoVentana += new Date()
        for (var i = 0; i < 10; i++) {
            if (almacenObjeto[i] != 0) {
                textoVentana += "<p>" + almacenObjeto[i].nombre + " --- " + almacenObjeto[i].cantidad + " Kilo" + " --- " + almacenObjeto[i].precio.toFixed(2) + "€ " + " --- " + (almacenObjeto[i].cantidad * almacenObjeto[i].precio).toFixed(2) + "€ </p>";
                total += precioTotal[i];
                aux += almacenObjeto[i].cantidad;
            }
            inputs[i].value = "";

        }
        textoVentana += "<p> Precio Total: " + total.toFixed(2) + " Kilo</p>";
        textoVentana += "<p> Precio Medio:" + (total / aux).toFixed(3) + "€</p>";

        total = 0;
        aux = 0;


    }
    return textoVentana;

}

//metodo que se le añade a los spans la informacion de la fruta (proximidad y region)
function ventanaInfo(i) {
    var texto = "";
    if (i % 2 == 0) {
        if (proximidadFruta[i] == true) {
            texto += " Las " + nombrefruta[i] + " son fruta de verano, de proximidad y de " + regionFruta[i] + "\n";
        } else {
            texto += " Las " + nombrefruta[i] + " son fruta de verano,no de proximidad y de " + regionFruta[i] + "\n";
        }
    } else if (i % 2 != 0) {
        if (conservaFruta[i] == true) {
            texto += " Las " + nombrefruta[i] + "son frutas de inverno y es recomendable conservarlas en fuera de la nevera " + "\n"
        } else {
            texto += " Las " + nombrefruta[i] + "son frutas de inverno y no es recomendable conservarlas en fuera de la nevera " + "\n"
        }
    }
    return texto;

}


//metodo que  vacia el div ateral como las variables que se han utilizado
function reiniciar() {
    divLateral.innerHTML = "";

    for (var i = 0; i < 10; i++) {
        almacenObjeto[i] = 0
        cantidadFruta[i] = 0
        precioTotal[i] = 0
    }
    inputs = document.getElementsByTagName("input");

    total = 0;
    aux = 0;
    divLateral = "";
    colores = "";
}

//metodo que verifica los campos del formulario y abre la ventana y es necesario
function abrirVentana() {
    var nombreI = document.getElementById("inputNombre");
    var apellidosI = document.getElementById("inputApellidos");
    var direccionI = document.getElementById("inputDireccion");
    var emailI = document.getElementById("inputEmail");
    var codigoI = document.getElementById("inputCodigo");

    
    
    ventaAux = document.getElementById("realizarVentana");
    ventaAux.addEventListener("click", (event)=>{
        
    let todoCorrecto = true;

    if (!nombreI.validity.valid) {
        todoCorrecto = false;
        nombreI.style.background = "red";
        event.preventDefault();
    } else {
        nombreI.style.background = "white";
    }
    if (!apellidosI.validity.valid) {
        todoCorrecto = false;
        apellidosI.style.background = "red";
        event.preventDefault();
    } else {
        apellidosI.style.background = "white";
    }
    if (!emailI.validity.valid) {
        todoCorrecto = false;
        emailI.style.background = "red";
        event.preventDefault();
    } else {
        emailI.style.background = "white";
    }
    if (!direccionI.validity.valid) {
        todoCorrecto = false;
        direccionI.style.background = "red";
        event.preventDefault();
    } else {
        direccionI.style.background = "white";
    }
    if (!codigoI.validity.valid) {
        todoCorrecto = false;
        codigoI.style.background = "red";
        event.preventDefault();
    } else {
        codigoI.style.background = "white";
    }

    if (todoCorrecto) {
        window.open("./paginaExtra.html", "pop-up", "width=500,height=300");
        event.preventDefault();
    }

    });

    

}