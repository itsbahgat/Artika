const Orders = require("../models/order.model");

/**
 * Retrieves all orders.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.GetAllOrders = (request, response, next) => {
  Orders.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/**
 * Retrieves orders by customer ID.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.GetOrderByCustId = (request, response, next) => {
  Orders.find({ customerId: request.params.id })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/**
 * Retrieves orders by customer ID and state.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.GetOrderByCustIdAndState = (request, response, next) => {
  const state = request.params.state;
  const customerID = request.params.id;
  Orders.find({ customerId: customerID, status: state })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/**
 * Retrieves orders by state.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.GetOrderByState = (request, response, next) => {
  const state = request.params.state;
  Orders.find({ status: state })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

/**
 * Updates an order's status.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.UpdateOrder = async (request, response, next) => {
  try {
    const { orderId, status } = request.body;
    const updatedOrder = await Orders.findOne({ _id: orderId });

    if (!updatedOrder) {
      return response
        .status(404)
        .json({ message: "There is no orders for this customer" });
    }

    const oldState = updatedOrder.status;

    if (oldState !== "pending" && status === "cancelled") {
      return response.status(400).json({ message: "You can't change it now!!" });
    }

    updatedOrder.status = status;

    if (oldState !== status) {
      await updatedOrder.save();
      response.status(200).json({
        message: `order state was ${oldState}, and now it is ${status}`,
      });
    } else {
      response.status(200).json({ message: "there is no change in status" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.Orders = Orders;
