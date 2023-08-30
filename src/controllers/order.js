const Order = require("../models/order.js");
const dateFormat = require("dateformat");

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    var orders = req.body.orders
  
    // Save Order in the database
    Order.create(orders, (err, data) => {
      if (err)
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found menu_id.`
          });
        } else {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Order."
          });

        }

      else res.send(data);
    });
  };


// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    Order.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders."
        });
      else res.send(data);
    });
  };