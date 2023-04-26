const express = require ("express");
const app = express();
const PORT = process.env.PORT|| 8080;
const cartsRoute = require("./route/CartsRoutes");
const ordersRoute = require("./route/OrdersRoutes");
const stripeRoute = require("./route/stripeRoute");
const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/artecaDB").then(()=>{
    console.log("Db connected");  
    
    // Listen to port number
    app.listen(PORT, ()=>{
        console.log("listening on port "+ PORT + "\n" + "http://localhost:" + PORT);
    });
  
}).catch(err => {
    console.log("Db connection error", err);
});


app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Set CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type, Accept"
    );
    next();
  });


app.use(cartsRoute);
app.use(ordersRoute);
app.use(stripeRoute);

app.use((request, response, next)=>{
    if(true){
        // response.json({message: "Authenticated"});
        next();
    }
    else{
        response.json({message: "Not Authenticated"});
    }
});

// Not found
app.use((request, response)=>{
    response.status(404).json({message: "Not Found"});
});

// Catch any errors
app.use((error, request, response, next)=>{
    let status = error.status || 500;
    response.status(status).json({message: "Error: " + error});
})
