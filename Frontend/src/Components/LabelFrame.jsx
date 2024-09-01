import { useAuth } from "../Contexts/AuthProvider"

const LabelFrame = ({
    title = "",
    titleClassName = "",
    divClassName = "",
    children,
}) => {
    const { theme } = useAuth();
    return (
        <div
            className={divClassName}
        >
            <span
                className={titleClassName}
            >
                {title}
            </span>
            {children}
        </div>
    )
}

export default LabelFrame