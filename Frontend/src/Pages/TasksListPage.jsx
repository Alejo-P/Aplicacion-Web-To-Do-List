import { useAuth } from "../Contexts/AuthProvider";
import { useTask } from "../Contexts/TaskProvider";
import { useEffect } from "react"
import TableTasks from "../Components/TableTasks";
import InfoTasks from "../Components/Info/InfoTasks";

const TasksListPage = () => {
    const { theme } = useAuth();
    const { tasks, GetTasks} = useTask();

    useEffect(() => {
        const obtenerTareas = async () => {
            await GetTasks();
        }
        obtenerTareas()
    }, [])

    return (
        <div
            className={` text-white flex flex-col h-full justify-center items-center`}
        >
            {
                tasks.length > 0 ? (
                    <>
                        <h1
                            className={`text-3xl font-bold text-${theme}-500`}
                        > 
                            Lista de tareas creadas por el usuario
                        </h1>
                        <TableTasks tareas={tasks}/>
                    </>
                ) : (
                    <>
                        <h1
                            className={`text-3xl font-bold text-${theme}-500`}
                        >
                            No tienes tareas creadas
                        </h1>
                        <p
                            className={`text-lg text-${theme}-700 mb-4`}
                        >
                            Crea una tarea para empezar a verla en la lista
                        </p>
                        <hr
                            className={`w-full bg-${theme}-500 h-1 my-2`}
                        />
                        <InfoTasks/>
                    </>
                )
            }
        </div>
    )
}

export default TasksListPage