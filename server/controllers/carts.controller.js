const { ConnectionStates } = require("mongoose");
const Carts = require("../models/cart.model");
const Orders = require("../models/order.model");
const Sellers = require("../models/seller.model");
const { ObjectId } = require("mongodb");

module.exports.GetAllCarts = (request, response, next) => {
  Carts.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.GetCartByCustId = (request, response, next) => {
  Carts.find({ customerId: request.params.id })
    .populate({
      path: "items.productId",
      model: "Product",
    })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.AddItem = async (request, response, next) => {
  let custID = new ObjectId(request.body.customerId);
  let prodID = request.body.productId;
  // let prodID =  new ObjectId(request.body.productId);

  // console.log(request.body.customerId);
  // console.log(request.body.productId);
  // console.log(custID);
  // console.log(prodID);

  // Check if carts table has an existing cart with the same customer id or not
  const cart = await Carts.findOne({ customerId: custID });
  // console.log(cart);

  if (!cart) {
    // If there is no matching customerId, create a cart for him
    await this.CreateCart(request, response, next);
  } else {
    // Update cart items with received item
    let item = { productId: prodID, quantity: 1 };
    // item.productId = new ObjectId(item.productId);

    // If this product already in cart, just increase its quantity. Otherwise, add it
    let foundItem = cart.items.find((i) => i.productId == prodID);
    // console.log("found  --------- \n", foundItem);

    if (!foundItem) {
      // console.log("item not found");
      const update = { $push: { items: item } };
      const options = { new: true, upsert: true };
      const updatedCart = await Carts.findOneAndUpdate(
        { customerId: custID },
        update,
        options
      );

      response
        .status(200)
        .json({ message: "new item added", data: updatedCart });
    } else {
      // console.log("item found");

      foundItem.quantity++;

      cart
        .save()
        .then((data) => {
          response
            .status(200)
            .json({ message: "increasing quantity of existing item" });
        })
        .catch((err) => next(err));
    }
  }
};

module.exports.CreateCart = async (request, response, next) => {
  console.log("create cart fun");
  // let customerId = request.body.customerId;
  let customerId = new ObjectId(request.body.customerId);
  let productId = new ObjectId(request.body.productId);
  let items = [{ productId }];
  items[0].quantity = 1;
  items[0].productId = new ObjectId(items[0].productId);

  const cart = new Carts({ customerId, items });
  return await cart
    .save()
    .then((data) => {
      response.status(200).json({ message: "added", data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.RemoveItem = async (request, response, next) => {
  try {
    let { customerId, productId, deleteItem } = request.body;
    // customerId =new ObjectId(customerId);
    const cart = await Carts.findOne({ customerId });

    if (!cart) {
      return response
        .status(404)
        .json({ message: "There is no cart for this customer" });
    }
    // console.log(cart);
    // productId = new ObjectId(productId);
    const foundItemIndex = cart.items.findIndex(
      (item) => item.productId == productId
    );

    if (foundItemIndex === -1) {
      return response
        .status(404)
        .json({ message: "This cart doesn't contain this product" });
    }

    const foundItem = cart.items[foundItemIndex];

    if (!deleteItem && foundItem.quantity > 1) {
      foundItem.quantity--;
    } else {
      cart.items.splice(foundItemIndex, 1);
    }

    await cart.save();

    return response.status(200).json({ message: "Removed the item from cart" });
  } catch (err) {
    next(err);
  }
};

module.exports.DeleteCart = async (request, response, next) => {
  let { customerId, checkout } = request.body;
  customerId = new ObjectId(customerId);
  const cart = await Carts.findOne({ customerId });
  if (!cart) {
    return response
      .status(404)
      .json({ message: "There is no cart for this customer" });
  }
  if (checkout) {
    // clear the cart
    // make it as order before deleting

    //save cart to orders
    const cartWithoutLoading = await Carts.findOne({ customerId });
    const cart = await Carts.findOne({ customerId }).populate({
      path: "items.productId",
      model: "Product",
      populate: {
        path: "seller",
        model: "Seller",
      },
    });

    // console.log(
    //   "Cart \n\n",
    //   cart,
    //   "\n==============================================================================="
    // );

    let productsBySeller = {};

    productsBySeller = saveSellersAndProd(cart);
    // productsBySeller will now contain the products classified according to the seller
    // console.log(
    //   "productsBySeller\n\n",
    //   productsBySeller,
    //   "\n ================================================================================================"
    // );

    // console.log(cart.items);
    // console.log(cartWithoutLoading.items);
    let totPrice = cart.items.reduce((total, item) => {
      if (item.productId && item.productId.price) {
        return total + item.quantity * item.productId.price;
      } else {
        return total;
      }
    }, 0);
    const order = new Orders({
      customerId,
      items: cartWithoutLoading.items,
      status: "pending",
      total: totPrice,
    });
    await order
      .save()
      .then((data) => {
        response.status(200).json({
          message: "add cart to orders with state PENDING",
          data: data,
        });
        updateSellerTable(productsBySeller, customerId, data._id);
      })
      .catch((err) => {
        throw err;
      });
  }
  //* this makes the products list empty

  // cart.items = [];
  // await cart.save().then(data=>{
  //     response.status(200).json({message: "deleted"});
  // }).catch(err=> next(err));

  //* this deletes the cart itself
  await Carts.deleteOne({ customerId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return response
          .status(404)
          .json({ message: "There is no cart for this customer" });
      }
      response.status(200).json({ message: "Deleted" });
    })
    .catch((err) => next(err));
};

function saveSellersAndProd(cart) {
  let productsBySeller = {};

  // Iterate over each item in the cart
  cart.items.forEach((item) => {
    const product = item.productId;
    const seller = product.seller && product.seller._id;
    const quantity = item.quantity;

    // Create an entry for the seller if it doesn't exist
    if (!productsBySeller[seller]) {
      productsBySeller[seller] = [];
    }

    const prodId = product._id;
    // Add the product and its quantity to the corresponding seller's array
    productsBySeller[seller].push({ prodId, quantity });
  });

  return productsBySeller;
}

function updateSellerTable(productsBySeller, customerId, orderId) {
  // Iterate over each seller in the productsBySeller object
  Object.keys(productsBySeller).forEach((sellerId) => {
    const products = productsBySeller[sellerId];

    // Extract the prodId and quantity from each product
    const orderItems = products.map((product) => {
      return {
        productId:
          product.prodId instanceof ObjectId
            ? product.prodId
            : new ObjectId(product.prodId),
        quantity: product.quantity,
      };
    });

    // Create the new order object
    const newOrder = {
      orderId: orderId,
      customerId: customerId, // Replace `customerId` with the actual customer ID
      items: orderItems,
      status: "pending",
    };

    // Find the seller by its ID and push the new order to the orders array
    Sellers.findByIdAndUpdate(
      sellerId,
      { $push: { Orders: newOrder } },
      { new: true }
    )
      .then((updatedSeller) => {
        console.log(`Seller with ID ${sellerId} updated successfully.`);
      })
      .catch((err) => {
        console.error(`Failed to update seller with ID ${sellerId}:`, err);
      });
  });
}
module.exports.Carts = Carts;
