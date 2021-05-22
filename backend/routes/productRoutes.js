import express from "express"
import Product from "../models/productModel.js"
import {getProducts, getProductById} from "../controllers/productCrontroller.js"

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);
export default router;