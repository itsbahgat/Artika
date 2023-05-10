const Sellers = require("../models/seller.model");

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
