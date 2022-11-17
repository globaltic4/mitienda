const express = require("express")
const cors = require("cors")
const body_parse = require("body-parser")
const path = require("path")
const clientesService = require("./clienteService.js")

const app = express()
const port = 8082


app.use(cors())
app.use(body_parse.json())

const pathName="/clientes"


app.get(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req)
        res.send(clientesService.clientesgetExport())
    }
)

app.get(pathName+"/id",
    async (req, res)=>{
        console.log("Recibimos peticion")
        let id = req.query.id
        res.send(await clientesService.clientesgetIdExport(id))
}
)


app.post(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        let clientes = clientesService.clientesSetExport(req.body)
        res.send({"mensaje":"cliente Guardado","clientes":clientes})
    }
)

app.delete(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        let id = req.query.id
        console.log(id)
        let clientes = clientesService.clientesDeleteExport(id)
        res.send({"mensaje":"cliente Guardado","clientes":clientes})
    }
)

app.put(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        res.send("Finaliza")
    }
)

app.patch(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        res.send("Finaliza")
    }
)


app.listen(port, 
    ()=>{
        console.log("Subio el app cliente en el puerto "+port)
    }
)