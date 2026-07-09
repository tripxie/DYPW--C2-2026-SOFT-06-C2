var formulario = document.getElementById("formulario");

formulario.onsubmit = function(event){

    event.preventDefault();

    var nombre = document.getElementById("nombre-usuario").value;
    var correo = document.getElementById("correo").value;
    var contrasenna = document.getElementById("contrasenna").value;
    var confirmar = document.getElementById("verificacion-contrasenna").value;

    // Validar campos vacíos
    if(nombre == "" || correo == "" || contrasenna == "" || confirmar == ""){
        alert("Debe completar todos los campos obligatorios.");
        return;
    }

    // Validar nombre
    if(nombre.length < 5){
        alert("El nombre debe tener al menos 5 caracteres.");
        return;
    }

    // Validar correo
    if(correo.indexOf("@") == -1 || correo.indexOf(".") == -1){
        alert("Ingrese un correo válido.");
        return;
    }

    // Validar contraseña
    if(contrasenna.length < 8){
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    // Confirmar contraseña
    if(contrasenna != confirmar){
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Crear objeto
    var usuario = {
        nombre: nombre,
        correo: correo,
        contrasenna: contrasenna
    };

    // Obtener lista existente
    var usuarios = localStorage.getItem("usuarios");

    if(usuarios == null){
        usuarios = [];
    }else{
        usuarios = JSON.parse(usuarios);
    }

    // Agregar nuevo usuario
    usuarios.push(usuario);

    // Guardar nuevamente
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente.");

    formulario.reset();

};

var formulario = document.getElementById("formulario");