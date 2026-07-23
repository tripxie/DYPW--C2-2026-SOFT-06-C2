const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serving static web files (HTML, CSS, JS) directly for convenience
app.use(express.static(__dirname));

// Initial seed data matching the assignment specifications
let proyectos = [
  {
    "_id": "6a595c5d04f309547bf49cec",
    "nombre": "Aero cargo",
    "fecha_inicio": "2026-01-26T00:00:00.000Z",
    "estado": "En curso",
    "__v": 0
  },
  {
    "_id": "6a595c7204f309547bf49cee",
    "nombre": "FA",
    "fecha_inicio": "2026-01-26T00:00:00.000Z",
    "estado": "En curso",
    "__v": 0
  }
];

// Helper to generate a hex MongoDB-style ID
function generateMongoId() {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// GET /proyectos
app.get('/proyectos', (req, res) => {
  console.log('[GET] /proyectos solicitados');
  res.json(proyectos);
});

// POST /proyectos
app.post('/proyectos', (req, res) => {
  console.log('[POST] /proyectos recibido:', req.body);
  
  const { nombre, fecha_inicio, estado } = req.body;

  if (!nombre || !fecha_inicio || !estado) {
    return res.status(400).json({ error: 'Campos requeridos faltantes: nombre, fecha_inicio, estado' });
  }

  const nuevoProyecto = {
    "_id": generateMongoId(),
    "nombre": nombre,
    "fecha_inicio": new Date(fecha_inicio).toISOString(),
    "estado": estado,
    "__v": 0
  };

  proyectos.push(nuevoProyecto);
  res.status(201).json(nuevoProyecto);
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Servidor API REST ejecutándose en http://localhost:${PORT}`);
  console.log(`📍 Endpoint Proyectos: http://localhost:${PORT}/proyectos`);
  console.log(`🌐 Aplicación Web disponible en: http://localhost:${PORT}/index.html`);
  console.log(`=================================================`);
});
