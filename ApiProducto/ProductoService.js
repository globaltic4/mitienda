let productos = require("./productos.json")


const productosGet = () =>{

    return productos

}

const productosSet = (producto) =>{
    productos.push(producto)
    return productos

}

const productosDelete = (id) =>{
    console.log(productos)
    productos = productos.filter((prod)=>{
        return prod.id != id
    }
    )
    console.log(productos)
    return productos
}

const productosgetid = (id) =>{

    let producto = productos.find(

        (elemento)=>{
            return elemento.id === id
        }

    )

    return producto
}


const cantidadesReservadas = (cantidades, idproducto)=>{

    for (let i = 0; i< productos.length; i++){
        if(idproducto === productos[i].id){
            for (let iproducto = 0; iproducto< productos[i].cantidad.length; iproducto++){
                for (let j = 0; j < cantidades.length; j++){
                    if(productos[i].cantidad[iproducto].categoria === cantidades[j].categoria){
                        productos[i].cantidad[iproducto].cantidad -= cantidades[j].cantidad
                    }
                }
            }
            i=productos.length
        }
    }

    return "Pedido resevado exitosamente, puede continuar agregando al carrito"

}

module.exports.productosgetExport = productosGet;
module.exports.productosSetExport = productosSet;
module.exports.productosDeleteExport = productosDelete;
module.exports.productosgetidExport = productosgetid;
module.exports.cantidadesReservadasExport = cantidadesReservadas;