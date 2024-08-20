import { Router } from "express";
import { LoginUser, RegisterUser, RecoveryPassword } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = Router(); // Inicializar el enrutador de express

router.post("/login", LoginUser); // Ruta para loguear un usuario
router.post("/register", RegisterUser); // Ruta para registrar un usuario
router.post("/recovery-password", RecoveryPassword); // Ruta para recuperar la contraseña de un usuario

export default router; // Exportar el enrutador