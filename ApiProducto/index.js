const express = require("express")
const cors = require("cors")
const body_parse = require("body-parser")
const path = require("path")
const productosService = require("./productoService.js")

const app = express()
const port = 8081


app.use(cors())
app.use(body_parse.json())

const pathName="/productos"


app.get(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req)
        res.send(productosService.productosgetExport())
    }
)


app.get(pathName+"/id",

        (req, res)=>{
            console.log("Recibimos petición")
            let id = req.query.id
            console.log(id)
            res.send(productosService.productosgetidExport(id))
        }
    )


app.post(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        let productos = productosService.productosSetExport(req.body)
        res.send({"mensaje":"Producto agregado correctamente","productos":productos})
    }
)

app.delete(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        let id = req.query.id
        console.log(id)
        let productos = productosService.productosDeleteExport(id)
        res.send({"mensaje":"Producto eliminado correctamente","productos":productos})
    }
)

app.put(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        res.send("Conexión finalizada")
    }
)

app.patch(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        res.send("Conexión finalizada")
    }
)

app.patch(pathName+"/cantidades",

    (req, res)=>{
        console.log("pedido cantidades")
        console.log(req.body)
        id = req.query.id
        res.send(productosService.cantidadesReservadasExport(req.body,id))
    }   
)


app.listen(port, 
    ()=>{
        console.log("El API PRODUCTOS subio correctamente por el puerto: "+port)
    }
)