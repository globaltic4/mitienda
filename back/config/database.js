//Importamos la 'app' del archivo 'app.js'
const app = require("./app");
const connectDatabase = require("./config/database");

//Setear el archivo de configuracion
const dotenv = require("dotenv");

dotenv.config({ path: 'back/config/config.env' })

//Llamar el metodo de BD que esta en database.js
connectDatabase();

//Llamamos al servidor
const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})