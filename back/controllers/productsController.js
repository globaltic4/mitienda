const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//Importar objeto producto de models.
const producto = require("../models/productos")

//Crear un nuevo producto: /api/productos
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    //req.body.user = req.user.id;

    //Respuesta de tipo await(requiere async) = Esperar que ocurra p tener un producto nuevo
    const product = await producto.create(req.body);  //informacion del front (req.body)

    res.status(201).json({  //respuesta json positiva con el producto q acaba de crear 'product'
        success: true,
        message: "El siguiente producto fue creado en la BD.",
        product
    })
})

//Ver lista de productos
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    //Devuelve la lista, guardar en la 'productos'
    const productos = await producto.find();

    if (!productos) {
        return next(new ErrorHandler("Informacion no encontrada", 404))
    }

    res.status(200).json({
        success: true,
        cantidad: productos.length,  //Cuantos productos trajo 
        productos  //Lista de productos encontrados en la BD
    })
})

//Consulta producto x id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }

    res.status(200).json({
        success: true,
        message: "Esta es la informacion del producto solicitado.",
        product
    })
})

//Actualizar (UPDATE) x id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await producto.findById(req.params.id);
    
    //Verificar si no existe el producto y finalizar el proceso
    
    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }

    //Si existe realizo la actualizacion del producto
    product = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,  //Valido los atributos nuevos o actualizados
        runValidators: true
    });

    //Respondio ok si el producto se actualizo
    res.status(200).json({
        success: true,
        message: "Producto actualizado en la BD.",
        product
    })
})

