const express = require("express");
const products = require("./data/products");
const cors = require("cors");
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


app.listen(5000, console.log("server is running on 500"));
