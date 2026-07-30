$(function () {
    // Selección de elementos

    const inputNombre = $("#nombreCertificacion");


    function resaltarCamposVacios() {
        // Nombre
        if (inputNombre.val().trim() === "") {
            inputNombre.removeClass()
        }
    }
});