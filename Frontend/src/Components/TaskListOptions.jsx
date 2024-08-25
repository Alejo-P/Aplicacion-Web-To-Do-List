import { useAuth } from "../Contexts/AuthProvider";
import ListviewIcon from '../assets/hamburgerMenuIcon.png';
import GridViewIcon from '../assets/gridIcon.png';

const TaskListOptions = ({handleChangeViewMode, viewMode}) => {
    const { theme } = useAuth();
    
    return (
        <div
            className={`flex justify-center items-center rounded-lg bg-gray-800 mt-3`}
        >
            <div
                className={`flex flex-col justify-center items-center rounded-lg p-2`}
            >
                <h1
                    className={`text-base font-bold`}
                >
                    Filtrar tareas
                </h1>
                <div>
                    <button
                        className={`bg-gray-700 text-white font-bold py-2 px-4 rounded m-2`}
                    >
                        Todas
                    </button>
                </div>
            </div>

            <div 
                className={`flex flex-col justify-center items-center rounded-lg p-2`}
            >
                <h1
                    className={`text-base font-bold`}
                >
                    Cambiar vista
                </h1>
                <div>
                    <button
                        className={`
                            ${viewMode === "listView" ? 'bg-green-600 cursor-not-allowed' : 'bg-gray-700 cursor-pointer'}
                            text-white font-bold py-2 px-4 rounded m-2`
                        }
                        onClick={() => handleChangeViewMode('listView')}
                        disabled={viewMode === "listView"}
                    >
                        <img
                            src={ListviewIcon}
                            alt="List View"
                            className="w-6 h-6"
                            style={{ cursor: viewMode === "listView" ? 'not-allowed' : 'pointer' }}
                        />
                    </button>
                    <button
                        className={
                            `${viewMode === "gridView" ? 'bg-green-600 cursor-not-allowed' : 'bg-gray-700 cursor-pointer'}
                            text-white font-bold py-2 px-4 rounded m-2`
                        }
                        onClick={() => handleChangeViewMode('gridView')}
                        disabled={viewMode === "gridView"}
                    >
                        <img
                            src={GridViewIcon}
                            alt="Grid View"
                            className="w-6 h-6"
                            style={{ cursor: viewMode === "gridView" ? 'not-allowed' : 'pointer' }}
                        />
                    </button>
                </div>
            </div>

            
        </div>
    )
}

export default TaskListOptions