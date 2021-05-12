import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        default: 0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    image:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        require: true,
        default: 0
    }

},{
    timestamp: true
});
const Product = mongoose.model("Product", productSchema);
export default Product;