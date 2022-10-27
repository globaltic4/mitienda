const express = require("express");  //Intercomunicador entre el back y el front
const app = express();

app.use(express.json());

<<<<<<< HEAD
//Importar las rutas
//const productos = require("./routes/products")

//Creamos la ruta del navegador
//app.use('/api', productos)


=======
/*Importar las rutas
const productos = require("./routes/products")
//Creamos la ruta del navegador
app.use('/api', productos)
*/
>>>>>>> 54db539d660e85d8d4b289f221ba90edbcaa5a37
//Exportamos la 'app'
module.exports = app;