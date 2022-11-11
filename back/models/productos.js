//Colección de productos
const mongoose = require("mongoose")

//Exquema de productos, método de mongoose.Schema
const productosSchema = mongoose.Schema({
    //X defecto crea una coleccion de tipo producto, requiere saber cada elemento q compone la coleccion
    nombreProducto: {
        type: String,
        required: [true, "Por favor registrar nombre del producto."],
        trim: true,   //Eliminar espacios en blanco
        maxLength: [120, "Nombre del producto no debe exceder 120 caracteres."]
    },
    descripcionProducto: {
        type: String,
        required: [true, "Por favor registre una descripcion para el producto."]
    },
    categoriaProducto: {
        type: String,
        required: [true, "Por favor seleccione la categoria del producto."],
        //enum: Permite registrar una lista de elementos y los numera de forma ordinal
        enum: {
            values: [
                "Gama Premium",
                "Gama Platinum",
                "Gama Gold",
                "Accesorios"
            ]
        }
    },
    stockProducto: {
        type: Number,
        required: [true, "Por favor registrar el stock del producto."],
        maxLength: [5, "Cantidad maxima del producto no puede sobrepasar 99999"],
        default: 0
    },
    precioCostoProducto: {
        type: Number,
        required: [true, "Por favor registre el precio costo del producto."],
        maxLength: [8, "Precio del producto no debe exceder 99'999.999."],
        default: 0.0   //Eliminar posibilidad de error
    },
    precioVentaProducto: {
        type: Number,
        required: [true, "Por favor registre el precio venta del producto."],
        maxLength: [8, "Precio del producto no debe exceder 99'999.999."],
        default: 0.0   //Eliminar posibilidad de error
    },
    imagenProducto: [
        {
            //Public id de la categoria
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    calificacionProducto: {
        type: Number,
        dafault: 0
    },
    numCalificacionesProducto: {
        type: Number,
        dafault: 0
    },
    opinionesProducto: [
        {
            nombreCliente: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comentario: {
                type: String,
                required: true
            }
        }
    ],
    /*user: {
        type: mongoose.Schema.Types.ObjectId,  //Relacionamos el producto con usuario (Objeto User)
        ref: 'User',
        required: true
    },*/
    fechaCreacionProducto: {
        type: Date,
        default: Date.now
    }
})

//Exportamos el modelo de productos y su Schema
module.exports = mongoose.model("productos", productosSchema);