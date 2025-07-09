import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/router";
import productRoutes from "./routes/product.routes.ts";
import orderRoutes from "./routes/order.routes.ts";
import menuRoutes from "./routes/menu.routes";
import connectBD from "./config/bd.ts";
import cors from "cors";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
/*
app.use(cors({
	origin: 'http://localhost5173',
	credentials: true
}))
*/
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);
app.use("/api/menu", menuRoutes);



connectBD().then(() => {
	app.listen(PORT, () => {
		console.log(`Corriendo el servidor en : http://localhost:${PORT}/`);
	});
});