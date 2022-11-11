let pagos = require("./pagos.json")


const pagosGet = () =>{

    return pagos

}

const pagosSet = (pago) =>{
    pagos.push(pago)
    return pagos

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