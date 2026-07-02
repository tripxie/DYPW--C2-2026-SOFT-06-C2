// Obtener elementos
const formulario = document.querySelector("form");
const nombre = document.getElementById("nombre-usuario");

// Evento al enviar el formulario
formulario.addEventListener("submit", function (event) {

    // Evita que el formulario se envíe
    event.preventDefault();

    // Quitar errores anteriores
    nombre.classList.remove("error");

    const mensajeAnterior = document.getElementById("error-nombre");
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }

    // Validación
    if (nombre.value.trim().length < 5) {

        // Resaltar el campo
        nombre.classList.add("error");

        // Crear mensaje de error
        const mensaje = document.createElement("p");
        mensaje.id = "error-nombre";
        mensaje.className = "mensaje-error";
        mensaje.textContent = "El nombre debe tener al menos 5 caracteres.";

        // Mostrar debajo del input
        nombre.parentNode.appendChild(mensaje);

        return;
    }

    alert("Formulario válido.");
});