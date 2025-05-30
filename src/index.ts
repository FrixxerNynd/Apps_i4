
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/router.ts";
import connectDB from "./config/bd.ts";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Corriendo el servidor en: http://localhost:${PORT}`);
    });
});