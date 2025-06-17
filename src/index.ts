import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/router.ts";
import productRoutes from "./routes/product.routes.ts";
import connectBD from "./config/bd.ts";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan());
app.use("api/v1/auth", authRoutes);
app.use("api/v1/product", productRoutes);

connectBD().then(() => {
	app.listen(PORT, () => {
		console.log(`Corriendo el servidor en : http://localhost:${PORT}`);
	});
});q