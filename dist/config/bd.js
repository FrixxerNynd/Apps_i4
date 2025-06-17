import mongoose from "mongoose";
const connectDB = async () => {
    const mongoUri = "mongodb+srv://julifer2435:Fercho23dic04@cluster0.v0gnsqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    try {
        await mongoose.connect(mongoUri);
        console.log("Conectado a Mongo");
    }
    catch (error) {
        console.log("Error al conectar Mongo: ", error);
    }
};
export default connectDB;
