import { useState } from 'react'
import { useAuth } from '../Contexts/AuthProvider'

const UpdateUserForm = () => {
    const { user:datos, UpdateUser } = useAuth();
    const [user, setUser] = useState({
        username: datos.username ||'',
        email: datos.email || ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UpdateUser(user);
    }

    return (
        <>
            <form
                className={`flex flex-col justify-center items-center`}
                onSubmit={handleSubmit}
            >
                <div
                    className={`flex flex-col justify-center items-center`}
                >
                    <label
                        className={`text-lg font-bold text-gray-800`}
                        htmlFor="username"
                    >
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Nombre de usuario'
                        onChange={handleChange}
                        value={user.username}
                        className={`border-2 border-gray-800 p-2 rounded m-2 text-black`}
                    />
                </div>
                <div
                    className={`flex flex-col justify-center items-center`}
                >
                    <label
                        className={`text-lg font-bold text-gray-800`}
                        htmlFor="email"
                    >
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='usuario@ejemplo.com'
                        onChange={handleChange}
                        value={user.email}
                        className={`border-2 border-gray-800 p-2 rounded m-2 text-black`}
                    />
                </div>
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2`}
                >
                    Actualizar datos
                </button>
            </form>
        </>
    )
}

export default UpdateUserForm