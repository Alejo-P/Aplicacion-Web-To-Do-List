const Alertas = ({ mensaje, tipo }) => {
    return (
        <div
            className={`p-4 m-3 rounded-lg text-white ${tipo === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
        >
            {mensaje}
        </div>
    )
}

export default Alertas
