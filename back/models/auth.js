//Colección de usuarios
const mongoose = require("mongoose")
const validator = require("validator")

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
    roleUsuario: {
        type: String,
        default: 'user'
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

module.exports = mongoose.model("auth", usuarioSchema);