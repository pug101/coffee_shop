module.exports = app => {
    const menus = require("../controllers/menu.js");

    // Create a new Menu
    app.post("/menus", menus.create);

    // Retrieve all Menus
    app.get("/menus", menus.findAll);

    // Update a Menu with menu_Id
    app.put("/menus/:menu_id", menus.update);

    // Delete a Menu with menu_Id
    app.delete("/menus/:menu_id", menus.delete);
};