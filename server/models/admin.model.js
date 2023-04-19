const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');//to validation schema


let adminSchema = mongoose.Schema({
    userName:String,
    email: String,
    password: String,
  
})

let url = 'mongodb://localhost:27017/artecaDB'

var admin = mongoose.model('admins', adminSchema);

// customer register 
exports.register = (userName,email,password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
           
             //joi validation
        //      let validation = await schemaValidationRegister.validateAsync({userName:userName,email:email,password:password,gender:gender,birthday:birthday})

        //      if (validation.error) {

        //          mongoose.disconnect()
        //          reject(validation.error.details[0].message)

        //  }
         //end of validation
            
            return admin.findOne({email: email})
            

        }).then((doc) => {
           
            if (doc) {
                mongoose.disconnect();
                reject('This Email is exist')
            }
            else {
               
                bcrypt.hash(password, 10).then((hashPassword) => {
                    let ad = new admin({
                        userName:userName,
                        email: email,
                        password: hashPassword,
                        
                    })
                    ad.save().then((doc) => {
                        mongoose.disconnect();
                        resolve(ad)
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

// admin login
exports.login = (email,password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
           //joi validation
    //        let validation = await schemaValidationLogin.validateAsync({ em: email, pass: password })

    //        if (validation.error) {
               
    //            mongoose.disconnect()
    //            reject(validation.error.details[0].message+" , and you have entered "+validation.error.details[0].context.value)

    //    }
       //end of validation
            return admin.findOne({email: email})
   
        }).then((admin) => {
           
            if (!admin) {
                mongoose.disconnect();
                reject('Invalid Email or Password...')
            }
            else {
                

                bcrypt.compare(password, admin.password).then((same) => //to compare entered password and hashed password ecist in DB
                {
                    if (same) { 
                        // send token
                        let token = jwt.sign({ id: admin._id, userName: admin.userName,email:admin.email }, privateKey, {
                            expiresIn: '1h',

                        })
                        mongoose.disconnect();
                        resolve({ token: token ,role:'admin'})
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