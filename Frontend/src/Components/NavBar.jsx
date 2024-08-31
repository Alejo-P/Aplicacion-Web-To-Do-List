import { useAuth } from '../Contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from "../assets/ProfileImage.jpg";
import LockIcon from "../assets/lockIcon.png";
import LigthIcon from "../assets/sunIcon.png";
import DarkIcon from "../assets/moonIcon.png";

const NavBar = () => {
    const { user, Logout, theme, handleTheme } = useAuth()
    const navigate = useNavigate()
    return (
        <nav className="grid lg:grid-cols-2 md:grid-cols-1 bg-gray-800 p-2 m-3 rounded-md justify-evenly">
            <div
                className="flex flex-row items-center"
            >
                {
                    user?.username ? (
                        <>
                            <img
                                src={ProfileIcon}
                                alt="Profile"
                                className="w-16 h-16 rounded-full m-3"
                            />
                            <div className=" text-white m-0 p-0">
                                <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
                                <p className="text-lg font-bold">Usuario: <span className="font-normal italic">{user?.username || "Sin info"}</span></p>
                                <p className="text-lg font-bold">Correo: <span className="font-normal italic">{user?.email || "Sin info"}</span></p>
                            </div>
                        </>
                    ) : (
                        <>
                            <img
                                src={LockIcon}
                                alt="Profile"
                                className="w-16 h-16 rounded-full m-3 bg-white p-2"
                            />
                            <div className="text-white m-0 p-0">
                                <h1 className="text-2xl font-bold text-white">¡Bienvenido!</h1>
                                <p
                                    className="text-lg text-white"
                                >
                                    Para empezar a crear tareas, por favor inicia sesión.
                                </p>
                                
                            </div>
                        </>
                    )
                }
                
            </div>
            <div className="flex flex-row justify-center items-center">
                {
                    user?.username ? (
                        <>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                                onClick={() => navigate('/dashboard')}
                            >
                                Listar tareas
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                                onClick={() => navigate('/dashboard/create')}
                            >
                                Crear tarea
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                                onClick={Logout}
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                                onClick={() => navigate('/login')}
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
                                onClick={() => navigate('/register')}
                            >
                                Registrarse
                            </button>
                        </>
                    )
                }
                
                <button
                    className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={handleTheme}
                >
                    {
                        theme === 'dark' ? <img src={DarkIcon} alt="Dark" className={`w-6 h-6 filter invert`} /> : <img src={LigthIcon} alt="Light" className={`w-6 h-6`}/>
                    }
                </button>
            </div>
        </nav>
    )
}

export default NavBar