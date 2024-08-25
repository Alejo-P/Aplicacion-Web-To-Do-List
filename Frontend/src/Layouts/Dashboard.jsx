import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthProvider";
import NavBar from "../Components/NavBar";

const Dashboard = () => {
    const { ProfileData, theme } = useAuth();

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
        className={`flex flex-col bg-${theme}-100`}
    >
        <NavBar/>
        <Outlet />
    </div>
    );
};

export default Dashboard;