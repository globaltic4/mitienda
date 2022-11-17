const getMongo = require("./mongodb.js")


const vuelosGet = async () =>{
    const { collection, client } = await getConexiones()
    const vuelos =await collection.find({}).toArray()
    await getMongo.closeClientExport(client)
    return vuelos
}

const vuelosSet = async (vuelo) =>{
    const { collection, client } = await getConexiones()
    await collection.insertMany(vuelo)
    await getMongo.closeClientExport(client)
    return await vuelosGet()
}

const vuelosDelete = (id) =>{
    console.log(vuelos)
    vuelos = vuelos.filter((vuel)=>{
        return vuel.id != id
    }
    )
    console.log(vuelos)
    return vuelos
}

const vuelosgetid = async (id) =>{
    var vueloEncontrado = null
    const { collection, client } = await getConexiones()
    await collection.findOne({"_id":id}).then(
        (respuesta) =>{
            vueloEncontrado = respuesta
        }
    )
    await getMongo.closeClientExport(client)
    return vueloEncontrado
}


const sillasReservadas = async (sillas, idvuelo)=>{
    const { collection, client } = await getConexiones()
    /*for (let i = 0; i< vuelos.length; i++){
        if(idvuelo === vuelos[i].id){
            for (let ivuelo = 0; ivuelo< vuelos[i].silla.length; ivuelo++){
                for (let j = 0; j < sillas.length; j++){
                    if(vuelos[i].silla[ivuelo].categoria === sillas[j].categoria){
                        vuelos[i].silla[ivuelo].silla -= sillas[j].silla
                    }
                }
            }
            i=vuelos.length
        }
    }*/
    var vuelo = null

    await collection.findOne({"_id":idvuelo}).then(
        (vueloresp)=>{
            vuelo = vueloresp
        }
    )
    for (let isilla = 0; isilla< vuelo.silla.length; isilla++){
        for (let j = 0; j < sillas.length; j++){
            if(vuelo.silla[isilla].categoria === sillas[j].categoria){
                if(sillas[j].cancelada){
                    vuelo.silla[isilla].silla += sillas[j].silla
                }else{
                    console.log(vuelo.silla[isilla].silla - sillas[j].silla)
                    if(vuelo.silla[isilla].silla - sillas[j].silla < 0){
                        console.log("Entro al error=?")
                        await getMongo.closeClientExport(client)
                        throw new Error("Producto no disponible")
                    }else{
                        vuelo.silla[isilla].silla -= sillas[j].silla
                    }
                }
            }
        }
    }

    await collection.updateOne({"_id":idvuelo},{"$set":{"silla":vuelo.silla}})
    await getMongo.closeClientExport(client)
    return "Articulo agregado al carrito de compras"

}

module.exports.vuelosgetExport = vuelosGet;
module.exports.vuelosSetExport = vuelosSet;
module.exports.vuelosDeleteExport = vuelosDelete;
module.exports.vuelosgetidExport = vuelosgetid;
module.exports.sillasReservadasExport = sillasReservadas;

async function getConexiones() {
    //const nameDb = "adminvuelos"
    const nameDb = "globalticstore"
    const client = await getMongo.getClientExport(nameDb)
    const collection = await getMongo.getCollectionExport(client, nameDb)
    return { collection, client }
}