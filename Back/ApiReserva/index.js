const express = require("express")
const cors = require("cors")
const body_parse = require("body-parser")
const path = require("path")
const reservasService = require("./reservaService.js")

const app = express()
const port = 8084


app.use(cors())
app.use(body_parse.json())

const pathName="/reservas"


app.get(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        res.send(reservasService.reservasgetExport())
    }
)

app.get(pathName+"/estado/idcliente",
    async (req, res)=>{
        console.log("Recibimos peticion")
        idclient = req.query.id
        estado = req.query.estado
        res.send(await reservasService.reservasEstadoIdgetExport(idclient,estado))
    }
)

app.get(pathName+"/reservascanceladas",
    async (req, res)=>{
        console.log("Recibimos peticion")
        res.send(await reservasService.reservasACancelarExport())
    }
)


app.post(pathName,
    async (req, res)=>{
        try {
            console.log("Recibimos peticion")
            console.log(req.body)
            let reservas = await reservasService.reservasSetExport(req.body)
            res.send({"mensaje":"Producto agregado al carrito de compras","reservas":reservas})
        } catch (error) {
            res.status(500)
            res.send({"mensaje":error})
        }
        
    }
)

app.delete(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        let id = req.query.id
        console.log(id)
        let reservas = reservasService.reservasDeleteExport(id)
        res.send({"mensaje":"Producto agregado al carrito de compras","reservas":reservas})
    }
)

app.put(pathName,
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        res.send("Finaliza")
    }
)

app.patch(pathName+"/reservas/estado",
    (req, res)=>{
        console.log("Recibimos peticion")
        console.log(req.body)
        res.send(reservasService.setEstadoReservaExport(req.body))
    }
)


app.listen(port, 
    ()=>{
        console.log("Subio el app reserva en el puerto "+port)
    }
)