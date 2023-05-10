const { ConnectionStates } = require("mongoose");
const Carts = require("../models/cart.model");
const Orders = require("../models/order.model");
const { ObjectId } = require('mongodb');

/**
 * Retrieves all carts.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.GetAllCarts = (request, response, next) => {
  Carts.find({})
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

/**
 * Retrieves the cart by customer ID.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.GetCartByCustId = (request, response, next) => {
  Carts.find({ customerId: request.params.id })
    .populate({
      path: 'items.productId',
      model: 'Product'
    })
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

/**
 * Adds an item to the cart.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.AddItem = async (request, response, next) => {
  let custID = new ObjectId(request.body.customerId);
  let prodID = request.body.productId;

  const cart = await Carts.findOne({ customerId: custID });

  if (!cart) {
    await this.CreateCart(request, response, next);
  } else {
    let item = { productId: prodID, quantity: 1 };
    let foundItem = cart.items.find(i => i.productId == prodID);

    if (!foundItem) {
      const update = { $push: { items: item } };
      const options = { new: true, upsert: true };
      const updatedCart = await Carts.findOneAndUpdate(
        { customerId: custID },
        update,
        options
      );

      response.status(200).json({ message: "new item added", data: updatedCart });
    } else {
      foundItem.quantity++;

      cart.save()
        .then(data => {
          response.status(200).json({ message: "increasing quantity of existing item" });
        })
        .catch(err => next(err));
    }
  }
};

/**
 * Creates a new cart.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise}
 */
module.exports.CreateCart = async (request, response, next) => {
  let customerId = new ObjectId(request.body.customerId);
  let productId = new ObjectId(request.body.productId);
  let items = [{ productId }];
  items[0].quantity = 1;
  items[0].productId = new ObjectId(items[0].productId)

  const cart = new Carts({ customerId, items });

  return await cart.save()
    .then(data => {
      response.status(200).json({ message: "added", data: data });
    })
    .catch(err => {
      throw err;
    });
};

/**
 * Removes an item from the cart.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.RemoveItem = async (request, response, next) => {
  try {
    let { customerId, productId, deleteItem } = request.body;

    const cart = await Carts.findOne({ customerId });

    if (!cart) {
      return response.status(404).json({ message: "There is no cart for this customer" });
    }

    const foundItemIndex = cart.items.findIndex(item => item.productId == productId);

    if (foundItemIndex === -1) {
      return response.status(404).json({ message: "This cart doesn't contain this product" });
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

/**
 * Deletes a cart.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.DeleteCart = async (request, response, next) => {
  let { customerId, checkout } = request.body;
  customerId = new ObjectId(customerId);
  const cart = await Carts.findOne({ customerId });

  if (!cart) {
    return response.status(404).json({ message: "There is no cart for this customer" });
  }

  if (checkout) {
    const cartWithoutLoading = await Carts.findOne({ customerId });
    const cart = await Carts.findOne({ customerId }).populate({
      path: 'items.productId',
      model: 'Product'
    });

    let totPrice = cart.items.reduce((total, item) => {
      if (item.productId && item.productId.price) {
        return total + item.quantity * item.productId.price;
      } else {
        return total;
      }
    }, 0);

    const order = new Orders({ customerId, items: cartWithoutLoading.items, status: "pending", total: totPrice });

    await order.save()
      .then(data => {
        response.status(200).json({ message: "add cart to orders with state PENDING", data: data });
      })
      .catch(err => {
        throw err;
      });
  }

  await Carts.deleteOne({ customerId })
    .then(result => {
      if (result.deletedCount === 0) {
        return response.status(404).json({ message: "There is no cart for this customer" });
      }
      response.status(200).json({ message: "Deleted" });
    })
    .catch(err => next(err));
};

module.exports.Carts = Carts;
