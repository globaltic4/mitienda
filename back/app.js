const express = require("express");  //Intercomunicador entre el back y el front
const app = express();
const errorMiddleware = require("./middleware/errors")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Importar las rutas
const productos = require("./routes/products")
const pagos = require("./routes/pagos")
const usuarios = require("./routes/auth")

//Creamos la ruta del navegador
app.use('/api', productos)
app.use('/api', pagos)
app.use('/api', usuarios)

//MiddleWares manejo errores de la Aplicación
app.use(errorMiddleware);

//Exportamos la 'app'
module.exports = app;