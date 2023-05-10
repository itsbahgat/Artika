const Orders = require("../models/order.model");

module.exports.GetAllOrders = (request, response, next) => {
  Orders.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.GetOrderByCustId = (request, response, next) => {
  Orders.find({ customerId: request.params.id })
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

module.exports.UpdateOrder = async (request, response, next) => {
  const { orderId, status } = request.body;

  console.log(request.body);
  const updatedOrder = await Orders.findOne({ _id: orderId });
  if (!updatedOrder) {
    return response
      .status(404)
      .json({ message: "There is no orders for this customer" });
  }

  const oldState = updatedOrder.status;
  updatedOrder.status = status;

  if (oldState != status) {
    updatedOrder
      .save()
      .then((data) => {
        response.status(200).json({
          message: "order state was " + oldState + ", and now it is " + status,
        });
      })
      .catch((err) => next(err));
  } else {
    response.status(200).json({ message: "there is no change in status" });
  }
};

module.exports.Orders = Orders;
