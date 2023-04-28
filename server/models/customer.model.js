const mongoose = require('mongoose');

let customerSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    gender: String,
    birthday: String,
})


module.exports = mongoose.model('customers', customerSchema);
