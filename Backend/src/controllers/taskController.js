import Task from '../models/tasksModel.js'

export const CreateTask = async (req, res) => { // Controlador para crear una tarea
    try {
        const { userInfo:user } = req; // Obtener el usuario autenticado
        if (Object.values(req.body).includes('')) return res.status(400).json({ message: 'Por favor complete todos los campos' }); // Verificar que no haya campos vacios

        const { title, description, priority, date } = req.body; // Obtener los datos de la tarea
        const newTask = new Task({ title, description, priority, date, user }); // Crear una nueva tarea
        await newTask.save(); // Guardar la tarea en la base de datos

        // Enviar la respuesta al cliente
        res.status(201).json({message: 'Tarea creada con exito'});
    } catch (error) {
        // Enviar la respuesta de error al cliente
        res.status(500).json({ message: error.message });
    }
}

export const GetTasks = async (req, res) => { // Controlador para obtener las tareas
    try {
        const { userInfo:user } = req; // Obtener el usuario autenticado
        const tasks = await Task.find({ user }).sort({ date: 1 }).populate("user", "_id username email"); // Obtener las tareas del usuario autenticado

        // Enviar las tareas al cliente
        res.status(200).json(tasks);
    } catch (error) {
        // Enviar la respuesta de error al cliente
        res.status(500).json({ message: error.message });
    }
}

export const DetailTask = async (req, res) => { // Controlador para obtener una tarea
    try {
        const { userInfo:user } = req; // Obtener el usuario autenticado
        const { id } = req.params; // Obtener el id de la tarea
        const task = await Task.findById(id).populate("user", "_id username email"); // Buscar la tarea por su id

        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' }); // Verificar si la tarea existe
        if (task.user._id.toString() !== user.toString()) return res.status(401).json({ message: 'No autorizado' }); // Verificar si el usuario es el propietario de la tarea

        // Enviar la tarea al cliente
        res.status(200).json(task);
    } catch (error) {
        // Enviar la respuesta de error al cliente
        res.status(500).json({ message: error.message });
    }

}

export const UpdateTask = async (req, res) => { // Controlador para actualizar una tarea
    try {
        const { userInfo:user } = req; // Obtener el usuario autenticado
        const { id } = req.params; // Obtener el id de la tarea
        const task = await Task.findById(id); // Buscar la tarea por su id
        if (Object.values(req.body).includes('')) return res.status(400).json({ message: 'Por favor complete todos los campos' }); // Verificar que no haya campos vacios

        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' }); // Verificar si la tarea existe
        if (task.user.toString() !== user.toString()) return res.status(401).json({ message: 'No autorizado' }); // Verificar si el usuario es el propietario de la tarea

        await Task.findByIdAndUpdate(id, req.body); // Actualizar la tarea

        // Enviar la respuesta al cliente
        res.status(200).json({ message: 'Tarea actualizada con exito' });
    } catch (error) {
        // Enviar la respuesta de error al cliente
        res.status(500).json({ message: error.message });
    }
}

export const DeleteTask = async (req, res) => { // Controlador para eliminar una tarea
    try {
        const { userInfo:user } = req; // Obtener el usuario autenticado
        const { id } = req.params; // Obtener el id de la tarea
        
        const task = await Task.findById(id); // Buscar la tarea por su id
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' }); // Verificar si la tarea existe
        if (task.user.toString() !== user.toString()) return res.status(401).json({ message: 'No autorizado' }); // Verificar si el usuario es el propietario de la tarea

        await Task.findByIdAndDelete(id); // Eliminar la tarea
        res.status(200).json({ message: 'Tarea eliminada con exito' }); // Enviar la respuesta al cliente
    } catch (error) {
        // Enviar la respuesta de error al cliente
        res.status(500).json({ message: error.message });
    }
}