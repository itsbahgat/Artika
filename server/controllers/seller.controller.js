const customerModel = require("../models/customer.model");

//all customers(for admin)
let getAllSellers = async (req, res) => {
  //to get all approved sellers
  try {
    const allSellers = await customerModel.find({
      role: "seller",
      approved: true,
    });
    res.status(200).json(allSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
let getAllPendingSellers = async (req, res) => {
  //to get all pending sellers
  try {
    const allSellers = await customerModel.find({
      role: "seller",
      approved: false,
    });
    res.status(200).json(allSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//customer by id(for admin)
let getSellerById = async (req, res) => {
  try {
    const seller = await customerModel.findById(req.params.id);
    res.status(200).json(seller);
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
const deleteSellerById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await customerModel.deleteOne({ _id: id });

    const response =
      result.deletedCount === 1
        ? { message: "Seller Deleted Successfully" }
        : { message: "Seller Not Found" };

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

const sellerApprove = async (req, res) => {
  //to update the update of seller from false to true
  console.log("approved request", req);
  try {
    const id = req.params.id;

    // Update the user in the database to set "approved" to true
    const updatedUser = await customerModel.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );
    console.log(updatedUser);

    res.status(200).json({ message: "seller approved", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSellers,
  getSellerById,
  deleteSellerById,
  getAllPendingSellers,
  sellerApprove,
};
