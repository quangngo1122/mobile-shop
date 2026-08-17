const { orders } = require("../data/fakeData");

// Create Order
exports.createOrder = (req, res) => {
  try {
    const { userId } = req.params;
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      delivery,
      payment,
    } = req.body;

    // Validation
    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ status: "ERR", message: "Order items are required" });
    }

    // Create new order
    const newOrder = {
      _id: String(orders.length + 1),
      orderItems: orderItems,
      user: userId,
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || payment,
      itemsPrice: itemsPrice || 0,
      shippingPrice: shippingPrice || 0,
      taxPrice: taxPrice || 0,
      totalPrice: totalPrice || 0,
      delivery: delivery,
      payment: payment,
      isPaid: false,
      paidAt: null,
      isDelivered: false,
      deliveredAt: null,
      createdAt: new Date(),
    };

    orders.push(newOrder);

    return res.status(200).json({
      status: "OK",
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Get All Orders for a User
exports.getOrdersByUserId = (req, res) => {
  try {
    const { id } = req.params;

    const userOrders = orders.filter((order) => order.user === id);

    return res.status(200).json({
      status: "OK",
      message: "User orders retrieved",
      data: userOrders,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Get Order Details
exports.getOrderDetails = (req, res) => {
  try {
    const { id } = req.params;

    const order = orders.find((o) => o._id === id);
    if (!order) {
      return res
        .status(404)
        .json({ status: "ERR", message: "Order not found" });
    }

    return res.status(200).json({
      status: "OK",
      message: "Order details retrieved",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Get All Orders (Admin)
exports.getAllOrders = (req, res) => {
  try {
    return res.status(200).json({
      status: "OK",
      message: "All orders retrieved",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Cancel Order
exports.cancelOrder = (req, res) => {
  try {
    const { id } = req.params;

    const orderIndex = orders.findIndex((o) => o._id === id);
    if (orderIndex === -1) {
      return res
        .status(404)
        .json({ status: "ERR", message: "Order not found" });
    }

    // Mark order as cancelled (we could add a status field)
    orders.splice(orderIndex, 1);

    return res.status(200).json({
      status: "OK",
      message: "Order cancelled successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Update Order Status
exports.updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { isPaid, isDelivered } = req.body;

    const orderIndex = orders.findIndex((o) => o._id === id);
    if (orderIndex === -1) {
      return res
        .status(404)
        .json({ status: "ERR", message: "Order not found" });
    }

    if (isPaid !== undefined) {
      orders[orderIndex].isPaid = isPaid;
      if (isPaid) {
        orders[orderIndex].paidAt = new Date();
      }
    }

    if (isDelivered !== undefined) {
      orders[orderIndex].isDelivered = isDelivered;
      if (isDelivered) {
        orders[orderIndex].deliveredAt = new Date();
      }
    }

    return res.status(200).json({
      status: "OK",
      message: "Order updated successfully",
      data: orders[orderIndex],
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};
