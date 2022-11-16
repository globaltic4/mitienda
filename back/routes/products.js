//express: Intercomunicador entre back y front
const express = require("express")

//Crear un enrutador
const router = express.Router();

//Crear constante de tipo array/json, para la lista de productos
//Traemos la respuesta json desde el controlador
const { getProducts, 
        newProduct, 
        getProductById, 
        updateProduct, 
        deleteProduct 
} = require("../controllers/productsController")

//Ruta para consultar todos los productos 'getProducts'
//Los parámetros dentro del get se ejecutan en ese orden para el proceso de autenticación
router.route('/productos').get(getProducts);

//Ruta para crear un nuevo producto (CREATE)
router.route('/producto/nuevo').post(newProduct);

//Ruta consulta producto x id (FIND) (get)
router.route('/producto/:id').get(getProductById);

//Ruta actualiza producto x id (UPDATE) (put)
router.route('/producto/:id').put(updateProduct);

//Ruta elimina el producto x id (DELETE)
router.route('/producto/:id').delete(deleteProduct);

//Exportamos el router
module.exports = router;