const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Importar la ruta de la API
const crearPreferencia = require("./api/crear-preferencia");
app.post("/api/crear-preferencia", crearPreferencia);

app.get("/", (req, res) => {
  res.send("API de Adonai funcionando ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
