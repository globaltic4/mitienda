//Ubicacion de mongo BD:C:\Program Files\MongoDB\Server\6.0\bin
const mongoose = require("mongoose");

//Método de conexion a mongo DB
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,  //Permite q entre una nueva url
        useUnifiedTopology: true
    }).then(con => {
        console.log(`Base de datos mongo conectada con el servidor: ${con.connection.host}`)
    }).catch(con => {
        console.log(`No se logro la conexion con la BD`)
    })
}

//Exportamos el metodo: connectDatabase
module.exports = connectDatabase;