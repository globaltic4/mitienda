const express = require("express");
const router = express.Router();
const { newPago,
    getOnePago,
    getPagos,
    updatePago,
    deletePago
} = require("../controllers/pagoController");
//const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/pago/nuevo").post(newPago)
router.route("/pago/:id").get(getOnePago)
router.route("/pagos").get(getPagos)
router.route('/pago/:id').put(updatePago)
router.route('/pago/:id').delete(deletePago);

module.exports = router;