import { useAuth } from '../Contexts/AuthProvider'
import NavBar from '../Components/NavBar'
import InfoIcon from '../assets/infoIcon.png'

const HomePage = () => {
  const { theme } = useAuth()
  return (
    <div
      className={` flex flex-col h-screen bg-${theme}-100`}
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
          className={`text-3xl font-bold text-${theme}-800`}
        >
          Para poder ver tus tareas registradas, por favor inicia sesión.
        </p>
        <p
          className={`text-lg text-${theme}-700`}
        >
          Si no tienes una cuenta, puedes registrarte.
        </p>
      </div>

      
    </div>
  )
}

export default HomePage
