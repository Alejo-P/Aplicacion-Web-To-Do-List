import { Tooltip as ReactTooltip } from 'react-tooltip'
import "react-tooltip/dist/react-tooltip.css"
import Alertas from './Alertas'
import EditTask from "../assets/editCalendarIcon.png"
import DeleteTaskI from "../assets/removeCalendarIcon.png"
import CheckTask from "../assets/checkCalendarIcon.png"
import { useTask } from "../Contexts/TaskProvider";
import { useAuth } from '../Contexts/AuthProvider'
import { useNavigate } from "react-router-dom";

const TableTasks = ({tareas}) => {
    const { DeleteTask, UpdateTask, alert } = useTask();
    const { theme } = useAuth();
    const navigate = useNavigate();
    const handleDelete = async (task) => {
        const confirmacion = window.confirm(`¿Estas seguro de eliminar la tarea '${task.title}'?`);
        if(confirmacion) {
            const { _id:id } = task
            await DeleteTask(id)
        };
    }

    const handleComplete = async (task) => {
        const { _id:id } = task
        const confirmacion = window.confirm(`¿Estas seguro de marcar la tarea '${task.title}' como completada?`);
        if(confirmacion) {
            await UpdateTask({
                ...task,
                status: true
            }, id)
        }
    }

  return (
    <div
        className="flex flex-col h-screen items-center mt-4 mb-4 "
    >
        {
            (Object.keys(alert).length !== 0) && <Alertas mensaje={alert.message} tipo={alert.type} />
        }
        <div 
            className={`${theme === "light" ? "bg-white":"bg-gray-800"}
            p-4 rounded-lg shadow-md
            ${theme === 'light' ? 'text-gray-800':'text-white'}`}
        >
            <h1 
                className={`text-2xl font-bold text-center ${theme === 'light' ? 'text-gray-800':' text-slate-300'}`}
            >
                Listado de tareas
            </h1>
            <div className="mt-4">
                <table className={`table-auto ${theme === "light"? "text-gray-600": "text-white"}`}>
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Tarea</th>
                            <th className="px-4 py-2">Descripción</th>
                            <th className="px-4 py-2">Prioridad</th>
                            <th className="px-4 py-2">Fecha fin</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tareas.map((tarea) => (
                                <tr key={tarea._id}>
                                    <td className="border px-4 py-2">{tarea.title}</td>
                                    <td className="border px-4 py-2">{tarea.description}</td>
                                    <td className="border px-4 py-2">{tarea.priority}</td>
                                    <td className="border px-4 py-2">{tarea.date.split("T")[0]}</td>
                                    <td className="border px-4 py-2">{tarea.status ? 'Completada' : 'Pendiente'}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className={`${tarea.status ? 'bg-green-500' : 'bg-yellow-500'} ${tarea.status ? 'hover:bg-green-700' : 'hover:bg-yellow-700'} text-white font-bold py-2 px-4 rounded m-2`}
                                            data-tooltip-id='check'
                                            data-tooltip-content={`La tarea '${tarea.title}' esta ${tarea.status ? 'completada' : 'pendiente'}`} // Aquí está el atributo data-tooltip-content
                                            onClick={() => handleComplete(tarea)}
                                            {
                                                ...tarea.status && { disabled: true }
                                            }
                                        >
                                            <img
                                                src={CheckTask}
                                                alt="Check Task"
                                                className={`w-8 h-8 ${theme === 'light' ? 'filter invert-0':'filter invert'}`}
                                            />
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                                            onClick={() => navigate(`/dashboard/edit/${tarea._id}`)}
                                            data-tooltip-id='edit'
                                            data-tooltip-content={`Editar tarea '${tarea.title}'`} // Aquí está el atributo data-tooltip-content
                                        >
                                            <img
                                                src={EditTask}
                                                alt="Edit Task"
                                                className={`w-8 h-8 ${theme === 'light' ? 'filter invert-0':'filter invert'}`}
                                            />
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                                            onClick={() => handleDelete(tarea)}
                                            data-tooltip-id='delete'
                                            data-tooltip-content={`Eliminar tarea '${tarea.title}'`} // Aquí está el atributo data-tooltip-content
                                        >
                                            <img
                                                src={DeleteTaskI}
                                                alt="Delete Task"
                                                className={`w-8 h-8 ${theme === 'light' ? 'filter invert-0':'filter invert'}`}
                                            />
                                        </button>
                                        <ReactTooltip id='check' />
                                        <ReactTooltip id='edit' />
                                        <ReactTooltip id='delete' />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default TableTasks
