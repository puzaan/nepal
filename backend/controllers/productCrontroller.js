
import Product from "../models/productModel.js"

/**
 * 
 * fetch all products
 * get/api/product
 * access by public
 */

const getProducts = async (req, res) => {
    let products = await Product.find({});
  
    res.json(products);
}


/**
 * 
 * fetch product by its id
 * get/api/product
 * access by public
 */
const getProductById = async(req, res, next)=> {
    
    let product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Products Not Founds');
    }

}

export {getProducts, getProductById} ;