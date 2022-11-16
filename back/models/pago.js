const mongoose = require("mongoose")

const pagoSchema = mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "auth"
    },
    items: [{
        nombre: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "productos"
        }
    }
    ],
    pagoInfo: {
        id: {
            type: String
        },
        estado: {
            type: String
        }
    },
    fechaPago: {
        type: Date
    },
    precioItems: {
        type: Number,
        required: true,
        default: 0.0
    },
    precioImpuesto: {
        type: Number,
        required: true,
        defautl: 0.0
    },
    precioEnvio: {
        type: Number,
        required: true,
        default: 0.0
    },
    precioTotal: {
        type: Number,
        required: true,
        default: 0.0
    },
    estado: {
        type: String,
        required: true,
        default: "Procesando"
    },
    fechaEnvio: {
        type: Date
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("pago", pagoSchema)