let pedidos = require("./pedidos.json")
let request = require("axios")

const pedidosGet = () =>{

    return pedidos

}

const setEstadopedidoExport = (pedidoPago) =>{

    for(let i = 0; i<pedidos.length; i++){
        if(pedidos[i].id === pedidoPago.idpedido){
            pedidos[i].estadoPago = pedidoPago.estadopedido
            i = pedidos.length
        }
    }
    return "Su pago fue confirmado"
}

const pedidosSet = async (pedido) =>{
    console.log("Su pedido fue guardado exitosamente")
    const producto = request.get(
        "http://localhost:8081/productos/id/?id="+pedido.idproducto
    )

    const cliente = request.get(
        "http://localhost:8082/clientes/id/?id="+pedido.idcliente
    )

    const pedidoproducto = request.patch(
        "http://localhost:8081/productos/cantidades?id="+pedido.idproducto,
        pedido.cantidades
    )
    
    await request.all([producto,cliente,pedidoproducto])
    .then(
        (res)=>{
            console.log("Recibimos llamada del producto")
            console.log(res[0].data)
            console.log(res[1].data)
            console.log(res[2].data)
            pedido.producto = res[0].data
            pedido.cliente = res[1].data
            pedido.mensaje = res[2].data
        }
    )
    .catch(
        (res)=>{
            console.log("Error")
        }
    )
    
    console.log(pedido)
    pedidos.push(pedido)
    console.log(pedidos)

    return pedidos

}

const pedidosDelete = (id) =>{
    console.log(pedidos)
    pedidos = pedidos.filter((prod)=>{
        return prod.id != id
    }
    )
    console.log(pedidos)
    return pedidos
}

const pedidosPendientesIdget = (idcliente)=>{

    const pedidosCliente= pedidos.filter(
        (reser) =>{
        
            return reser.estadoPago === "Pendiente" && reser.idcliente === idcliente
        }
    )

    return pedidosCliente

}

module.exports.pedidosgetExport = pedidosGet;
module.exports.pedidosSetExport = pedidosSet;
module.exports.pedidosDeleteExport = pedidosDelete;
module.exports.pedidosPendientesIdgetExport = pedidosPendientesIdget;