const Pago = require("../models/pago");
const Producto = require("../models/productos");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//Crear un nuevo pago
exports.newPago = catchAsyncErrors(async (req, res, next) => {
    const {
        items,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo
    } = req.body;

    const pago = await Pago.create({
        items,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo,
        fechaPago: Date.now(),
        //user: req.user._id
    })

    res.status(201).json({
        success: true,
        message: "El siguiente pago fue creado en la BD.",
        pago
    })
})

//Ver un pago
exports.getOnePago = catchAsyncErrors(async (req, res, next) => {
    const pago = await Pago.findById(req.params.id)

    if (!pago) {
        return next(new ErrorHandler("No encontramos un pago con ese Id", 404))
    }

    res.status(200).json({
        success: true,
        message: "La informacion del pago es la siguiente: ",
        pago
    })
})

//Ver todos mis pagos
exports.getPagos = catchAsyncErrors(async (req, res, next) => {
    const pagos = await Pago.find();

    res.status(200).json({
        success: true,
        message: "Los siguientes pagos estan en la BD: ",
        pagos
    })
})

//Editar un pago 
exports.updatePago = catchAsyncErrors(async (req, res, next) => {
    let pago = await Pago.findById(req.params.id)

    if (!pago) {
        return next(new ErrorHandler("Pago no encontrado", 404))
    }

    if (pago.estado === "Enviado") {
        return next(new ErrorHandler("Este pago ya fue enviado", 400))
    }

    pago = await Pago.findByIdAndUpdate(req.params.id, req.body, {
        new: true,  //Valido los atributos nuevos o actualizados
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "El pago fue actualizado en la BD.",
        pago
    })
})

async function updateStock(id, quantity) {
    const producto = await Producto.findById(id);
    producto.stockProducto = producto.stockProducto - quantity;
    await producto.save({ validateBeforeSave: false })
}

//Eliminar un pago
exports.deletePago = catchAsyncErrors(async (req, res, next) => {
    const pago = await Pago.findById(req.params.id);

    if (!pago) {
        return next(new ErrorHandler("Este pago no esta registrado en BD", 404))
    }
    await pago.remove()

    res.status(200).json({
        success: true,
        message: "Pago eliminado correctamente de BD",
        pago
    })
})