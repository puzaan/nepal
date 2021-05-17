import express from "express"
import Product from "../models/productModel.js"

const router = express.Router();

router.get("/", async (req, res) => {
    let products = await Product.find({});
  
    res.json(products);
});

router.get("/:id", async(req, res, next)=> {
    
    let product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Products Not Founds');
    }

});
export default router;