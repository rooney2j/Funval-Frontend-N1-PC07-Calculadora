// Array de objetos
const botones_numericos = document.querySelectorAll('.boton-numerico');

// Pantalla de resultados
const pantalla_resultado = document.querySelector('#pantalla-resultado');

// botones de suma, resta, multiplicación y división
const botones_de_operacion = document.querySelectorAll('.boton-operacion');

// botón para borrar lo que haya en pantalla
const boton_reset = document.querySelector('.boton-reset');

// botón para borrar el último caracter ingresado
const boton_borrar = document.querySelector('.boton-borrar');

// botón igual, el cual evaluará la operación
const boton_igual = document.querySelector('.boton-igual');


// Agregar eventos a los botones
boton_reset.addEventListener('click', resetear);

for (let i = 0; i < botones_de_operacion.length; i++) {
    botones_de_operacion[i].addEventListener('click', agregarOperacion);
}

boton_borrar.addEventListener('click', borrarUltimoCaracter);

boton_igual.addEventListener('click', evaluarOperacion);


function pantallaEstaVacia() {
    return pantalla_resultado.value.length === 0;
}

// Si la pantalla está vacía y se ingresan ceros, no deberían mostrarse en pantalla
function agregarNumero(num) {
    if (pantalla_resultado.value.length === 1 && parseInt(pantalla_resultado.value) === 0) {
        if (num === 0) {
            pantalla_resultado.value = 0;
        } else {
            pantalla_resultado.value = num;
        }
    } else {
        pantalla_resultado.value += num;
    }

    verificarPantalla();
}

function resetear() {
    pantalla_resultado.value = 0;
}

function evaluarOperacion() {
    let ultima_posicion = pantalla_resultado.value.length - 1
    let ultimo_caracter = pantalla_resultado.value.substring(ultima_posicion);

    let cadena_a_evaluar = ''

    // si el último caracter de la pantalla es un botón de operación, se reemplazará con el nuevo operador
    if (isNaN(parseInt(ultimo_caracter))) {
        let texto = pantalla_resultado.value;
        let nuevo_texto = texto.slice(0, -1);

        // evaluar la cadena nuevo_texto
        cadena_a_evaluar = nuevo_texto
    } else {
        // evaluar lo que esté en pantalla
        cadena_a_evaluar = pantalla_resultado.value
    }

    pantalla_resultado.value = eval(cadena_a_evaluar);
}

function agregarOperacion() {
    let ultima_posicion = pantalla_resultado.value.length - 1
    let ultimo_caracter = pantalla_resultado.value.substring(ultima_posicion);

    // si el último caracter de la pantalla es un botón de operación, se reemplazará con el nuevo operador
    if (isNaN(parseInt(ultimo_caracter))) {
        let texto = pantalla_resultado.value;
        let nuevo_texto = texto.slice(0, -1);

        pantalla_resultado.value = nuevo_texto + this.value;
    } else {
        pantalla_resultado.value += this.value;
    }
}

function borrarUltimoCaracter() {
    let texto = pantalla_resultado.value;
    let nuevo_texto = texto.slice(0, -1);

    pantalla_resultado.value = nuevo_texto;
}

// Habilitar los botones inicialmente deshabilitados
function habilitarBotones() {
    for (let i = 0; i < botones_de_operacion.length; i++) {
        botones_de_operacion[i].disabled = false;
    }

    boton_reset.disabled = false;
    boton_borrar.disabled = false;
    boton_igual.disabled = false;
}

// Deshabilitar los botones
function deshabilitarBotones() {
    for (let i = 0; i < botones_de_operacion.length; i++) {
        botones_de_operacion[i].disabled = true;
    }

    boton_reset.disabled = true;
    boton_borrar.disabled = true;
    boton_igual.disabled = true;
}

function verificarPantalla() {
    if (pantallaEstaVacia()) {
        deshabilitarBotones();
    } else {
        habilitarBotones();
    }
}