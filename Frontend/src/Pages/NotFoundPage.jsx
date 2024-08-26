import ErrorIcon from '../assets/errorCrossIcon.png';
import { useAuth } from '../Contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const { theme } = useAuth();
    const navigate = useNavigate();
    return (
        <div
            className={`flex flex-col h-screen justify-center items-center ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-200 text-black'}`}
        >
            <img
                src={ErrorIcon}
                alt="ErrorIcon"
                className="w-32 h-32 m-3 bg-red-300 rounded-full p-2"
            />
            <p
                className="text-3xl font-bold text-red-500"
            >
                Página no encontrada
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => navigate('/')}
            >
                Regresar al inicio
            </button>
        </div>
    )
}

export default NotFoundPage