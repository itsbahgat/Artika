const customerModel = require('../models/customer.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');//to validation schema

let url = 'mongodb://localhost:27017/artecaDB'
// // customer = mongoose.model('customers', customerSchema);
// // customer register 
let register = (userName, email, password, gender, birthday) => {
    mongoose.disconnect();
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
           
             //joi validation
        //      let validation = await schemaValidationRegister.validateAsync({userName:userName,email:email,password:password,gender:gender,birthday:birthday})

        //      if (validation.error) {

        //          mongoose.disconnect()
        //          reject(validation.error.details[0].message)

        //  }
         //end of validation
            
            return customerModel.findOne({email: email})
            

        }).then((doc) => {
           
            if (doc) {
                mongoose.disconnect();
                reject('This Email is exist')
            }
            else {
               
                bcrypt.hash(password, 10).then((hashPassword) => {
                    let custom = new customerModel({
                        userName:userName,
                        email: email,
                        password: hashPassword,
                        gender: gender,
                        birthday:birthday
                        
                    })
                    custom.save().then((doc) => {
                        mongoose.disconnect();
                        resolve(custom)
                    }).catch((error) => {
                        mongoose.disconnect();
                        reject(error)
                    })

                }).catch((error) => {
                    mongoose.disconnect();
                    reject(error)
                })
            }
        })
    })
}

var privateKey = "this is my secret key fdgioruterjekrtf,mdfgkjlsdf"
// customer login
let login = async (email, password) => {
    console.log("login");
    mongoose.disconnect();
    return new Promise((resolve, reject) => {
        
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
           //joi validation
    //        let validation = await schemaValidationLogin.validateAsync({ em: email, pass: password })

    //        if (validation.error) {
               
    //            mongoose.disconnect()
    //            reject(validation.error.details[0].message+" , and you have entered "+validation.error.details[0].context.value)

    //    }
       //end of validation
            
            return customerModel.findOne({email: email})
   
        }).then((customerModel) => {
           
            if (!customerModel) {
                mongoose.disconnect();
                reject('Invalid Email or Password...')
            }
            else {
                

                bcrypt.compare(password, customerModel.password).then((same) => //to compare entered password and hashed password ecist in DB
                {
                    if (same) { 
                        // send token
                        let token = jwt.sign({ id: customerModel._id, userName: customerModel.userName }, privateKey, {
                            expiresIn: '1h',

                        })
                        mongoose.disconnect();
                        resolve(token)
                    }
                    else {
                        mongoose.disconnect();
                        reject('Invalid Email or Password...')
                    }
                }).catch((err) => {
                    mongoose.disconnect();
                    reject(err)
                }) 
            }
        })
    })
}

//all customers(for admin)
let getAllCustomers = async (req, res) => {
    try {
    const allCustomers = await customerModel.find();
        res.status(200).json(allCustomers);
        // mongoose.disconnect();
    } catch (error) {
        res.status(500).json({ message: error.message });
        // mongoose.disconnect();
    }
};

//customer by id(for admin)
let getCustomerById = async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id);
        res.status(200).json(customer);
        // mongoose.disconnect();
    } catch (error) {
        res.status(404).json({ message: error.message });
        // mongoose.disconnect();
    }
};

//delete customer by id(fpr admin)
let deleteCustomerById = async (req, res) => {
    const id = req.params.id;
    customerModel.deleteOne({ _id: id }).then(()=>{
        res.status(200).json({ message: "Customer Deleted Successfully" });
        // mongoose.disconnect();
}).catch((error)=>{
    res.status(500).json({ message: error.message });
    // mongoose.disconnect();
});
};
module.exports = {
    register,
    login,
    getAllCustomers,
    getCustomerById,
    deleteCustomerById,
  };