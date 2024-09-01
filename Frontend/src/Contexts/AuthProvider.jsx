import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [alert, setAlert] = useState({});
    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem('theme');
        return localTheme || 'dark';
    });
    const navigate = useNavigate();

    const handleErrors = (errorsArray) => {
        let index = 0;
    
        const displayError = () => {
            if (index >= errorsArray.length) {
                clearInterval(interval); // Detiene el ciclo al terminar todos los errores
                setTimeout(() => {
                    setAlert({});
                }, 3000); // Limpia el último error después de 3 segundos
                return;
            }
            
            setAlert({
                type: "error",
                message: errorsArray[index].msg,
            });
            index++;
        };
    
        // Muestra el primer error inmediatamente
        displayError();
    
        // Muestra los errores subsecuentes cada 3 segundos
        const interval = setInterval(displayError, 3000);
    };

    const Login = async (form) => {
        try {
            const response = await axios.post(`${process.env.URL_BACKEND}/login`, form);
            console.log(response.data);
            
            localStorage.setItem('token', response.data.data.token);

            setUser(response.data.data);
            setAlert({
                type: 'success',
                message: response.data.message
            });

            setTimeout(() => {
                setAlert({});
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            console.error(error);
            setAlert({
                type: 'error',
                message: error.response.data.message
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }
    };

    const Register = async (form) => {
        try {
            const response = await axios.post(`${process.env.URL_BACKEND}/register`, form);
            console.log(response.data);
            setAlert({
                type: 'success',
                message: response.data.message
            });
            setTimeout(() => {
                setAlert({});
                navigate('/login');
            }, 3000);
        } catch (error) {
            if (error.response.data?.errors){
                handleErrors(error.response.data.errors);
                return;
            }
            setAlert({
                type: "error",
                message: error.response.data.message,
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }
    };

    const UpdateUser = async (UpdateInfo) => {
        try {
            const response = await axios.put(`${process.env.URL_BACKEND}/update-user`, UpdateInfo, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            ProfileData();
            setAlert({
                type: 'success',
                message: response.data.message
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        } catch (error) {
            setAlert({
                type: "error",
                message: error.response.data.message,
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }
    };

    const ChangePassword = async (passwords) => {
        try {
            const response = await axios.put(`${process.env.URL_BACKEND}/change-password`, passwords, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAlert({
                type: 'success',
                message: response.data.message
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        } catch (error) {
            setAlert({
                type: 'error',
                message: error.response.data.message
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }
    };

    const DeleteUser = async () => {
        try {
            const response = await axios.delete(`${process.env.URL_BACKEND}/delete-user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            setUser({});
            setAlert({
                type: 'success',
                message: response.data.message
            });
            setTimeout(() => {
                setAlert({});
                navigate('/');
            }, 3000);
        } catch (error) {
            setAlert({
                type: 'error',
                message: error.response.data.message
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }
    };

    const Logout = () => {
        localStorage.removeItem('token');
        setUser({});
        navigate('/');
    };

    const ProfileData = async () => {
        try {
            const response = await axios.get(`${process.env.URL_BACKEND}/perfil`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data.data);
        } catch (error) {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            setAlert({
                type: 'error',
                message: error.response.data.message
            });
            setTimeout(() => {
                setAlert({});
                navigate('/');
            }, 3000);
        }
    };

    const handleTheme = () => {
        const userTheme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', userTheme);
        setTheme(userTheme);
    };

    return (
        <AuthContext.Provider value={{ 
            user,
            setUser,
            Login,
            Register,
            UpdateUser,
            ChangePassword,
            DeleteUser,
            Logout,
            ProfileData,
            alert,
            theme,
            handleTheme
        }}>
        {children}
        </AuthContext.Provider>
    );
}

export { useAuth };

export default AuthProvider;