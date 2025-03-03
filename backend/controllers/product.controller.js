import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(201).json({ success: true, data: allProducts });
  } catch (err) {
    console.log(`error: ${err}`);
    res
      .status(500)
      .json({ succes: false, message: "error occured while fetching data" });
  }
};
export const addNewProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "please provode valid data",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.log(`error: ${err}`);
    res
      .status(500)
      .json({ succes: false, message: "error occured while saving data" });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ succes: false, message: "please provide valid data id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    console.log(`error: ${err}`);
    res
      .status(500)
      .json({ succes: false, message: "error occured while updating data" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ succes: false, message: "please provide valid data id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "product has been deleted" });
  } catch (err) {
    console.log(`error: ${err}`);
    res.status(500).json({ succes: false, message: "product not found" });
  }
};
