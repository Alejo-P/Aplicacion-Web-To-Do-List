import axios from "axios";
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const TaskContext = createContext();

const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must be used within a TaskProvider");
    }
    return context;
};

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [alert, setAlert] = useState({});
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

    const GetTasks = async () => {
        try {
            const response = await axios.get(`${process.env.URL_BACKEND}/get-tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setTasks(response.data);
        } catch (error) {

            console.error(error);
        }
    };

    const CreateTask = async (form) => {
        try {
            const response = await axios.post(
                `${process.env.URL_BACKEND}/create-task`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setAlert({
                type: "success",
                message: response.data.message,
            });
            setTimeout(() => {
                setAlert({});
                navigate("/dashboard");
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

    const UpdateTask = async (form, id) => {
        try {
            const response = await axios.put(
                `${process.env.URL_BACKEND}/task/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setAlert({
                type: "success",
                message: response.data.message,
            });
            setTasks(
                tasks.map((task) =>
                    task._id === id ? { ...task, status: true } : task
                )
            );
            setTimeout(() => {
                setAlert({});
                navigate("/dashboard");
            }, 3000);
        } catch (error) {
            console.error(error);
            setAlert({
                type: "error",
                message: error.response.data.message,
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }
    };

    const DeleteTask = async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.URL_BACKEND}/task/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setAlert({
                type: "success",
                message: response.data.message,
            });
            setTasks(tasks.filter((task) => task._id !== id));
            setTimeout(() => {
                setAlert({});
            }, 3000);

        } catch (error) {
            console.error(error);
            setAlert({
                type: "error",
                message: error.response.data.message,
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }
    };

    const DetailTask = async (id) => {
        try {
            const response = await axios.get(`${process.env.URL_BACKEND}/task/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const task = response.data;
            task.date = task.date.split("T")[0];
            return task;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TaskContext.Provider value={{ 
            tasks,
            alert,
            GetTasks, 
            CreateTask,
            UpdateTask,
            DeleteTask,
            DetailTask
        }}>
            {children}
        </TaskContext.Provider>
    );
}

export { useTask };

export default TaskProvider;
