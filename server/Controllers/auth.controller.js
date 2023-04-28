const jwt = require('jsonwebtoken');
const Users = require('../models/customer.model');

const privateKey = process.env.JWT_SECRET;
const expiryTimeInSeconds = process.env.JWT_EXPIRATION_TIME;


const register = async (req, res) => {
  try {       
    const newCustomer = await Customer.create({
      ...req.body 
    });

    res.status(201).json({ message: 'Created Successfully', data: newCustomer });    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


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



const createToken = (id) => {
    return jwt.sign({ id }, privateKey, { expiresIn: expiryTimeInSeconds });
  };
  

module.exports = {
    register,
    login
}

