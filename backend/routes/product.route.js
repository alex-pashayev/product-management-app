import express from "express";
const router = express.Router();
import {getProducts,createProduct,deleteProductById,UpdateProductById} from "../controllers/product.controler.js";


router.get("", getProducts);

router.post("",createProduct);

router.delete("/delete/:id",deleteProductById);

router.patch("/:id",UpdateProductById);

export default router;

