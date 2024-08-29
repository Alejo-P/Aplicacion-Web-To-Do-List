import { useAuth } from "../Contexts/AuthProvider";
import ListviewIcon from '../assets/hamburgerMenuIcon.png';
import GridViewIcon from '../assets/gridIcon.png';

const TaskListOptions = ({handleChangeViewMode, viewMode, checkedT}) => {
    const { theme } = useAuth();
    
    return (
        <div
            className={`flex flex-row justify-center bg-white p-1 mt-2 rounded-lg shadow-md w-2/5`}
        >
            <div
                className={`flex flex-col justify-center items-center rounded-lg p-2`}
            >
                <h1
                    className={`text-base font-bold text-black`}
                >
                    Filtrar tareas
                </h1>
                <div>
                    <button
                        className={`bg-gray-400 text-black font-bold py-2 px-4 rounded m-2`}
                    >
                        Todas
                    </button>
                </div>
            </div>

            <div 
                className={`flex flex-col justify-center items-center rounded-lg p-2`}
            >
                <h1
                    className={`text-base font-bold text-black`}
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
                            className="w-6 h-6"
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