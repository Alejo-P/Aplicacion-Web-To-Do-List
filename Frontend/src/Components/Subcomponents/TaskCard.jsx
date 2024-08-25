import { useTask } from "../../Contexts/TaskProvider"

const TaskCard = ({detalleTarea}) => {
    const { DeleteTask } = useTask();

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Estas seguro de eliminar la tarea?");
        if(confirmacion) await DeleteTask(id);
    }

    return (
        <div
            className="bg-white p-4 rounded-lg shadow-md w-96"
        >
            <h1
                className="text-2xl font-bold text-center text-gray-800"
            >
                Detalle de la tarea
            </h1>
            <div
                className="mt-4"
            >
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
                    value={detalleTarea.title}
                    readOnly
                />
            </div>
            <div
                className="mt-4"
            >
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
                    value={detalleTarea.description}
                    readOnly
                />
            </div>
            <div
                className="mt-4"
            >
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="priority"
                >
                    Prioridad
                </label>
                <input
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    type="text"
                    name="priority"
                    id="priority"
                    value={detalleTarea.priority}
                    readOnly
                />
            </div>
            <div
                className="mt-4"
            >
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="date"
                >
                    Fecha fin
                </label>
                <input
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    type="text"
                    name="date"
                    id="date"
                    value={detalleTarea.date.split("T")[0]}
                    readOnly
                />
            </div>
            <div
                className="mt-4"
            >
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status"
                >
                    Estado
                </label>
                <input
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    type="text"
                    name="status"
                    id="status"
                    value={detalleTarea.status ? 'Completada' : 'Pendiente'}
                    readOnly
                />
            </div>
            <div
                className="mt-4"
            >
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={() => handleDelete(detalleTarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default TaskCard