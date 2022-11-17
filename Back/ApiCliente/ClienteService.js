const getMongo = require("./mongodb.js")

async function getConexiones() {
    //const nameDb = "adminvuelos"
    const nameDb = "globalticstore"
    const client = await getMongo.getClientExport(nameDb)
    const collection = await getMongo.getCollectionExport(client, nameDb)
    return { collection, client }
}

const clientesGet = () =>{

    return clientes

}

const clientesSet = (cliente) =>{
    clientes.push(cliente)
    return clientes

}

const clientesDelete = (id) =>{
    console.log(clientes)
    clientes = clientes.filter((vuel)=>{
        return vuel.id != id
    }
    )
    console.log(clientes)
    return clientes
}

const clientesgetId = async (id) =>{
    const { collection, client } = await getConexiones()
    var clienteEncontrado = null
    await collection.findOne({"_id":id}).then(
        
        (client)=>{
            clienteEncontrado = client
        }
    
    )

    await getMongo.closeClientExport(client)
    return clienteEncontrado

}

module.exports.clientesgetExport = clientesGet;
module.exports.clientesSetExport = clientesSet;
module.exports.clientesDeleteExport = clientesDelete;
module.exports.clientesgetIdExport = clientesgetId;