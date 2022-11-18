const express = require("express");

const { registroUsuario,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    getAllUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//Creo una instancia de la app express y su enrutador
const router = express.Router();  

//Registrar un usuario, usamos POST
router.route('/usuario/registro').post(registroUsuario)

//Loguearse un usuario, usamos POST
router.route('/login').post(loginUser)

router.route('/logout').get(isAuthenticatedUser, logOut)
router.route("/forgotPassword").post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)

router.route('/yo').get(isAuthenticatedUser, getUserProfile)
router.route('/yo/updatePassword').put(isAuthenticatedUser, updatePassword)
router.route('/yo/updateProfile').put(isAuthenticatedUser, updateProfile)

//rutas admin
router.route('/admin/allUsers').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route('/admin/updateUser/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
router.route("/admin/deleteUser/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router;