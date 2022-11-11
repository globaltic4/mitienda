const express = require("express")
const cors = require("cors")
const body_parse = require("body-parser")
const path = require("path")
const pedidosService = require("./pedidoService.js")

const app = express()
const port = 8084


app.use(cors())
app.use(body_parse.json())

const pathName="/pedidos"


app.get(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req)
        res.send(pedidosService.pedidosgetExport())
    }
)

app.get(pathName+"/pendientes/idcliente",
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req)
        idclient = req.query.id
        res.send(pedidosService.pedidosPendientesIdgetExport(id))
    }
)


app.post(pathName,
    async (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        let pedidos = await pedidosService.pedidosSetExport(req.body)
        res.send({"mensaje":"Pedido guardado exitosamente","pedidos":pedidos})
    }
)

app.delete(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        let id = req.query.id
        console.log(id)
        let pedidos = pedidosService.pedidosDeleteExport(id)
        res.send({"mensaje":"pedido guardado exitosamente","pedidos":pedidos})
    }
)

app.put(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        res.send("Conexión finalizada")
    }
)

app.patch(pathName+"/pedidos/estado",
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        res.send(pedidosService.setEstadopedidoExport(req.body))
    }
)


app.listen(port, 
    ()=>{
        console.log("El API PEDIDO subio correctamente por el puerto: "+port)
    }
)