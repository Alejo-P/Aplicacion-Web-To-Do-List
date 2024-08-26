import TaskForm from "../Components/TaskForm";
import { useParams } from "react-router-dom";

const CreateTaskPage = () => {
    const { id } = useParams();

    return (
        <div
            className={`text-white h-screen flex justify-center items-center`}
        >
            <TaskForm tareaID={id} />
        </div>
    )
}

export default CreateTaskPage