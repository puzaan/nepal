const express = require("express");
const products = require("./data/products");
const cors = require("cors");
const { request } = require("express");
const dotencv = request('dotenv');
dotencv.config();
const app = express();




app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running on ${PORT}`));
