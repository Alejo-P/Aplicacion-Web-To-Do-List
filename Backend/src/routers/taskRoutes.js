import { Router } from 'express'
import { 
    CreateTask,
    GetTasks,
    DetailTask,
    UpdateTask,
    DeleteTask
} from '../controllers/taskController.js'
import auth from '../middlewares/auth.js'
import { taskValidation } from '../middlewares/taskValidation.js'

const router = Router()

router.post('/create-task', taskValidation, auth, CreateTask) // Ruta para crear una tarea
router.get('/get-tasks', auth, GetTasks) // Ruta para obtener las tareas

router.route('/task/:id') // Ruta para obtener una tarea
    .get(auth, DetailTask) // Verbo HTTP GET
    .put(auth, UpdateTask) // Verbo HTTP PUT
    .delete(auth, DeleteTask) // Verbo HTTP DELETE

export default router // Exportar el enrutador