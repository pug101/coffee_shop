const sql = require("./db.js");

// constructor
const Menu = function (menu) {
    this.menu_name = menu.menu_name;
    this.unit_price = menu.unit_price;
};

Menu.create = (newMenu, result) => {
    sql.query("INSERT INTO menus SET ?", newMenu, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created menu: ", { menu_id: res.insertId, ...newMenu });
        result(null, { menu_id: res.insertId, ...newMenu });
    });
};

Menu.getAll = result => {
    sql.query("SELECT * FROM menus", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("menus: ", res);
        result(null, res);
    });
};

Menu.updateById = (menu_id, newMenu, result) => {
    sql.query(
        "UPDATE menus SET menu_name = ?, unit_price = ? WHERE menu_id = ?",
        [newMenu.menu_name, newMenu.unit_price, menu_id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // Create new price
                sql.query("INSERT INTO menus SET ?", newMenu, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }

                    console.log("created menu: ", { menu_id: res.insertId, ...newMenu });
                    result(null, { menu_id: res.insertId, ...newMenu });
                });
                return;
            }
            console.log("updated menu: ", newMenu);
            result(null, newMenu);
        }
    );
};

Menu.remove = (menu_id, result) => {
    sql.query("DELETE FROM menus WHERE menu_id = ?", menu_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Menu with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted menu with id: ", menu_id);
        result(null, res);
    });
};

module.exports = Menu;