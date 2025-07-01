import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req,res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({success:true, data: product });
    } catch (error) {
        console.log("error in fetching products:",error.message);
        res.status(500).json({success:false,message:"server error"});
    }    
}

export const createProduct = async(req,res)=>{
    const product = req.body;

    if(!product.name||!product.price||!product.image){
        return res.status(400).json({success:false,message:"please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    } catch (error) {
        console.error("error in create product:",error.message);
        res.status(500).json({success:false, message: "server error"});
    }
}

export const deleteProductById = async (req,res) => {
    const {id}=req.params;
    console.log("id:",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid id "})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "the product deleted"});
    } catch (error) {
        console.log("error in deleting product id:",id,error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export  const UpdateProductById = async (req,res) => {
    const {id}=req.params;
    const product =req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid id "})
    }
    try {
        const updatedproduct = await Product.findByIdAndUpdate(id,product,{new: true});
        res.status(200).json({success:true, data: updatedproduct});
    } catch (error) {
        console.log("server error",error.message);
        res.status(500).json({success:false,message:"problem in patch product"})
    }
}