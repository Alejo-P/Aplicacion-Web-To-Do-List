import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthProvider";
import NavBar from "../Components/NavBar";

const Dashboard = () => {
    const { ProfileData, theme } = useAuth();
    const tokenAuth = localStorage.getItem('token');

    useEffect(() => {
        const Perfil = async () => {
            await ProfileData();
        }
        if (localStorage.getItem('token')) {
            Perfil();
        }
    }, []);

    return (
    <div
        className={`flex flex-col ${theme == 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-200 text-black'}`}
    >
        <NavBar/>
        {
            tokenAuth ? <Outlet/> : <Navigate to="/login"/>
        }
    </div>
    );
};

export default Dashboard;