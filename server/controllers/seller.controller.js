const Customer = require('../models/customer.model');

  
updateOrders = async (req, res) => {
    try {
      const sellerOrdersData = req.body;
      sellerOrdersData.forEach(async (order) => {
        const { sellerID, sellerOrders } = order;

        await Customer.findOneAndUpdate(
            { _id: sellerID },
            {
              $push: {
                Orders: {
                  customerId: sellerOrders[0].customerId,
                  items: sellerOrders.map((order) => ({
                    productId: order.productId,
                    quantity: order.quantity
                  })),
                  status: "pending"
                }
              }
            }
          );
        });
  
      return res.status(201).json({ ok: "Orders updated successfully." });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Failed to update orders." });
    }
  };
   
  
module.exports = {
    updateOrders
}