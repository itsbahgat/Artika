const express = require("express");
const cors = require("cors");
var cookie_parser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./route/auth.route");
//const adminRoutes = require('./route/admin.route');
const productRoutes = require("./route/product.route");
const customerRoutes = require("./route/customer.route");
const stripeRoutes = require("./route/stripe.route");
const ordersRoutes = require("./route/orders.route");
const cartsRoutes = require("./route/carts.route");
const categoriesRoutes = require("./route/category.route");
const adminRoutes = require("./route/admin.route");
const sellerRoutes = require("./route/seller.route");

console.log("SERVER IS RUNNING");

const PORT = process.env.PORT || 3005;
const DB_URI = process.env.DB_URI || process.env.DB_LOCAL_URL;

const app = express();

mongoose
  .connect(DB_URI)
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(cookie_parser());
app.use(express.urlencoded({ extended: true }));

//app.use('/admin', adminRoutes);
app.use("/", authRoutes);
app.use("/admin", adminRoutes);
app.use("/sellers/", sellerRoutes);
app.use("/customers/", customerRoutes);
app.use("/api/product", productRoutes);
app.use(stripeRoutes);
app.use(ordersRoutes);
app.use(cartsRoutes);
app.use(categoriesRoutes);
app.use(sellerRoutes);

app.use((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

app.use((error, request, response, next) => {
  let status = request.status || 500;
  response.status(status).json({ message: "Internal Error" });

  //delete in production
  console.error(error.stack);
});
