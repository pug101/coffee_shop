module.exports = app => {
    const orders = require("../controllers/order.js");

    // Create a new Order
    app.post("/orders/order_details", orders.create);

    // Retrieve all Orders
    app.get("/orders/order_details", orders.findAll);

};