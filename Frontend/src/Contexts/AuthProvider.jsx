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