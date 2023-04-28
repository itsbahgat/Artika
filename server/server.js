const express = require('express')
const cors = require('cors');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./route/auth.route');
//const adminRoutes = require('./route/admin.route');
const productRoutes = require("./route/product.route");
const customerRoutes = require("./route/customer.route");
const stripeRoutes = require("./route/stripe.route");
const ordersRoutes = require("./route/orders.route");
const cartsRoutes = require("./route/carts.route");



const PORT = process.env.PORT || 3005;
const DB_URI = process.env.DB_URI || process.env.DB_LOCAL_URL;


const app = express();

mongoose.connect(DB_URI)
        .then((result) => app.listen(PORT))
        .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
//app.use(cookieParser);
app.use(express.urlencoded({extended:true}));

//app.use('/admin', adminRoutes);
app.use('/', authRoutes);
app.use('/customers/', customerRoutes);
app.use("/api/product",productRoutes);
app.use(stripeRoutes);
app.use(ordersRoutes);
app.use(cartsRoutes);



app.use((request,response)=>{
    response.status(404).json({message: "Not Found" })
})

app.use((error,request,response,next)=>{
    let status = request.status || 500;
    response.status(status).json({message: "Internal Error"});

    //delete in production
    console.error(error.stack);
})

