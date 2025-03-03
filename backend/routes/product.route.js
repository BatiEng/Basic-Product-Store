import express from "express";

import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addNewProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
