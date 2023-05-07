const customerModel = require("../models/customer.model");

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
// let deleteCustomerById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await customerModel.deleteOne({ _id: id });
//     if (result.deletedCount === 1) {
//       res.status(200).json({ message: "Customer Deleted Successfully" });
//     } else {
//       res.status(404).json({ message: "Customer Not Found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const deleteCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await customerModel.deleteOne({ _id: id });

    const response =
      result.deletedCount === 1
        ? { message: "Customer Deleted Successfully" }
        : { message: "Customer Not Found" };

    res.status(result.deletedCount === 1 ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const deleteCustomerById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await customerModel.deleteOne({ _id: id });
//     const isDeleted = result.deletedCount;
//     const response =
//       isDeleted === 1
//         ? { message: "Customer Deleted Successfully" }
//         : { message: "Customer Not Found" };

//     res.status(isDeleted === 1 ? 200 : 404).json(response);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
};
