import TaskCard from "./Subcomponents/TaskCard";
import { useTask } from "../Contexts/TaskProvider";
import { useAuth } from "../Contexts/AuthProvider";
import Alertas from "./Alertas";

const CardTasks = ({tareas}) => {
    const { alert } = useTask();
    const { theme } = useAuth();
    return (
        <div
            className="flex flex-col items-center m-4"
        >
            {
                (Object.keys(alert).length !== 0) && <Alertas mensaje={alert.message} tipo={alert.type} />
            }
            <div className={`${theme === "light" ? "bg-white":"bg-gray-800"} p-4 rounded-lg shadow-md`}>
                <h1 className={`text-2xl font-bold text-center ${theme === 'light' ? 'text-gray-800':'text-white'}`}>
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