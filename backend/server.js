// const express = require("express");
// const products = require("./data/products");
// const cors = require("cors");
// const { request } = require("express");
// const dotencv = request('dotenv');



import express from 'express';
import products from './data/products.js';
import cors from 'cors';
import dotencv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import {notFound, errorHandler} from './middlewares/errorMiddlewares.js'
import productRouts from "./routes/productRoutes.js"



dotencv.config();
connectDB();
const app = express();
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("API server is Working");
});
app.use("/api/products", productRouts);
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running on ${PORT}`.yellow.bold));
