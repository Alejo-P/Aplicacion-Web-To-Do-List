import { useState, useEffect } from 'react'
import { useAuth } from '../Contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import Alertas from '../Components/Alertas'

const LoginPage = () => {
    const { Login, alert } = useAuth();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Login(loginForm);
    }

    return (
        <div
            className="flex flex-col justify-center items-center h-screen bg-gray-100"
        >
            {
                Object.keys(alert).length > 0 && (
                    <Alertas
                        mensaje={alert.message}
                        tipo={alert.type}
                    />
                )
            }
            <form 
                className="flex flex-col justify-center items-center"
            >
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Iniciar Sesión
                    </h1>
                    <div className="mt-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                            type="email"
                            name="email"
                            id="email"
                            placeholder='usuario@ejemplo.com'
                            value={loginForm.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                            type="password"
                            name="password"
                            id="password"
                            placeholder='********'
                            value={loginForm.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            className="w-full py-2 px-3 text-white bg-blue-500 hover:bg-blue-700 rounded-lg p-3"
                            onClick={handleSubmit}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            className="w-full py-2 px-3 text-white bg-green-500 hover:bg-green-700 rounded-lg p-3 mt-2"
                            onClick={() => navigate('/register')}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </form>
      
        </div>
    )
}

export default LoginPage
