const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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