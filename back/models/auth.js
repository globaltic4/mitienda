//Colección de usuarios
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const usuarioSchema = new mongoose.Schema({
    documentoUsuario: {
        type: Number,
        required: [true, "Por favor registrar el documento del usuario."],
        maxLength: [10, "Cantidad maxima del documento no puede sobrepasar 9999999999"],
        default: 0
    },
    nombreUsuario: {
        type: String,
        required: [true, "Por favor ingrese el nombre"],
        maxlength: [120, "Nombre no puede exceder los 120 caracteres"]
    },
    emailUsuario: {
        type: String,
        required: [true, "Por favor ingrese el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un email valido"]
    },
    passwordUsuario: {
        type: String,
        required: [true, "Por favor registre una contraseña"],
        minlength: [8, "Tu contraseña no puede tener menos de 8 caracteres"],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    estadoUsuario: {
        type: String,
        default: 'activo'
    },
    avatarUsuario: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    fechaRegistroUsuario: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})

//Encriptación del password la realiza antes de crear el usuario
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("passwordUsuario")) {
        next()
    }
    this.passwordUsuario = await bcrypt.hash(this.passwordUsuario, 10)  //10:Nivel de encriptacion, consultar otros niveles
})

//Decodificados contraseñas y comparamos
usuarioSchema.methods.compararPass = async function (passDada) {
    return await bcrypt.compare(passDada, this.passwordUsuario)
}

//Retornar un JWT token, cundo me registre o inicie sesión. this._id:Extrae de BD el id del usuario
usuarioSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRACION
    })
}

//Generar un token para reset de contraseña
usuarioSchema.methods.genResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hashear y setear resetToken
    this.resetPasswordUsuarioToken = crypto.createHash("sha256").update(resetToken).digest('hex')

    //Setear fecha de expiracion del token
    this.resetPasswordUsuarioExpire = Date.now() + 30 * 60 * 1000 //el token dura solo 30 min

    return resetToken
}

module.exports = mongoose.model("auth", usuarioSchema);