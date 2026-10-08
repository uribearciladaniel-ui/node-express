const express = require('express');
const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || 'localhost';
const APP_NAME = process.env.APP_NAME || 'Mi Aplicación';


app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    success: true,
    message: 'API is healthy',
    version: '1.0.0',
  });
});

/* const productos = [
  { id: 1, nombre: 'Producto A', precio: 10.99 },
  { id: 2, nombre: 'Producto B', precio: 15.49 },
  { id: 3, nombre: 'Producto C', precio: 7.99 },
  { id: 4, nombre: 'Producto D', precio: 12.99 },
];

app.get('/api/productos', (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    message: 'Productos obtenidos correctamente',
    data: productos
  });  
});  */

const facultades = [
  { id: 1, nombre: 'Facultad de Ingeniería' },
  { id: 2, nombre: 'Facultad de Ciencias Sociales' },
  { id: 3, nombre: 'Facultad de Ciencias de la Salud' },
];

const {
  codigo, 
  nombre, 
  facultadId, 
  nivel, 
} = req.body;

if (!codigo || !nombre || !facultadId || !nivel) {
  return res.status(422).json({
    statusCode: 422,
    success: false,
    message: 'Todos los campos son requeridos'
  });
}

const facultadExists = facultades.some(facultad => facultad.id === facultadId);

if (!facultadExists) {
  return res.status(404).json({
    statusCode: 404,
    success: false,
    message: 'La facultad con id ${facultadId} no existe'
  });
}

const newPrograma = {
  id: nextProgramaId++,
  codigo,
  nombre,
  facultadId,
  nivel,
  CreateBy: "System",
  createdAt: new Date().toISOString()
};

programas.push(newPrograma);

return res.status(201).json({
  statusCode: 201,
  success: true,
  message: 'Programa creado correctamente',
  data: newPrograma
});

app.get('/api/facultades', (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    message: 'Facultades obtenidas correctamente',
    data: facultades
  });
});

const programas = [
  { id: 1, codigo: 'ING-SIS', nombre: 'Ingeniería de Sistemas', facultadId: 1, nivel: 'Pregrado',CreateBy: "System", createdAt: new Date().toISOString() },
  { id: 2, codigo: 'ING-CIV', nombre: 'Ingeniería Civil', facultadId: 1, nivel: 'Pregrado',CreateBy: "System", createdAt: new Date().toISOString() },
  { id: 3, codigo: 'PSI', nombre: 'Psicología', facultadId: 2, nivel: 'Pregrado',CreateBy: "System", createdAt: new Date().toISOString()}
];

let nextProgramaId = 4;

app.get('/api/programas', (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    message: 'Programas obtenidos correctamente',
    data: programas
  });
}); 

app.post('/api/programas/store', (req, res) => {
  console.log(req.body);
  res.json({
    statusCode: 201,
    success: true,
    message: 'Programa creado correctamente',
    recibido: req.body
  }); 
});

app.listen(PORT, HOST,() => {
  console.log(APP_NAME);
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});