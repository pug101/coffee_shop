const Menu = require("../models/menu.js");

// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Menu
  const menu = new Menu({
    menu_name: req.body.menu_name,
    unit_price: req.body.unit_price
  });
  
  Menu.create(menu , (err, data) => {
    if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Menu."
    });
  else res.send(data);
  });
  
};

// Retrieve all Menus from the database.
exports.findAll = (req, res) => {
  Menu.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menus."
      });
    else res.send(data);
  });
};

// Update a Menu identified by the menu_id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Menu.updateById(
    req.params.menu_id,
    new Menu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Menu with id ${req.params.menu_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Menu with id " + req.params.menu_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Menu with the specified menu_id in the request
exports.delete = (req, res) => {
  Menu.remove(req.params.menu_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Menu with id ${req.params.menu_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Menu with id " + req.params.menu_id
        });
      }
    } else res.send({ message: `Menu was deleted successfully!` });
  });
};