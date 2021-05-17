import mongooes from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/user.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';
import Order from "./models/orderModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUser = await User.insertMany(users);

    const adminUser = await createUser[0]._id;
    const sampleProducts = products.map((product)=>{
      return{... product, user: adminUser}
    })
    const createProducts = await Product.insertMany(sampleProducts);
    console.log('Data Imported!'.green.incerse);
  }catch (err){
console.error(`${err}`.red.inverse);
process.exit(1);
  }
}
importData();