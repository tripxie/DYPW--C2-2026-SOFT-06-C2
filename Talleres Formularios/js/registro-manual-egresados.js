/* Seleccionar los elementos del DOM */
const inputCedula = document.getElementById("identificacion"); 
const inputNombre = document.getElementById("nombre-completo");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono"); 
const inputFechaRegistro = document.getElementById("fecha-registro");

const btnRegistrarEgresado = document.getElementById("guardar-egresado");

// Todos los campos obligatorios
const inputsRequeridos = document.querySelectorAll ("input[required]");

function validarCedula(numeroCedula){
    return /^[0-9]{9}$/.test(numeroCedula);
}

function ValidarCamposVacios(){
console.log(validarCedula(inputCedula.value.trim()));
}

function validarNombreCompleto(nombre) {
    return nombre.length >= 2;
}

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); // Uno o más caracteres que no sean espacios ni arrobas, seguido de una arroba, otro bloque similar, un punto y otro bloque final sin espacios ni arrobas.
}

function validarTelefono(telefono) {
    return /^[0-9]{8,12}$/.test(telefono); // Dígitos numéricos, con una longitud total de entre 8 y 12 caracteres, desde el inicio hasta el final
}

function resaltarCamposVacios() {
    let error = false; // Asumir que no hay error 

    // Identificación
    const cedula = inputCedula.value.trim();
    if (!validarCedula(cedula)) { // No cumple con el formato
        inputCedula.classList.add("input-error");
        error = true;
    } else {
        inputCedula.classList.remove("input-error");
    }

    // Nombre
    const nombre = inputNombre.value.trim();
    if (!validarNombreCompleto(nombre)) {
        inputNombre.classList.add("input-error");
        error = true;
    } else {
        inputNombre.classList.remove("input-error");
    }
    // Correo
    const correo = inputCorreo.value.trim();
    if (!validarCorreo(correo)) {
        inputCorreo.classList.add("input-error");
        error = true;
    } else {
        inputCorreo.classList.remove("input-error");
    }

    // Teléfono
    const telefono = inputTelefono.value.trim();
    if (!validarTelefono(telefono)) {
        inputTelefono.classList.add("input-error");
        error = true;
    } else {
        inputTelefono.classList.remove("input-error");
    }
    // Fecha de registro

    return error;
}

function resaltarCamposVacios() {
    let error = false; // Asumir que no hay error 

    // Identificación
    const cedula = inputCedula.value.trim();
    if (!validarCedula(cedula)) { // No cumple con el formato
        inputCedula.classList.add("input-error");
        error = true;
    } else {
        inputCedula.classList.remove("input-error");
    }

    // Nombre
    const nombre = inputNombre.value.trim();
    if (!validarNombreCompleto(nombre)) {
        inputNombre.classList.add("input-error");
        error = true;
    } else {
        inputNombre.classList.remove("input-error");
    }

    // Correo
    const correo = inputCorreo.value.trim();
    if (!validarCorreo(correo)) {
        inputCorreo.classList.add("input-error");
        error = true;
    } else {
        inputCorreo.classList.remove("input-error");
    }

    // Teléfono
    const telefono = inputTelefono.value.trim();
    if (!validarTelefono(telefono)) {
        inputTelefono.classList.add("input-error");
        error = true;
    } else {
        inputTelefono.classList.remove("input-error");
    }

    // Fecha de registro
    if(inputFechaRegistro.value === ""){
        inputFechaRegistro.classList.add("input-error");
        error = true;
    }else {
        inputFechaRegistro.classList.remove("input-error");
    }

    return error;
}

btnRegistrarEgresado.addEventListener("click", ValidarCamposVacios );