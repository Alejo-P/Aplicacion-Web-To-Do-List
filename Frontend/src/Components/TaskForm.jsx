import { useEffect, useState } from "react"
import { useTask } from "../Contexts/TaskProvider"
import { useAuth } from "../Contexts/AuthProvider"
import Alertas from "./Alertas"

const TaskForm = ({ tarea }) => {
    const { user } = useAuth();
    const { CreateTask, UpdateTask, alert:taskAlert } = useTask();
    const [detailTask, setDetailTask] = useState({
        title: "",
        description: "",
        date: "",
        priority: "",
        status: false,
        user: user._id,
    });

    useEffect(() => {
        if(tarea){
            setDetailTask(tarea)
        }
    }, [tarea])

    const handleChange = (e) => {
        setDetailTask({
            ...detailTask,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(tarea){
            await UpdateTask(detailTask, tarea._id)
        }else{
            await CreateTask(detailTask)
        }
    }

    return (
        <div
            className={`flex flex-col justify-center items-center w-full mt-0`}
        >
            {
                Object.keys(taskAlert).length > 0 && (
                    <>
                        <Alertas
                            mensaje={taskAlert.message}
                            tipo={taskAlert.type}
                        />
                    </>
                )
            }
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        {tarea ? 'Actualizar Tarea' : 'Crear Tarea'}
                    </h1>
                    <div className="mt-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Título
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                            type="text"
                            name="title"
                            id="title"
                            placeholder='Título de la tarea'
                            value={detailTask.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="description"
                        >
                            Descripción
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                            name="description"
                            id="description"
                            placeholder='Descripción de la tarea'
                            value={detailTask.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="date"
                        >
                            Fecha
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                            type="date"
                            name="date"
                            id="date"
                            value={detailTask.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="priority"
                        >
                            Prioridad
                        </label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                            name="priority"
                            id="priority"
                            value={detailTask.priority}
                            onChange={handleChange}
                        >
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                    <div className="mt-8">
                        <button
                            className="w-full py-2 px-3 text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
                        >
                            {tarea ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TaskForm