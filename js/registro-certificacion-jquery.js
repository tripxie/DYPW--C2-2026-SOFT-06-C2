$(function () {
    // Selección de elementos

    const inputNombre = $("#nombreCertificacion");
    const inputFechaVigencia = $("#vigencia");
    const inputInstitucion = $("#institucion");

    const inputDescripcion = $("#descripcion");

    const btnGuardarCertificacion = $("#btnGuardar");

    const inputsRequeridos = $("input[required]");

    const modalExito = new bootstrap.Modal(document.getElementById("successModal"));

    // Funciones
    function validar() {

        let error = false;

        inputsRequeridos.each(function () {

            if ($(this).val().trim() === "") {

                error = true;

                Swal.fire({
                    title: "No se puede registrar la certificación",
                    text: "Por favor complete los campos resaltados.",
                    icon: "warning",
                    confirmButtonText: "Aceptar"
                });

                // Sale del each una vez encontrado el primer error
                return false;
            }
        });
        resaltarCamposVacios();
        if (!error) {
            registrarCertificacion();
        }
    }

    function resaltarCamposVacios() {
        // Nombre
        if (inputNombre.val().trim() === "") {
            inputNombre.addClass("input-error");
        } else {
            inputNombre.removeClass("input-error");
        }

        // Institución
        if (inputInstitucion.val().trim() === "") {
            inputInstitucion.addClass("input-error");
        } else {
            inputInstitucion.removeClass("input-error");
        }

        // Fecha
        if (inputFechaVigencia.val().trim() === "") {
            inputFechaVigencia.addClass("input-error");
        } else {
            inputFechaVigencia.removeClass("input-error");
        }

    }

    function registrarCertificacion() {
        modalExito.show();
    }

    // Eventos
    btnGuardarCertificacion.on("click", validar);

});

/* 

JavaScript	                                            jQuery
document.getElementById("id")	                        $("#id")
document.querySelector("#id")	                        $("#id")
document.querySelector(".clase")	                    $(".clase")
document.querySelector("input")	                        $("input")
document.querySelectorAll("input")	                    $("input")
document.querySelectorAll("input[required]")	        $("input[required]")
element.value	                                        $(element).val() o $("#id").val()
element.value = ""	                                    $("#id").val("")
element.textContent	                                    $("#id").text()
element.innerHTML	                                    $("#id").html()
element.classList.add("clase")	                        $("#id").addClass("clase")
element.classList.remove("clase")	                    $("#id").removeClass("clase")
element.classList.toggle("clase")	                    $("#id").toggleClass("clase")
element.setAttribute("atributo","valor")	            $("#id").attr("atributo","valor")
element.removeAttribute("required")	                    $("#id").removeAttr("required")
element.style.color = "red"	                            $("#id").css("color","red")
element.focus()	                                        $("#id").focus()
element.remove()	                                    $("#id").remove()
element.addEventListener("click", funcion)	            $("#id").click(funcion) o $("#id").on("click", funcion)
document.addEventListener("DOMContentLoaded", ...)	    $(document).ready(...) o $(function(){ ... })
*/
