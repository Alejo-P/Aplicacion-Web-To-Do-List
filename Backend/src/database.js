import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Pertimitir que solo los campos definidos en el Schema sean almacenados
// enn la BDD
mongoose.set('strictQuery', true)

const conectar = async () => {
    try {
        // Establecer al conexión con la BDD
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        
        // Presentar la conexión en consola 
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
    
    } catch (error) {
        // Capturar Error en la conexión
        console.log(error);
    }
};

export default conectar;