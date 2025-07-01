import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js"
import cors from 'cors';
const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT
console.log(process.env.MONGO_URI);
app.use(express.json());
app.use("/products",productRoutes)


app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});










