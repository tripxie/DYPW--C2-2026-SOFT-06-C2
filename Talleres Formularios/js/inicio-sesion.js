$(function () {
    // Selección de elementos DOM con jQuery
    const contrasennia = $("#contrasenna");
    const correo = $("#correo");
    const btnIniciarSesion = $("#iniciar-sesion");

    /* 
    Recuperar datos de LS: 
        1. Recuperar la información
            const usuarioGuardado = localStorage.getItem("usuario");
        2. Convertir nuevamente a objeto
            const usuario = JSON.parse(usuarioGuardado);


    Eliminar los datos de LS: localStorage.removeItem("usuario");

    Eliminar todos los datos almacenados por el sitio: localStorage.clear();
    */
    function iniciarSesion() {
        // Verificar las credenciales con la BD o recuperar los datos de LS

        // Recuperar los usuarios 
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Buscar un usuario con ese correo
        let existe = false;

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].correo === correo.val()) {
                existe = true;
                Swal.fire({
                    title: "Bienvenido (a)",
                    text: usuarios[i].nombre,
                    icon: "success",
                    confirmButtonText: "Aceptar"
                });
                break; // Ya lo encontró, no necesita seguir buscando
            }
        }

        if (existe === false) {
            Swal.fire({
                title: "Error al iniciar sesión",
                text: "Datos de inicio de sesión incorrectos",
                icon: "warning",
                confirmButtonText: "Aceptar"
            });
        }
    }

    // Manejo de eventos con jQuery
    btnIniciarSesion.on("click", iniciarSesion);
});

/* 
=============================================================================
TABLA COMPARATIVA: JavaScript Nativo vs jQuery
=============================================================================
JavaScript Nativo                                      jQuery
--------------------------------------------------     --------------------------------------------------
document.getElementById("id")                          $("#id")
document.querySelector("#id")                          $("#id")
document.querySelector(".clase")                      $(".clase")
document.querySelector("input")                        $("input")
document.querySelectorAll("input")                      $("input")
document.querySelectorAll("input[required]")          $("input[required]")
element.value                                          $(element).val() o $("#id").val()
element.value = ""                                     $("#id").val("")
element.textContent                                    $("#id").text()
element.innerHTML                                      $("#id").html()
element.classList.add("clase")                         $("#id").addClass("clase")
element.classList.remove("clase")                      $("#id").removeClass("clase")
element.classList.toggle("clase")                      $("#id").toggleClass("clase")
element.setAttribute("atributo","valor")              $("#id").attr("atributo","valor")
element.removeAttribute("required")                    $("#id").removeAttr("required")
element.style.color = "red"                            $("#id").css("color","red")
element.focus()                                        $("#id").focus()
element.remove()                                       $("#id").remove()
element.addEventListener("click", funcion)             $("#id").click(funcion) o $("#id").on("click", funcion)
document.addEventListener("DOMContentLoaded", ...)      $(document).ready(...) o $(function(){ ... })
=============================================================================
*/