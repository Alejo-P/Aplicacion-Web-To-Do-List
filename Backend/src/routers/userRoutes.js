import { Router } from "express";
import { 
    LoginUser,
    RegisterUser,
    ConfirmToken,
    RecoveryPassword,
    NewPassword,
    Perfil,
    UpdateUser,
    ChangePassword,
    DeleteUser
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import { authValidation } from "../middlewares/authValidation.js";

const router = Router(); // Inicializar el enrutador de express

router.post("/login", LoginUser); // Ruta para loguear un usuario
router.post("/register", authValidation, RegisterUser); // Ruta para registrar un usuario
router.post("/recovery-password", RecoveryPassword); // Ruta para recuperar la contraseña de un usuario
router.post("/new-password/:token", NewPassword); // Ruta para cambiar la contraseña de un usuario
router.get("/new-password/:token", ConfirmToken); // Ruta para confirmar el token de recuperación de contraseña

router.get("/perfil", auth, Perfil); // Ruta para obtener el perfil de un usuario
router.put("/update-user", auth, UpdateUser); // Ruta para actualizar un usuario
router.put("/change-password", auth, ChangePassword); // Ruta para cambiar la contraseña de un usuario
router.delete("/delete-user", auth, DeleteUser); // Ruta para eliminar un usuario

export default router; // Exportar el enrutador