var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function start () {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("\nWelcome to Bamazon.\n");
        storeFront();            
    });
};

function storeFront() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Which items would you like to view?",
        choices: [
            "View all items",
            "View items by department",
            "Exit program"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View all items":
                viewAll();
                break;
            case "View items by department":
                viewDepartments();
                break;
            case "Exit program":
                console.log("\nThank you for shopping at Bamazon.")
                connection.end();
                break;
        };
    });
};

function viewAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log()
        res.forEach(element => {
            console.log(`ID: ${element.item_id} | ${element.product_name} | $${element.price}`);
        });
        console.log();
        buyProduct();
    });   
};

function viewDepartments() {
    connection.query("SELECT * FROM products GROUP BY department_name", function(err, res) {
        if (err) throw err;
        var departments = [];
        res.forEach(element => {
            departments.push(element.department_name);
        });
        inquirer.prompt({
            name: "department",
            type: "list",
            message: "Which department would you like to view?",
            choices: departments
        }).then(function(answer) {
            console.log()
            connection.query("SELECT * FROM products WHERE department_name=?", [answer.department], function(err, res) {
                if (err) throw err;
                res.forEach(element => {
                    console.log(`ID: ${element.item_id} | ${element.product_name} | $${element.price}`);
                });
                console.log();
                buyProduct();
            });
        });
    });   
};

function buyProduct() {
    inquirer.prompt({
        name: "buy",
        type: "confirm",
        message: "Do you want to buy a product?"
    }).then(function(answer) {
        if (answer.buy) {
            inquirer.prompt([
                {
                    name: "id",
                    type: "input",
                    message: "What is the ID of the product you want to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units of the product do you wish to buy?"
                }
            ]).then(function(answer) {
                connection.query("SELECT * FROM products WHERE item_id=?", [answer.id], function(err, res) {
                    if (err) throw err;
                    if (res[0] !== null && res[0] !== undefined) {
                        var newStock = res[0].stock_quantity - answer.quantity;
                        var totalCost = res[0].price * answer.quantity;
                        if (newStock < 0) {
                            console.log("\nInsufficient quantity!\n");
                            storeFront();
                        } else {
                            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newStock},{item_id: answer.id}],function(err, res) {
                                console.log(`\nTransaction successful. The total cost of your purchase is $${totalCost}\n`);
                                storeFront();
                            });
                        };
                    } else {
                        console.log("\nInvalid product ID!\n");
                        storeFront();
                    };
                });
            });
        } else {
            storeFront();
        };
    });
};

start();