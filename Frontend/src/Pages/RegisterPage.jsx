import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const navigate = useNavigate()
    return (
        <div
            className={`flex flex-col h-screen justify-center items-center`}
        >
        <h1
            className={`text-3xl font-bold text-zinc-400`}
        >
            ¡En construcción!
        </h1>
        <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2`}
            onClick={() => navigate('/')}
        >
            Volver
        </button>
        </div>
    )
}

export default RegisterPage