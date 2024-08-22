import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Pertimitir que solo los campos definidos en el Schema sean almacenados
// en la BDD
mongoose.set('strictQuery', true)

const conectar = async () => {
    try {
        // Establecer al conexión con la BDD
        const {connection} = await mongoose.connect(process.env.MONGODB_URI,{
            serverSelectionTimeoutMS: 5000
        })
        
        // Presentar la conexión en consola 
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
    
    } catch (error) {
        // Capturar Error en la conexión
        console.log(error);
    }
};

const desconectar = async () => {
    try {
        // Cerrar la conexión con la BDD
        await mongoose.disconnect();
        console.log("Database is disconnected");
    } catch (error) {
        // Capturar Error en la desconexión
        console.log(error);
    }
};

export {
    conectar,
    desconectar
};