const sql = require("./db.js");
const dateFormat = require("dateformat");

// constructor
const Order = function (menu) {
    this.menu_id = menu.menu_id;
    this.iced = menu.iced;
    this.quantity = menu.quantity;
};

Order.create = (orders, result) => {
    var now = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
    sql.query("INSERT INTO orders SET ?", {order_datetime: now}, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        var orderId = res.insertId
        console.log("created order: ", { order_id: orderId, order_datetime: now});

        var values = []
        orders.forEach((item, index) => {
            values.push(`SELECT ${orderId}, ${item.menu_id}, menus.menu_name, ${item.iced}, menus.unit_price + ${item.iced} * 5, ${item.quantity}, ${item.quantity} * ( menus.unit_price + ${item.iced} * 5 ) FROM menus WHERE menu_id = ${item.menu_id}`)
        });
        var sqlCmd = "INSERT INTO order_details (order_id, menu_id ,menu_name, iced, unit_price, quantity, total_price) " + values.join(' UNION ALL ') + ';';
        sql.query(sqlCmd, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
    
            console.log("created order_detail with id: ", res.insertId);
            sql.query(`SELECT SUM(total_price) AS total_price FROM order_details WHERE order_id = ${orderId};`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                console.log("orders: ", {...res[0], order_datetime: now});
                result(null, {...res[0], order_datetime: now});
            });
        });
    });
};

Order.getAll = result => {
    sql.query("SELECT orders.order_id, order_datetime, menu_name, iced, unit_price, quantity, total_price " +
    "FROM orders " +
    "INNER JOIN order_details ON orders.order_id = order_details.order_id ORDER BY order_id DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("orders: ", res);
        result(null, res);
    });
};

module.exports = Order;