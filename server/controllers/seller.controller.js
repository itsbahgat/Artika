const Sellers = require("../models/seller.model");
const Products = require("../models/product.model");
const Carts = require("../models/cart.model");
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

module.exports.GetSellerOrders = (request, response, next) => {
  const sellerId = request.params.sellerId;

  Sellers.find({ _id: sellerId })
    .then((data) => {
      // response.status(200).json(data);
      response.status(200).json(data[0].Orders);
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
