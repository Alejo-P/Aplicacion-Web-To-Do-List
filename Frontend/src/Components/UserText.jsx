import { useAuth } from "../Contexts/AuthProvider";
import { useEffect } from "react";

const UserText = () => {
    const { user,Login } = useAuth();

    useEffect(()=>{
        const inicio = async () => {
            await Login({
                "email": "pinzonmarcelo759@gmail.com",
                "password": "alejoP"
              })
            
        }
        inicio()
    }, [])

    return (
        <p className="text-slate-100">Hola {user ? user.username : 'Anonimo'}</p>
    )
}

export default UserText;