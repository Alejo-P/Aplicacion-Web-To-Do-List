import Alertas from "../Components/Alertas";
import ChangePasswordForm from "../Components/ChangePasswordForm";
import LabelFrame from "../Components/LabelFrame";
import UpdateUserForm from "../Components/UpdateUserForm"
import { useAuth } from "../Contexts/AuthProvider"
import ProfileIcon from "../assets/ProfileImage.jpg"


const ProfilePage = () => {
    const { user, theme, alert, DeleteUser } = useAuth();

    const handleDelete = async () => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas desactivar tu cuenta?');
        if (confirmacion) {
            await DeleteUser();
        }
    };

    return (
        <div
            className={`grid gap-4 lg:grid-cols-6 md:grid-cols-1 h-full items-center mt-3`}
        >
            <div
                className={`lg:col-span-2 md:col-span-full flex flex-col items-center justify-center`}
            >
                <h1
                    className={`text-3xl font-bold ${theme == 'dark' ? 'text-slate-400': 'text-gray-800'}`}
                >
                    Perfil de usuario
                </h1>
                <div
                    className={`flex flex-col justify-center items-center`}
                >
                    <img
                        src={ProfileIcon}
                        alt="Profile"
                        className={`w-32 h-32 rounded-3xl m-3 ${theme == 'dark' ? 'bg-slate-400': 'bg-gray-800'} p-2`}
                    />
                    <div
                        className={`text-white m-0 p-0`}
                    >
                        <h1
                            className={`text-2xl font-bold ${theme == 'dark' ? 'text-slate-400': 'text-gray-800'}`}
                        >
                            ¡Bienvenido!
                        </h1>
                        <p
                            className={`text-lg ${theme == 'dark' ? 'text-slate-400': 'text-gray-800'}`}
                        >
                            {user?.username ? `Bienvenido ${user.username}` : 'Para empezar a crear tareas, por favor inicia sesión.'}
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="lg:col-span-4 md:col-span-full flex flex-col items-center"
                >
                {
                    Object.keys(alert).length > 0 && (
                        <div
                            className={`flex flex-row justify-center items-center`}
                        > 
                            <Alertas mensaje={alert.message} tipo={alert.type} />
                        </div>
                    )
                }
                <div
                    className={`flex lg:flex-col md:flex-row items-center justify-center ${theme == 'light' ? 'bg-white': 'bg-gray-800'} p-1 m-4 rounded-md shadow-md`}
                >
                    <h1
                        className={`text-2xl max-lg:-rotate-90 font-bold ${theme == 'dark' ? 'text-slate-400': 'text-gray-800'}`}
                    >
                        Actualizar
                    </h1>
                    <div
                        className={`flex flex-col lg:flex-row items-center`}
                    >
                        <LabelFrame
                            title='Datos de usuario'
                            titleClassName={`text-1xl font-bold text-white 'text-slate-400' absolute -top-6 left-2 bg-slate-900 p-2 rounded-md`}
                            divClassName={`flex flex-col items-center m-4 p-8 bg-white border-2 rounded-lg ${theme == 'light' ? 'border-gray-800' : 'border-white'} relative shadow-md mt-10`}
                        >
                            <UpdateUserForm />
                        </LabelFrame>

                        <LabelFrame
                            title='Cambiar contraseña'
                            titleClassName={`text-1xl font-bold text-white 'text-slate-400' absolute -top-6 left-2 bg-slate-900 p-2 rounded-md`}
                            divClassName={`flex flex-col items-center m-4 p-8 bg-white border-2 rounded-lg ${theme == 'light' ? 'border-gray-800' : 'border-white'} relative shadow-md mt-10`}
                        >
                            <ChangePasswordForm />
                        </LabelFrame>
                    </div>
                </div>
            </div>
            <LabelFrame 
                title='Opciones adicionales'
                titleClassName={`text-1xl font-bold ${theme == 'dark' ? 'text-slate-400': 'text-gray-800'} absolute -top-6 left-2 ${theme == 'light' ? 'bg-gray-200': 'bg-slate-900'} p-2 rounded-md`}
                divClassName={`col-span-full flex flex-col items-center m-4 p-4 border-2 rounded-lg ${theme == 'light' ? 'border-gray-800' : 'border-white'} relative shadow-md mt-10`}
            >
                <div
                    className={`flex flex-row items-center`}
                >
                    <button
                        className={`bg-red-500 text-white text-md font-bold p-2 rounded-md`}
                        onClick={handleDelete}
                    >
                        Desactivar cuenta
                    </button>
                    <p
                        className={`text-lg ml-2 ${theme == 'dark' ? 'text-slate-400': 'text-gray-800'}`}
                    >
                        Al desactivar tu cuenta, perderás acceso a todas tus tareas y datos almacenados en la plataforma.
                    </p>
                </div>
            </LabelFrame>
        </div>
    )
}

export default ProfilePage