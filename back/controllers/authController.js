const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const tokenEnviado = require("../utils/jwtToken");  //Recibe el token guardado en una cookie generado en utils\
//const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
//const cloudinary = require("cloudinary")

//Registrar un nuevo usuario /api/usuario/registro
exports.registroUsuario = catchAsyncErrors(async (req, res, next) => {
    const { documentoUsuario, 
            nombreUsuario, 
            emailUsuario, 
            passwordUsuario } = req.body;

    /*const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 240,
        crop: "scale"
    })
    */
    const user = await User.create({
        documentoUsuario,
        nombreUsuario,
        emailUsuario,
        passwordUsuario,
        avatarUsuario: {
            public_id: "ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp", 
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU"
        }
    })

    tokenEnviado(user, 201, res)
})

//Iniciar Sesion - Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { emailUsuario, passwordUsuario } = req.body;

    //revisar si los campos estan completos
    if (!emailUsuario || !passwordUsuario) {
        return next(new ErrorHandler("Por favor ingrese email & Contraseña", 400))
    }

    //Buscar al usuario en nuestra base de datos
    const user = await User.findOne({ emailUsuario }).select("+passwordUsuario")  //Agregamos el pass a la consulta
    if (!user) {
        return next(new ErrorHandler("Email o contraseña invalidos", 401))
    }

    //Comparar contraseñas, verificar si está bien, el método se define en models/auth.js
    const contrasenaOK = await user.compararPass(passwordUsuario);

    if (!contrasenaOK) {
        return next(new ErrorHandler("Contraseña invalida", 401))
    }

    tokenEnviado(user, 200, res)

})

//Cerrar Sesion (logout)
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Cerró sesión"
    })
})

//Olvide mi contraseña, recuperar contraseña
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ emailUsuario: req.body.emailUsuario });

    if (!user) {
        return next(new ErrorHandler("Usuario no se encuentra registrado", 404))
    }
    const resetToken = user.genResetPasswordToken();

    await user.save({ validateBeforeSave: false })  //No valide los otros campos de 'usuarioSchema'

    //Crear una url para hacer el reset de la contraseña
    const resetUrl = `${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;

    const mensaje = `Hola!\n\nTu link para ajustar una nueva contraseña es el 
    siguiente: \n\n${resetUrl}\n\n
    Si no solicitaste este link, por favor comunicate con soporte.\n\n Att:\nmi tienda`

    try {
        await sendEmail({
            emailUsuario: user.emailUsuario,
            subject: "mi tienda Recuperación de la contraseña",
            mensaje
        })
        res.status(200).json({
            success: true,
            message: `Correo enviado a: ${user.emailUsuario}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})

//Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash el token que llego con la URl
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    //Buscamos al usuario al que le vamos a resetear la contraseña
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    //El usuario si esta en la base de datos?
    if (!user) {
        return next(new ErrorHandler("El token es invalido o ya expiró", 400))
    }
    //Diligenciamos bien los campos?
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Contraseñas no coinciden", 400))
    }

    //Setear la nueva contraseña
    user.passwordUsuario = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    tokenEnviado(user, 200, res)
})

//Ver perfil de usuario (Usuario que esta logueado)
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


//Update Contraseña (usuario logueado)
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+passwordUsuario");

    //Revisamos si la contraseña vieja es igual a la nueva
    const sonIguales = await user.compararPass(req.body.oldPassword)

    if (!sonIguales) {
        return next(new ErrorHandler("La contraseña actual no es correcta", 401))
    }

    user.passwordUsuario = req.body.newPassword;
    await user.save();

    tokenEnviado(user, 200, res)
})

//Update perfil de usuario (logueado)
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    //Actualizar el email, role por user a decisión de cada uno
    const newUserData = {
        nombreUsuario: req.body.nombreUsuario,
        emailUsuario: req.body.emailUsuario,
        estadoUsuario: req.body.estadoUsuario,
        role: req.body.role
        
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Servicios controladores sobre usuarios por parte de los ADMIN

//Ver todos los usuarios
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//Ver el detalle de 1 usuario
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`No se ha encontrado ningun usuario con el id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Actualizar perfil de usuario (como administrador)
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const nuevaData = {
        nombreUsuario: req.body.nombreUsuario,
        emailUsuario: req.body.emailUsuario,
        role: req.body.role,
        estadoUsuario: req.body.estadoUsuario
    }

    const user = await User.findByIdAndUpdate(req.params.id, nuevaData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Usuario actualizado correctamente",
        user
    })
})

//Eliminar usuario (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`Usuario con id: ${req.params.id} 
        no se encuentra en nuestra base de datos`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente"
    })
})
