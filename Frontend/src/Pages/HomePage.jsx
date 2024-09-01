import { useAuth } from '../Contexts/AuthProvider'
import NavBar from '../Components/NavBar'
import InfoIcon from '../assets/infoIcon.png'

const HomePage = () => {
  const { theme } = useAuth()
  return (
    <div
      className={` flex flex-col h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-200 text-black'}`}
    >
      <NavBar />
      <div
        className={`text-white flex flex-col h-full justify-center items-center`}
      >
        <img
          src={InfoIcon}
          alt="InfoIcon"
          className="w-32 h-32 m-3 bg-blue-300 rounded-full p-2"
        />

        <p
          className={`text-base lg:text-3xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-slate-400'}`}
        >
          Para poder ver tus tareas registradas, por favor inicia sesión.
        </p>
        <p
          className={`text-base lg:text-lg ${theme === 'light' ? 'text-gray-800' : 'text-slate-400'}`}
        >
          Si no tienes una cuenta, puedes registrarte.
        </p>
      </div>
    </div>
  )
}

export default HomePage
