import { useState } from 'react'
import { useAuth } from '../Contexts/AuthProvider'

const ChangePasswordForm = () => {
    const { ChangePassword } = useAuth();
    const [password, setPassword] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await ChangePassword(password);
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
                        htmlFor="password"
                    >
                        Contraseña actual
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Ingresa tu contraseña actual'
                        onChange={handleChange}
                        value={password.password}
                        className={`border-2 border-gray-800 p-2 rounded m-2 text-black w-full`}
                    />
                </div>
                <div
                    className={`flex flex-col justify-center items-center`}
                >
                    <label
                        className={`text-lg font-bold text-gray-800`}
                        htmlFor="newPassword"
                    >
                        Nueva contraseña
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder='Ingresa una nueva contraseña'
                        onChange={handleChange}
                        value={password.newPassword}
                        className={`border-2 border-gray-800 p-2 rounded m-2 text-black w-full`}
                    />
                </div>
                <div
                    className={`flex flex-col justify-center items-center`}
                >
                    <label
                        className={`text-lg font-bold text-gray-800`}
                        htmlFor="confirmPassword"
                    >
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder='Confirma la contraseña nueva'
                        onChange={handleChange}
                        value={password.confirmPassword}
                        className={`border-2 border-gray-800 p-2 rounded m-2 text-black w-full`}
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 text-white p-2 rounded-md m-2`}
                >
                    Cambiar contraseña
                </button>
            </form>
        </>
    )
}

export default ChangePasswordForm