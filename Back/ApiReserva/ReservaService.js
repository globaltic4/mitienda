const getMongo = require("./mongodb.js")
const ObjectId = require('mongodb').ObjectId;

let request = require("axios")

async function getConexiones() {
    //const nameDb = "adminvuelos"
    const nameDb = "globalticstore"
    const client = await getMongo.getClientExport(nameDb)
    const collection = await getMongo.getCollectionExport(client, nameDb)
    return { collection, client }
}

const reservasGet = async (idcliente) =>{
    const { collection, client } = await getConexiones()
    const reservas = collection.find({"idcliente":idcliente})
    const reservasList = await reservas.toArray()
    await getMongo.closeClientExport(client)
    return reservasList
}

const setEstadoReserva = async(reservaPago) =>{
    const { collection, client } = await getConexiones()

    console.log("Llego para cambiar estado")
    console.log(reservaPago)
    console.log({"_id":new ObjectId(reservaPago.idreserva)})
    await collection.updateOne({"_id":new ObjectId(reservaPago.idreserva)},{"$set":{"estadoPago":reservaPago.estadoReserva}})
    await getMongo.closeClientExport(client) 
    return "Pedido con pago confirmado"
}

const reservasSet = async (reserva) =>{
    const { collection, client } = await getConexiones()
    const reservas = collection.find({"idcliente":reserva.idcliente,"estadoPago":"Pendiente"}).toArray()
    if(reserva.length > 0){
            let sillas = reservas[0].sillas
            sillas.push(reserva.sillas)
            collection.updateOne({"idcliente":reserva.idcliente,"estadoPago":"Pendiente"},{"$set":{
                "sillas":productos
            }})
    }else{

    
    console.log("Llamda de guardar pedido ok...")
    const vuelo = request.get(
        "http://localhost:8081/vuelos/id/?id="+reserva.idvuelo
    )

    const cliente = request.get(
        "http://localhost:8082/clientes/id/?id="+reserva.idcliente
    )

    const reservaVuelo = request.patch(
        "http://localhost:8081/vuelos/sillas?id="+reserva.idvuelo,
        reserva.sillas
    )
    
    await request.all([vuelo,cliente,reservaVuelo])
    .then(
        async (res)=>{
            console.log("Llamada del articulo ok...")
            console.log(res[0].data)
            console.log(res[1].data)
            console.log(res[2].data)
            reserva.vuelo = res[0].data
            reserva.cliente = res[1].data
            reserva.mensaje = res[2].data

            for(let i = 0 ; i < reserva.sillas.length; i++ ){
                reserva.sillas[i].cancelada = true
            }
        
            console.log(reserva)
        
            await collection.insertOne(reserva).then(
                (resultado)=>{
                    console.log(resultado)
                }
            )

        }
    )
    .catch(
        (res)=>{
            console.log("Error")
            throw res
        }
    )
    
    
    }
    await getMongo.closeClientExport(client)
    
    return reserva

}

const reservasDelete = (id) =>{
    console.log(reservas)
    reservas = reservas.filter((vuel)=>{
        return vuel.id != id
    }
    )
    console.log(reservas)

    return reservas
}

const reservasEstadoIdget = async (idcliente,estado)=>{
    const { collection, client } = await getConexiones()
    console.log({"estadoPago":estado,"idclient":idcliente})
    const reservasCliente= collection.find({"estadoPago":estado,"idclient":idcliente})
    const reservasClienteList = await reservasCliente.toArray()
    await getMongo.closeClientExport(client)
    return reservasClienteList
}

const reservasACancelar = async ()=>{
    const { collection, client } = await getConexiones()
    const reservasCanceladas= collection.find({"estadoPago":"Pendiente"})
    const reservasCanceladaslist = await reservasCanceladas.toArray()
    for (let i = 0 ; i <reservasCanceladaslist.length;i++) {
        let reserva = reservasCanceladaslist[i]
        await request.patch(
                "http://localhost:8081/vuelos/sillas?id="+reserva.idvuelo,
                reserva.sillas
        ).then(
            async()=> {
                await collection.updateOne({"_id":reserva._id},{"$set":{"estadoPago":"Cancelada"}})
            }
        )
    };
    await getMongo.closeClientExport(client)
    return "Pedido cancelado"
}



module.exports.reservasgetExport = reservasGet;
module.exports.reservasSetExport = reservasSet;
module.exports.reservasDeleteExport = reservasDelete;
module.exports.reservasEstadoIdgetExport = reservasEstadoIdget;
module.exports.setEstadoReservaExport = setEstadoReserva;
module.exports.reservasACancelarExport = reservasACancelar;