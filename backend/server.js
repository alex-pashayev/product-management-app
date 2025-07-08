import express from 'express';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import cors from 'cors';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/products",productRoutes);



if (process.env.NODE_ENV === "production") {
  const pathToDist = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(pathToDist));

  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: pathToDist });
  });
}



app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});










