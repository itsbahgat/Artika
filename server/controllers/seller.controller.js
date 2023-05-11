const Sellers = require("../models/seller.model");
const Products = require("../models/product.model");
const Carts = require("../models/cart.model");
const Order = require("../models/order.model");
const prodController = require("../controllers/product.controller");

module.exports.GetAllSellers = (request, response, next) => {
  Sellers.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.editSellerById = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const updatedData = req.body;
    const updatedSeller = await Sellers.findByIdAndUpdate(
      sellerId,
      { $set: updatedData },
      { new: true }
    );
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    let isNotFound = error.name === "CastError";
    if (isNotFound) res.status(404).json({ message: "Seller is not found" });
    else res.status(400).json({ message: error.message });
  }
};

module.exports.GetSellerById = (request, response, next) => {
  const sellerId = request.params.sellerId;

  Sellers.find({ _id: sellerId })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.GetSellerOrders = (request, response, next) => {
  const sellerId = request.params.sellerId;

  Sellers.findById(sellerId)
    .populate({
      path: "Orders",
      populate: {
        path: "items.productId",
        model: "Product",
        select: "title",
      },
    })
    .then((seller) => {
      if (seller) {
        const orders = seller.Orders.map((order) => {
          const productNames = order.items.map((item) => item.productId.title);
          return {
            orderId: order._id,
            customerName: order.customerId, // Assuming you want the customer's name, replace with appropriate field from the Customer model
            productNames: productNames.join(", "),
            status: order.status,
          };
        });
        response.status(200).json(orders);
      } else {
        response.status(200).json([]); // No seller found with the given ID
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.GetSellerOrdersByState = (request, response, next) => {
  const sellerId = request.params.sellerId;
  const state = request.params.state;

  Sellers.find({ _id: sellerId })
    .then((data) => {
      const seller = data[0];
      const filteredOrders = seller.Orders.filter(
        (order) => order.status === state
      );
      response.status(200).json(filteredOrders);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.DeleteSellerById = async (req, res) => {
  try {
    const id = req.params.sellerId;
    let sellerProds = await MarkSellerProdsAsUnavailable(id);
    const prods = sellerProds.map((prod) => prod._id);
    RemoveDeletedProdsFromCarts(prods);
    Sellers.deleteOne({ _id: id });
    res.status(200).json({ message: "Seller Deleted Successfully" });
  } catch {
    res.status(500).json({ message: error.message });
  }
};

async function MarkSellerProdsAsUnavailable(sellerId) {
  try {
    // Get all products of the seller
    const sellerProds = await Products.find({ seller: sellerId });

    console.log("sellerProds\n", sellerProds);
    // Update each product and mark it as unavailable
    const updatedProds = await Promise.all(
      sellerProds.map(async (product) => {
        product.isAvailable = false;
        const updatedProduct = await product.save();
        return updatedProduct;
      })
    );

    return updatedProds;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function RemoveDeletedProdsFromCarts(sellerProds) {
  try {
    // const carts = await Carts.find({});
    // carts.forEach((cart) => {
    //   cart.items.forEach((item) => {
    //     const productId = item.productId;
    //     const arrToString = sellerProds.map((element) => element.toString());
    //     if (arrToString.includes(productId.toString())) {
    //       console.log(`Product found: ${productId}`);
    //     }
    //   });
    // });
    const carts = await Carts.find({});

    carts.forEach(async (cart) => {
      let itemsToUpdate = [];

      cart.items.forEach((item) => {
        const productId = item.productId.toString();
        const arrToString = sellerProds.map((element) => element.toString());

        if (arrToString.includes(productId)) {
          // console.log(`Product found: ${productId}`);
        } else {
          itemsToUpdate.push(item); // Item not found in sellerProds, add it to itemsToUpdate
        }
      });

      // Update the items in the cart
      await Carts.updateOne({ _id: cart._id }, { items: itemsToUpdate });
    });
  } catch (err) {
    console.error(err);
  }
}

// PUT endpoint to update the status of a seller's order
module.exports.updateSellerOrderStatus = async (req, res) => {
  const { orderId, sellerId, sellerStatus } = req.body;

  try {
    const order = await Order.findOne({
      _id: orderId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the specific item within the order associated with the seller
    const orderItem = order.items.find(
      (item) => item.sellerId.toString() == sellerId.toString()
    );

    if (!orderItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    orderItem.sellerStatus = sellerStatus;
    await order.save();

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAllPendingSellers = async (req, res) => {
  //to get all pending sellers
  try {
    const allSellers = await Sellers.find({
      role: "seller",
      approved: false,
    });
    res.status(200).json(allSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.sellerApprove = async (req, res) => {
  //to update the update of seller from false to true
  console.log("approved request", req);
  try {
    const id = req.params.id;

    // Update the user in the database to set "approved" to true
    const updatedUser = await Sellers.findByIdAndUpdate(
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
