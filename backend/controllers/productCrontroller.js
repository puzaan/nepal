
import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

/**
 * 
 * fetch all products
 * get/api/product
 * access by public
 */

const getProducts = asyncHandler(async (req, res) => {
    let products = await Product.find({});

    res.json(products);
    
});


/**
 * 
 * fetch product by its id
 * get/api/product
 * access by public
 */
const getProductById = asyncHandler(async(req, res, next)=> {
    
    let product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Products Not Founds');
    }

});

export {getProducts, getProductById} ;