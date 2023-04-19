const express = require('express')
const app = express()
const cors = require('cors');
const customerRoute = require('./route/customer.route')
const adminRoute = require('./route/admin.route')
// Using Node.js `require()`

const mongoose = require('mongoose');

// Allow requests from any origin
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', customerRoute);
app.use('/admin', adminRoute);


app.listen(3005, function check(error) {
    if (error) {
        console.log("Error...");
    }
    else {
        console.log("started...");
    }
})

// app.listen(3005);

// mongoose.connect("mongodb://localhost:27017/artecaDB", { useNewUrlParser: true, useUnifiedTopology: true },
//     function checkBD(error) {
//         if (error) {
//             console.log("Error connecting to DB...");
//         }
//         else {
//             console.log("Successfully connecting to DB...");
//         }
//     }
// )
// mongoose.connect('mongodb://localhost/artecaDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });

