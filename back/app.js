const express = require("express");  //Intercomunicador entre el back y el front
const app = express();
const errorMiddleware = require("./middleware/errors")

app.use(express.json());

<<<<<<< HEAD
//Importar las rutas
const productos = require("./routes/products")
//Creamos la ruta del navegador
app.use('/api', productos)

//MiddleWares para manejar errores de la Aplicación
app.use(errorMiddleware);

=======
/*Importar las rutas
const productos = require("./routes/products")
//Creamos la ruta del navegador
app.use('/api', productos)
*/
>>>>>>> dev_carlos
//Exportamos la 'app'
module.exports = app;