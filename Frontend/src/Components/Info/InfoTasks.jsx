import AddIcon from '../../assets/addCalendarIcon.png'
import CompleteIcon from '../../assets/checkedCalendarIcon.png'
import PlaningIcon from '../../assets/timerCalendarIcon.png'
import DeleteIcon from '../../assets/deleteCalendarIcon.png'
import { useAuth } from '../../Contexts/AuthProvider'

const InfoTasks = () => {
    const { theme } = useAuth();
  return (
    <div
        className={`flex flex-col h-full items-center mb-3`}
    >
      <h1 className={`text-xl lg:text-3xl font-bold ${theme == 'light' ? 'text-gray-800': 'text-slate-400'}`}>¿Qué puedes hacer en esta aplicación?</h1>
        <div className="mt-4">
            <div className="flex flex-col customSize:flex-row justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md m-2 w-11/12 lg:w-2/5">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Crear tareas
                    </h1>
                    <div className="mt-4">
                        <img src={AddIcon} alt="AddIcon" className="w-32 h-32 m-auto"/>
                    </div>
                    <p className='text-black'>
                        Puedes crear tareas con una descripción, prioridad y fecha de finalización.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md m-2 w-11/12 lg:w-2/5">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Marcar tareas completadas
                    </h1>
                    <div className="mt-4">
                        <img src={CompleteIcon} alt="CompleteIcon" className="w-32 h-32 m-auto"/>
                    </div>
                    <p className='text-black'>
                        Puedes marcar tareas como completadas, para tener un mejor control de tus actividades.
                    </p>
                </div>
            </div>
            <div className="flex flex-col customSize:flex-row justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md m-2 w-11/12 lg:w-2/5">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Planificar tareas
                    </h1>
                    <div className="mt-4">
                        <img src={PlaningIcon} alt="PlaningIcon" className="w-32 h-32 m-auto"/>
                    </div>
                    <p className='text-black'>
                        Puedes planificar tareas con una fecha de finalización, y organizar de mejor manera tu horario.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md m-2 w-11/12 lg:w-2/5">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Eliminar tareas
                    </h1>
                    <div className="mt-4">
                        <img src={DeleteIcon} alt="DeleteIcon" className="w-32 h-32 m-auto"/>
                    </div>
                    <p className='text-black'>
                        Puedes eliminar tareas que ya no necesites, para mantener un control de tus actividades.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InfoTasks
