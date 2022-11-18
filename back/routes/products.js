//express: Intercomunicador entre back y front
const express = require("express")

//Crear un enrutador
const router = express.Router();

//Traemos la respuesta json desde el controlador
const { getProducts, 
        newProduct, 
        getProductById, 
        updateProduct, 
        deleteProduct 
} = require("../controllers/productsController")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//Ruta para consultar todos los productos 'getProducts'
router.route('/productos').get(getProducts);

//Ruta consulta producto x id (FIND) (get)
router.route('/producto/:id').get(getProductById);

//Ruta para crear un nuevo producto (CREATE)
//Los parámetros dentro del post se ejecutan en ese orden para el proceso de autenticación
router.route('/producto/nuevo').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

//Ruta actualiza producto x id (UPDATE) (put)
router.route('/producto/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

//Ruta elimina el producto x id (DELETE)
router.route('/producto/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

//Exportamos el router
module.exports = router;