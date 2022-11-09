const express = require("express");  //Intercomunicador entre el back y el front
const app = express();

app.use(express.json());

/*Importar las rutas
const productos = require("./routes/products")
//Creamos la ruta del navegador
app.use('/api', productos)
*/
//Exportamos la 'app'
module.exports = app;