import { useAuth } from "../Contexts/AuthProvider"

const DropList = ({ values, handleChange }) => {
    const { theme } = useAuth();
    return (
        <>
            <select
                className={
                    `w-full px-2 py-2 border rounded-lg 
                    ${theme === "light" ? "text-gray-700": "text-slate-300"}
                    focus:outline-none 
                    ${theme === "light" ? 'bg-white':'bg-gray-800'}
                    text-center`
                }
                name="DropList"
                id="DropList"
                onChange={handleChange}
            >
                <option value="Listar: Todas">Mostrar todas</option>
                {
                    values.map((value, index) => (
                        <option
                            key={index}
                            value={value}
                        >
                            {value}
                        </option>
                    ))
                }
            </select>
        </>
    )
}

export default DropList;