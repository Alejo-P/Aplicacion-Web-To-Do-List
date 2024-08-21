import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendRecoveryPasswordEmail } from "../config/nodeMailer.js";

export const LoginUser = async (req, res) => { // Controlador para loguear un usuario
    try {
        const { email, password } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.values(req.body).includes("")) return res.status(400).json({message: "Lo sentimos, debes llenar todos los campos"});

        // Validar que el usuario exista en la base de datos
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ message: "El usuario no se encuentra registrado en la base de datos"});
        if (!user?.status) return res.status(400).json({message: "El usuario no se encuentra activo"});

        // Validar la contraseña
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return res.status(400).json({message: "La contraseña es incorrecta"});

        // Generar un token de autenticación
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: 86400 // 24 horas
        });

        const { _id, email:mail, status, username } = user; // Extraer los datos del usuario

        // Enviar respuesta al cliente
        return res.status(200).json({
            message: "Usuario logueado correctamente",
            data: { _id, email:mail, status, username, token }
        });
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}

export const RegisterUser = async (req, res) => { // Controlador para registrar un usuario
    try {
        const { username, password, email } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.values(req.body).includes("")) return res.status(400).json({message: "Lo sentimos, debes llenar todos los campos"});

        // Validar que el usuario no exista en la base de datos
        const user = await User.findOne({ username });
        if (user) return res.status(400).json({message: "Ese nombre de usuario ya se encuentra registrado en la base de datos"});
        // Validar que el correo electrónico no exista en la base de datos
        const emailUser = await User.findOne({ email });
        if (emailUser) return res.status(400).json({message: "Ese correo electrónico ya se encuentra registrado en la base de datos"});

        const nuevoUsuario = new User({ username, password, email }); // Crear un nuevo usuario
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        nuevoUsuario.password = await bcrypt.hash(password, salt);
        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        // Enviar respuesta al cliente
        return res.status(200).json({
            message: "Usuario registrado correctamente",
            data: nuevoUsuario
        });
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}

export const RecoveryPassword = async (req, res) => { // Controlador para recuperar la contraseña
    try {
        const { email } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.values(req.body).includes("")) return res.status(400).json({message: "Lo sentimos, debes llenar todos los campos"});
        // Validar que el usuario exista en la base de datos
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({message: "El usuario no se encuentra registrado en la base de datos"});

        // Generar un token de recuperación de contraseña
        user.token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        // Guardar el token en la base de datos
        await user.save();
        // Enviar correo electrónico al usuario
        await sendRecoveryPasswordEmail(email, user.token);

        // Enviar respuesta al cliente
        return res.status(200).json({message: "Correo electrónico enviado correctamente"});
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}

export const ConfirmToken = async (req, res) => { // Controlador para confirmar el token de recuperación de contraseña
    try {
        const { token } = req.params; // Extraer los datos de los parámetros de la petición
        // Validar que el usuario exista en la base de datos
        const user = await User.findOne({ token });
        if (!user) return res.status(400).json({message: "El token no es válido"});

        // Enviar respuesta al cliente
        return res.status(200).json({message: "Token confirmado correctamente"});
    }catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}

export const NewPassword = async (req, res) => { // Controlador para cambiar la contraseña
    try {
        const { token } = req.params; // Extraer los datos de los parámetros de la petición
        const { password, confirmPassword } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.values(req.body).includes("")) return res.status(400).json({message: "Lo sentimos, debes llenar todos los campos"});
        // Validar que el usuario exista en la base de datos
        const user = await User.findOne({ token });
        if (!user) return res.status(400).json({message: "Lo sentimos, no puedimos validar el token"});
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) return res.status(400).json({message: "Las contraseñas no coinciden"});

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.token = null; // Eliminar el token de recuperación de contraseña
        // Guardar la nueva contraseña en la base de datos
        await user.save();

        // Enviar respuesta al cliente
        return res.status(200).json({message: "Contraseña actualizada correctamente"});
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}

export const Perfil = async (req, res) => { // Controlador para obtener el perfil de un usuario
    try {
        const user = await User.findById(req.userInfo).select("-createdAt -updatedAt -password -token -__v"); // Buscar el usuario por su id
        if (!user) return res.status(400).json({message: "El usuario no se encuentra registrado en la base de datos",});

        // Enviar respuesta al cliente
        return res.status(200).json({
            message: "Perfil del usuario obtenido correctamente",
            data: user
        });
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}

export const UpdateUser = async (req, res) => { // Controlador para actualizar un usuario
    try {
        const { username, email } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.values(req.body).includes("")) return res.status(400).json({message: "Lo sentimos, debes llenar todos los campos"});
        // Validar que el usuario exista en la base de datos
        const user = await User.findById(req.userInfo);
        if (!user) return res.status(400).json({message: "El usuario no se encuentra registrado en la base de datos"});

        if (user.username !== username){
            // Validar que el nombre de usuario no exista en la base de datos
            const userUsername = await User.findOne({ username });
            if (userUsername) return res.status(400).json({message: "El nombre de usuario ya se encuentra registrado en la base de datos"});
        }

        if (user.email !== email){
            // Validar que el correo electrónico no exista en la base de datos
            const userEmail = await User.findOne({ email });
            if (userEmail) return res.status(400).json({message: "El correo electrónico ya se encuentra registrado en la base de datos"});
        }

        // Actualizar los datos del usuario
        user.username = username;
        user.email = email;
        // Guardar los cambios en la base de datos
        await user.save();

        // Enviar respuesta al cliente
        return res.status(200).json({message: "Usuario actualizado correctamente"});
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}

export const ChangePassword = async (req, res) => { // Controlador para cambiar la contraseña de un usuario
    try {
        const { password, newPassword, confirmPassword } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.values(req.body).includes("")) return res.status(400).json({message: "Lo sentimos, debes llenar todos los campos"});
        // Validar que el usuario exista en la base de datos
        const user = await User.findById(req.userInfo);
        if (!user) return res.status(400).json({message: "El usuario no se encuentra registrado en la base de datos"});

        // Validar la contraseña
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return res.status(400).json({message: "La contraseña es incorrecta"});
        // Validar que las contraseñas coincidan
        if (newPassword !== confirmPassword) return res.status(400).json({message: "Las contraseñas no coinciden"});

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        // Guardar la nueva contraseña en la base de datos
        await user.save();

        // Enviar respuesta al cliente
        return res.status(200).json({message: "Contraseña actualizada correctamente"});
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}

export const DeleteUser = async (req, res) => { // Controlador para eliminar un usuario
    try {
        // Validar que el usuario exista en la base de datos
        const user = await User.findById(req.userInfo); // Buscar el usuario por su id
        if (!user) return res.status(400).json({message: "El usuario no se encuentra registrado en la base de datos"});
        
        // Eliminar el usuario
        user.status = false;
        await user.save();

        // Enviar respuesta al cliente
        return res.status(200).json({message: "Usuario eliminado correctamente"});
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({message: error});
    }
}