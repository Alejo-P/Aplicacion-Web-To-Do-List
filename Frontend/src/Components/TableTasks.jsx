import { useTask } from "../Contexts/TaskProvider";
import { useNavigate } from "react-router-dom";

const TableTasks = ({tareas}) => {
    const { DeleteTask } = useTask();
    const navigate = useNavigate();
    const handeDelete = async (id) => {
        const confirmacion = window.confirm("¿Estas seguro de eliminar la tarea?");
        if(confirmacion) await DeleteTask(id);
    }

  return (
    <div
        className="flex flex-col h-screen items-center mt-4 mb-4 "
    >
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800">
                Listado de tareas
            </h1>
            <div className="mt-4">
                <table className="table-auto text-black">
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
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                                            onClick={() => navigate(`/dashboard/edit/${tarea._id}`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                                            onClick={() => handeDelete(tarea._id)}
                                        >
                                            Eliminar
                                        </button>
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
