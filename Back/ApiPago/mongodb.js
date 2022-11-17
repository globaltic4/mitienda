//Cargar libreria MongoDB
const{MongoClient, Db} = require("mongodb")

//Conexion del cliente mongo
const getClient = async (nameDb)=>{
    //const nameDb = "adminvuelos"
    const url = "mongodb+srv://Globaltic:Abcd.1234@cluster0.qlapako.mongodb.net/"+nameDb
    
    const client = new MongoClient(url)
    await client.connect()
    .then(
        (db)=>{
            console.log("Conexion exitosa")
        }
    )
    .catch(
        (error)=>{
            console.log("Error de conexion a la DB")
        }
    )
    return client
}

//Obtener collecciones
const getCollection = async (client, nameDb) =>{

    const db = client.db(nameDb)
    const colleccion = await db.collection("pagos")
    return colleccion

}

//cerrar conexion 
const closeClient = async (client)=>{
    await client.close()
}


//Cargamos los modulos
    module.exports.getCollectionExport = getCollection;
    module.exports.getClientExport = getClient;
    module.exports.closeClientExport = closeClient;
    


