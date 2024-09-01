const Alertas = ({ mensaje, tipo }) => {
    return (
        <div
            className={`p-4 mb-4 rounded-lg text-white ${tipo === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
        >
            {mensaje}
        </div>
    )
}

export default Alertas
