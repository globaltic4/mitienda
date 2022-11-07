//express: Intercomunicador entre back y front
const express = require("express")

//Crear un enrutador
const router = express.Router();

//Crear constante de tipo array/json, para la lista de productos
//Traemos la respuesta json desde el controlador
const { getProducts, newProduct, getProductById, updateProduct } = require("../controllers/productsController")

//Ruta para consultar todos los productos 'getProducts'
//Los parámetros dentro del get se ejecutan en ese orden para el proceso de autenticación
router.route('/productos').get(getProducts);

//Ruta para crear un nuevo producto (CREATE)
router.route('/producto/nuevo').post(newProduct);

//Ruta consulta producto x id (FIND)
router.route('/producto/:id').get(getProductById);

//Ruta actualiza producto x id (UPDATE)
router.route('/producto/:id').put(updateProduct);

//Exportamos el router
module.exports = router;