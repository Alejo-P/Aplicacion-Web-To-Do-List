import TaskCard from "./Subcomponents/TaskCard";

const CardTasks = ({tareas}) => {
    return (
        <div
            className="flex flex-col items-center m-4"
        >
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Listado de tareas
                </h1>
                <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            tareas.map((tarea) => (
                                <TaskCard
                                    key={tarea._id}
                                    detalleTarea={tarea}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTasks