let request = require("axios")
const getMongo = require("./mongodb.js")

async function getConexiones() {
    //const nameDb = "adminvuelos"
    const nameDb = "globalticstore"
    const client = await getMongo.getClientExport(nameDb)
    const collection = await getMongo.getCollectionExport(client, nameDb)
    return { collection, client }
}


const pagosGet = async (idclient) =>{
    const {collection, client } = await getConexiones()
    const pagos = collection.find({"idclient":idclient})
    const pagosList = await pagos.toArray()
    await getMongo.closeClientExport(client)
    return pagosList
}

const pagosSet = async (pago) =>{
    const {collection, client } = await getConexiones()
    if(pago.estado==="Aprobado"){
        const reserva= request.patch(
            "http://192.168.1.157:8084/reservas/reservas/estado",
            {"idreserva":pago.idreserva,"estadoReserva":"Confirmado"}
        ).then(
            (rep)=>{
                console.log("Pedido Confirmado")
            }
        ).catch(
            (error)=>{
                console.log("ERROR EN LA RESERVA DE ESTADO")
                console.log(error)
            }
        )
    }
    await collection.insertOne(pago).then(
        (resp)=>{
            console.log("Su pago ha sido registrado satisfactoriameinte")
        }
    )
    await getMongo.closeClientExport(client)
    return pago
}

const pagosDelete = (id) =>{
    console.log(pagos)
    pagos = pagos.filter((vuel)=>{
        return vuel.id != id
    }
    )
    console.log(pagos)
    return pagos
}

module.exports.pagosgetExport = pagosGet;
module.exports.pagosSetExport = pagosSet;
module.exports.pagosDeleteExport = pagosDelete;