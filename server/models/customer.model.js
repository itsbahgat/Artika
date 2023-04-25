const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');//to validation schema

const schemaValidationRegister = joi.object({
    userName: joi.string().alphanum().min(2).max(20).required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age:joi.number().required(),
    gender: joi.string().valid('male', 'female').required(),
    birthday: joi.string().required(),
})

const schemaValidationLogin = joi.object({
   
    em: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    pass: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    
})

let customerSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    gender: String,
    birthday: String,
})

let url = 'mongodb://localhost:27017/artecaDB'

var customer = mongoose.model('customers', customerSchema);

// customer register 
exports.register = (userName,email,password,gender,birthday) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
           
             //joi validation
        //      let validation = await schemaValidationRegister.validateAsync({userName:userName,email:email,password:password,gender:gender,birthday:birthday})

        //      if (validation.error) {

        //          mongoose.disconnect()
        //          reject(validation.error.details[0].message)

        //  }
         //end of validation
            
            return customer.findOne({email: email})
            

        }).then((doc) => {
           
            if (doc) {
                mongoose.disconnect();
                reject('This Email is exist')
            }
            else {
               
                bcrypt.hash(password, 10).then((hashPassword) => {
                    let custom = new customer({
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
exports.login =async (email,password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
           //joi validation
    //        let validation = await schemaValidationLogin.validateAsync({ em: email, pass: password })

    //        if (validation.error) {
               
    //            mongoose.disconnect()
    //            reject(validation.error.details[0].message+" , and you have entered "+validation.error.details[0].context.value)

    //    }
       //end of validation
            return customer.findOne({email: email})
   
        }).then((customer) => {
           
            if (!customer) {
                mongoose.disconnect();
                reject('Invalid Email or Password...')
            }
            else {
                

                bcrypt.compare(password, customer.password).then((same) => //to compare entered password and hashed password ecist in DB
                {
                    if (same) { 
                        // send token
                        let token = jwt.sign({ id: customer._id, userName: customer.userName }, privateKey, {
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

module.exports = mongoose.model("customers",customerSchema);
