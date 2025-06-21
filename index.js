const express = require('express');
const cors = require('cors');
const app = express();
const crearPreferencia = require('./api/crear-preferencia.js'); // Importa bien la función
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Usa directamente la función como handler de la ruta
app.post('/api/crear-preferencia', crearPreferencia);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});