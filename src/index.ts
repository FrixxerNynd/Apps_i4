import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/router";
import productRoutes from "./routes/product.routes.ts";
import orderRoutes from "./routes/order.routes.ts";
import connectBD from "./config/bd.ts";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan());
app.use("user/v1", authRoutes);
app.use("api/v1/order", orderRoutes);
app.use("api/product", productRoutes);

connectBD().then(() => {
	app.listen(PORT, () => {
		console.log(`Corriendo el servidor en : http://localhost:${PORT}`);
	});
});