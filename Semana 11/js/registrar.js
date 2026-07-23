document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('project-form');
  const nombreInput = document.getElementById('nombre');
  const fechaInput = document.getElementById('fecha_inicio');
  const estadoSelect = document.getElementById('estado');
  const btnGuardar = document.getElementById('btn-guardar');
  const alertContainer = document.getElementById('alert-container');

  const ESTADOS_PERMITIDOS = ['En curso', 'Finalizado', 'Detenido', 'Pendiente', 'Cancelado'];
  const API_URL = 'http://localhost:3000/proyectos';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors and alerts
    clearErrors();
    showAlert('', 'none');

    // Perform validation
    const isValid = validateForm();
    if (!isValid) return;

    // Build payload
    const projectData = {
      nombre: nombreInput.value.trim(),
      fecha_inicio: fechaInput.value,
      estado: estadoSelect.value
    };

    // UI Loading state
    setLoadingState(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Proyecto registrado exitosamente:', data);

      showAlert('✅ Proyecto registrado con éxito. Redireccionando a la lista de proyectos...', 'success');

      // Redirect to proyectos.html as required by exercise adjustment
      setTimeout(() => {
        window.location.href = 'proyectos.html';
      }, 1200);

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      showAlert(`⚠️ No se pudo conectar con el servidor (${error.message}). Verifique que la API REST esté ejecutándose en http://localhost:3000/proyectos.`, 'danger');
      setLoadingState(false);
    }
  });

  // Client-side Validation function
  function validateForm() {
    let isValid = true;

    // 1. Validar Nombre
    const nombreVal = nombreInput.value.trim();
    if (!nombreVal) {
      showFieldError(nombreInput, 'error-nombre', 'El nombre del proyecto es obligatorio.');
      isValid = false;
    } else if (nombreVal.length < 2) {
      showFieldError(nombreInput, 'error-nombre', 'El nombre debe tener al menos 2 caracteres.');
      isValid = false;
    }

    // 2. Validar Fecha de Inicio
    const fechaVal = fechaInput.value;
    if (!fechaVal) {
      showFieldError(fechaInput, 'error-fecha', 'La fecha de inicio es obligatoria.');
      isValid = false;
    } else {
      const dateObj = new Date(fechaVal);
      if (isNaN(dateObj.getTime())) {
        showFieldError(fechaInput, 'error-fecha', 'La fecha ingresada no es válida.');
        isValid = false;
      }
    }

    // 3. Validar Estado
    const estadoVal = estadoSelect.value;
    if (!estadoVal) {
      showFieldError(estadoSelect, 'error-estado', 'Debe seleccionar un estado para el proyecto.');
      isValid = false;
    } else if (!ESTADOS_PERMITIDOS.includes(estadoVal)) {
      showFieldError(estadoSelect, 'error-estado', 'El estado seleccionado no es válido.');
      isValid = false;
    }

    return isValid;
  }

  function showFieldError(inputElem, errorDivId, message) {
    inputElem.classList.add('is-invalid');
    const errorDiv = document.getElementById(errorDivId);
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'flex';
    }
  }

  function clearErrors() {
    [nombreInput, fechaInput, estadoSelect].forEach(input => {
      input.classList.remove('is-invalid');
    });

    ['error-nombre', 'error-fecha', 'error-estado'].forEach(id => {
      const errDiv = document.getElementById(id);
      if (errDiv) {
        errDiv.textContent = '';
        errDiv.style.display = 'none';
      }
    });
  }

  function setLoadingState(loading) {
    if (loading) {
      btnGuardar.disabled = true;
      btnGuardar.innerHTML = `<div class="spinner"></div> <span>Guardando...</span>`;
    } else {
      btnGuardar.disabled = false;
      btnGuardar.innerHTML = `<span>Guardar Proyecto</span>`;
    }
  }

  function showAlert(message, type) {
    if (type === 'none') {
      alertContainer.innerHTML = '';
      return;
    }
    alertContainer.innerHTML = `
      <div class="alert alert-${type}">
        <span>${message}</span>
      </div>
    `;
  }
});
