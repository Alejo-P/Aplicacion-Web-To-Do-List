import jwt from 'jsonwebtoken'; // Importar el módulo jwt
import dotenv from 'dotenv'; // Importar el módulo dotenv
dotenv.config(); // Configurar dotenv

// Middleware para verificar el token de autenticación
const auth = (req, res, next) => {
    try {
        // Extraer el token de la cabecera de la petición
        const token = req.headers.authorization.split(" ")[1];
        // Verificar que el token sea válido
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // Agregar el id del usuario al objeto req
        req.userInfo = decoded.id;
        // Continuar con la ejecución del código
        next();
    } catch (error) {
        // Enviar respuesta al cliente en caso de error
        return res.status(401).json({
                message: "No estás autorizado para realizar esta acción",
                data: []
            }
        );
    }
}

// Exportar el middleware
export default auth;