const express = require('express');
const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || 'localhost';
const APP_NAME = process.env.APP_NAME || 'Mi Aplicación';

// ----- Datos en memoria -----
const facultades = [
  { id: 1, nombre: 'Facultad de Ingeniería' },
  { id: 2, nombre: 'Facultad de Ciencias Sociales' },
  { id: 3, nombre: 'Facultad de Ciencias de la Salud' },
];

const programas = [
  { id: 1, codigo: 'ING-SIS', nombre: 'Ingeniería de Sistemas', facultadId: 1, nivel: 'Pregrado', createdBy: 'System', createdAt: new Date().toISOString() },
  { id: 2, codigo: 'ING-CIV', nombre: 'Ingeniería Civil', facultadId: 1, nivel: 'Pregrado', createdBy: 'System', createdAt: new Date().toISOString() },
  { id: 3, codigo: 'PSI', nombre: 'Psicología', facultadId: 2, nivel: 'Pregrado', createdBy: 'System', createdAt: new Date().toISOString() },
];

let nextProgramaId = 4;

// ----- Rutas -----
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    success: true,
    message: 'API is healthy',
    version: '1.0.0',
  });
});

app.get('/api/facultades', (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    message: 'Facultades obtenidas correctamente',
    data: facultades,
  });
});

app.get('/api/programas', (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    message: 'Programas obtenidos correctamente',
    data: programas,
  });
});

app.post('/api/programas/store', (req, res) => {
  const { codigo, nombre, facultadId, nivel } = req.body;

  if (!codigo || !nombre || !facultadId || !nivel) {
    return res.status(422).json({
      statusCode: 422,
      success: false,
      message: 'Todos los campos son requeridos',
    });
  }

  const idFacultad = Number(facultadId);
  const facultadExists = facultades.some(f => f.id === idFacultad);

  if (!facultadExists) {
    return res.status(404).json({
      statusCode: 404,
      success: false,
      message: `La facultad con id ${facultadId} no existe`,
    });
  }

  // HU1: código único
  if (programas.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
    return res.status(409).json({
      statusCode: 409,
      success: false,
      message: `Ya existe un programa con el código ${codigo}`,
    });
  }

  // HU1: nombre único dentro de la facultad
  if (programas.some(p => p.facultadId === idFacultad && p.nombre.toLowerCase() === nombre.toLowerCase())) {
    return res.status(409).json({
      statusCode: 409,
      success: false,
      message: `Ya existe el programa "${nombre}" en esa facultad`,
    });
  }

  const newPrograma = {
    id: nextProgramaId++,
    codigo,
    nombre,
    facultadId: idFacultad,
    nivel,
    createdBy: 'System',
    createdAt: new Date().toISOString(),
  };

  programas.push(newPrograma);

  return res.status(201).json({
    statusCode: 201,
    success: true,
    message: 'Programa creado correctamente',
    data: newPrograma,
  });
});

app.listen(PORT, HOST, () => {
  console.log(APP_NAME);
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});