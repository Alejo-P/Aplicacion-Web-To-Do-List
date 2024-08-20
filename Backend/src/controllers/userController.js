import User from "../models/usersModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendRecoveryPasswordEmail } from "../config/nodeMailer.js";

export const LoginUser = async (req, res) => { // Controlador para loguear un usuario
    try {
        const { email, password } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.keys(req.body).includes("")) {
            return res.status(400).json({
                    message: "Lo sentimos, debes llenar todos los campos",
                    data: []
                }
            );
        }
        // Validar que el usuario exista en la base de datos
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ 
                    message: "El usuario no se encuentra registrado en la base de datos",
                    data: []
                }
            );
        }
        if (!user?.status){
            return res.status(400).json({
                message: "El usuario no se encuentra activo",
                data: []
            });
        }

        // Validar la contraseña
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({
                    message: "La contraseña es incorrecta",
                    data: []
                }
            );
        }
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
        return res.status(500).json({
                message: error,
                data: []
            }
        );
    }
}

export const RegisterUser = async (req, res) => { // Controlador para registrar un usuario
    try {
        const { username, password, email } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.keys(req.body).includes("")) {
            return res.status(400).json({
                    message: "Lo sentimos, debes llenar todos los campos",
                    data: []
                }
            );
        }
        // Validar que el usuario no exista en la base de datos
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                    message: "El usuario ya se encuentra registrado en la base de datos",
                    data: []
                }
            );
        }
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
        return res.status(500).json({
                message: error,
                data: []
            }
        );
    }
}

export const RecoveryPassword = async (req, res) => { // Controlador para recuperar la contraseña
    try {
        const { email } = req.body; // Extraer los datos del cuerpo de la petición
        // Validar que los campos no estén vacíos
        if (Object.keys(req.body).includes("")) {
            return res.status(400).json({
                    message: "Lo sentimos, debes llenar todos los campos",
                    data: []
                }
            );
        }
        // Validar que el usuario exista en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                    message: "El usuario no se encuentra registrado en la base de datos",
                    data: []
                }
            );
        }
        // Generar un token de recuperación de contraseña
        user.token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        // Guardar el token en la base de datos
        await user.save();
        // Enviar correo electrónico al usuario
        await sendRecoveryPasswordEmail(email, user.token);
        // Enviar respuesta al cliente
        return res.status(200).json({
            message: "Correo electrónico enviado correctamente",
            data: user
        });
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(500).json({
                message: error,
                data: []
            }
        );
    }
}