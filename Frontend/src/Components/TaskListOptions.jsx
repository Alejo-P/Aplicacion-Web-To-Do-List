import { useAuth } from "../Contexts/AuthProvider";
import { useTask } from "../Contexts/TaskProvider";
import ListviewIcon from '../assets/hamburgerMenuIcon.png';
import GridViewIcon from '../assets/gridIcon.png';
import DropList from "./DropList";

const TaskListOptions = ({handleChangeViewMode, viewMode}) => {
    const { theme } = useAuth();
    const { setTasks, GetTasks, setAlert } = useTask();

    const filterOptions = [
        "Estado: Pendiente",
        "Estado: Completada",
        "Prioridad: Alta",
        "Prioridad: Media",
        "Prioridad: Baja"
    ]

    const handleChange = async (e) => {
        const listaTareas = await GetTasks();
        if (e.target.value === "") return;
        const [filtro, valor] = new String(e.target.value).split(":").map(item => item.trim());
        
        let tareas = [];
        if (filtro === "Estado") {
            tareas = listaTareas.filter(task => task.status === (valor === "Completada"));
        } else if (filtro === "Prioridad") {
            tareas = listaTareas.filter(task => task.priority === valor);
        } else if (filtro === "Listar") {
            tareas = listaTareas;
        }

        if (tareas.length === 0) {
            setAlert({
                type: "error",
                message: "No hay tareas que cumplan con el filtro seleccionado"
            })
            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }
        setTasks(tareas);
    }
    
    return (
        <div
            className={`${theme === "light" ? 'bg-white':'bg-gray-800'} flex flex-row justify-evenly p-1 mt-2 rounded-lg shadow-md lg:w-3/5 md:w-4/5`}
        >
            <div
                className={`flex flex-col justify-center items-center rounded-lg p-2`}
            >
                <h1
                    className={`text-base font-bold ${theme === "light" ? 'text-gray-800':'text-slate-400'}`}
                >
                    Filtrar tareas
                </h1>
                <div
                    className="px-3 py-2"
                >
                    <DropList values={filterOptions} handleChange={handleChange}/>
                </div>
            </div>

            <div 
                className={`flex flex-col justify-center items-center rounded-lg p-2`}
            >
                <h1
                    className={`text-base font-bold ${theme === "light" ? 'text-gray-800':'text-slate-400'}`}
                >
                    Cambiar vista
                </h1>
                <div>
                    <button
                        className={`
                            ${viewMode === "listView" ? 'bg-green-600 cursor-not-allowed hover:bg-red-400' : 'bg-gray-400 cursor-pointer hover:bg-green-400'}
                            text-black font-bold py-2 px-4 rounded m-2`
                        }
                        onClick={() => handleChangeViewMode('listView')}
                        disabled={viewMode === "listView"}
                    >
                        <img
                            src={ListviewIcon}
                            alt="List View"
                            className={`w-6 h-6 ${theme === 'light' ? 'filter invert-0':'filter invert'}`}
                            style={{ cursor: viewMode === "listView" ? 'not-allowed' : 'pointer' }}
                        />
                    </button>
                    <button
                        className={
                            `${viewMode === "gridView" ? 'bg-green-600 cursor-not-allowed hover:bg-red-400' : 'bg-gray-400 cursor-pointer hover:bg-green-400'}
                            text-black font-bold py-2 px-4 rounded m-2`
                        }
                        onClick={() => handleChangeViewMode('gridView')}
                        disabled={viewMode === "gridView"}
                    >
                        <img
                            src={GridViewIcon}
                            alt="Grid View"
                            className={`w-6 h-6 ${theme === 'light' ? 'filter invert-0':'filter invert'}`}
                            style={{ cursor: viewMode === "gridView" ? 'not-allowed' : 'pointer' }}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskListOptions