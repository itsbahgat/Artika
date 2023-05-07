const customerModel = require('../models/customer.model');

//all customers(for admin)
let getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await customerModel.find();
        res.status(200).json(allCustomers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//customer by id(for admin)
let getCustomerById = async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//delete customer by id(fpr admin)
let deleteCustomerById = async (req, res) => {
    try{
        const id = req.params.id;
        customerModel.deleteOne({ _id: id });
        res.status(200).json({ message: "Customer Deleted Successfully" });
    }
    catch{
        res.status(500).json({ message: error.message });
    }
};

let editCustomer = async (req, res) => {
    try {
      const customerId = req.params.id;
      const updatedCustomer = req.body; 
      const customer = await customerModel.findByIdAndUpdate(customerId, updatedCustomer, { new: true });
  
      if (customer) {
        res.status(200).json({ message: 'Customer Updated Successfully', customer });
      } else {
        res.status(404).json({ message: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  

  
module.exports = {
    getAllCustomers,
    getCustomerById,
    deleteCustomerById,
    editCustomer
  };