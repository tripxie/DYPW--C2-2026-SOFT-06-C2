document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('proyectos-table-body');
  const alertContainer = document.getElementById('alert-container');
  const btnRefrescar = document.getElementById('btn-refrescar');
  const API_URL = 'http://localhost:3000/proyectos';

  // Cargar proyectos al iniciar
  cargarProyectos();

  // Event listener para el botón de refrescar
  if (btnRefrescar) {
    btnRefrescar.addEventListener('click', () => {
      cargarProyectos();
    });
  }

  async function cargarProyectos() {
    showAlert('', 'none');
    mostrarCando();

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }

      const proyectos = await response.json();
      renderTabla(proyectos);

    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      mostrarErrorTabla(error.message);
      showAlert(`⚠️ No se pudo obtener la lista de proyectos desde el servidor. Verifique que la API REST esté activa en http://localhost:3000/proyectos.`, 'danger');
    }
  }

  function renderTabla(proyectos) {
    tableBody.innerHTML = '';

    if (!Array.isArray(proyectos) || proyectos.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4">
            <div class="empty-state">
              <div class="empty-state-icon">📂</div>
              <h3>No hay proyectos registrados</h3>
              <p style="margin-top: 0.5rem;">Haz clic en el botón "Nuevo Proyecto" para agregar el primero.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    proyectos.forEach(proj => {
      const tr = document.createElement('tr');

      // Formatear Fecha
      const fechaFormateada = formatearFecha(proj.fecha_inicio);
      
      // Determinar clase del badge de estado
      const badgeClass = getBadgeClass(proj.estado);

      tr.innerHTML = `
        <td><span class="id-code" title="${proj._id || 'N/A'}">${proj._id ? proj._id.substring(0, 12) + '...' : 'N/A'}</span></td>
        <td><strong style="color: var(--text-main);">${escapeHTML(proj.nombre || '')}</strong></td>
        <td>${fechaFormateada}</td>
        <td><span class="badge ${badgeClass}">${escapeHTML(proj.estado || 'Pendiente')}</span></td>
      `;

      tableBody.appendChild(tr);
    });
  }

  function formatearFecha(fechaStr) {
    if (!fechaStr) return 'N/A';
    try {
      const fecha = new Date(fechaStr);
      if (isNaN(fecha.getTime())) return fechaStr;
      
      // Formato YYYY-MM-DD
      const year = fecha.getUTCFullYear();
      const month = String(fecha.getUTCMonth() + 1).padStart(2, '0');
      const day = String(fecha.getUTCDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
    } catch {
      return fechaStr;
    }
  }

  function getBadgeClass(estado) {
    switch (estado) {
      case 'En curso': return 'badge-en-curso';
      case 'Finalizado': return 'badge-finalizado';
      case 'Detenido': return 'badge-detenido';
      case 'Pendiente': return 'badge-pendiente';
      case 'Cancelado': return 'badge-cancelado';
      default: return 'badge-pendiente';
    }
  }

  function mostrarCando() {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4">
          <div class="empty-state">
            <div class="spinner" style="margin: 0 auto 1rem auto; width: 28px; height: 28px; border-width: 3px;"></div>
            <p>Cargando proyectos desde el servidor...</p>
          </div>
        </td>
      </tr>
    `;
  }

  function mostrarErrorTabla(msg) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4">
          <div class="empty-state">
            <div class="empty-state-icon">🚫</div>
            <h3 style="color: #f87171;">Error al consultar la API</h3>
            <p style="margin-top: 0.5rem;">${escapeHTML(msg)}</p>
          </div>
        </td>
      </tr>
    `;
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

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});
