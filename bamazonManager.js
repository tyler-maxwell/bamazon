var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function start() {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("\nBamazon Manager Interface\n");
        topMenu();            
    });
};

function topMenu() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Which action do you want to perform?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit program"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLow();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit program":
                connection.end();
                break;
        };
    });
};

function restart() {
    console.log();
    inquirer.prompt({
        name: "restart",
        type: "confirm",
        message: "Return to Top Menu?"
    }).then(function(answer) { 
        if(answer.restart) {
            topMenu();
        } else {
            connection.end();
        }
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log()
        console.log(`ID | Product Name | Department | Price | Quantity`);
        res.forEach(element => {
            console.log(`${element.item_id} | ${element.product_name} | ${element.department_name} | $${element.price} | ${element.stock_quantity}`);
        });
        restart();
    });   
};

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity<=5", function(err, res) {
        if (err) throw err;
        console.log()
        console.log(`ID | Product Name | Department | Price | Quantity`);
        res.forEach(element => {
            console.log(`${element.item_id} | ${element.product_name} | ${element.department_name} | $${element.price} | ${element.stock_quantity}`);
        });
        restart();
    });   
};

function addInventory() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you want to increase the inventory of?",
        },
        {
            name: "newStock",
            type: "input",
            message: "How much inventory do you want to add?",
        }
    ]).then(function(answer) {
        console.log()
        connection.query("SELECT * FROM products WHERE item_id = ?", [answer.id],function(err, res) {
            if (err) throw err;
            var stock = res[0].stock_quantity + parseInt(answer.newStock);
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: stock},{item_id: parseInt(answer.id)}], function(err, res) {
                if (err) throw err;
                console.log("Stock updated.")
                restart();
            });
        });
    });
};

function addProduct() {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What is the name of this product?",
        },
        {
            name: "department",
            type: "input",
            message: "What department does this product belong to?",
        },
        {
            name: "price",
            type: "input",
            message: "What is the price of this product?",
        }
    ]).then(function(answer) {
        console.log()
        connection.query("INSERT INTO products SET ?", [{product_name: answer.product, department_name: answer.department, price: answer.price}],function(err, res) {
            if (err) throw err;
            console.log("Product added to database.")
            restart();
        });
    });
};

start();