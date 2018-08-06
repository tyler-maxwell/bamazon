var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
        console.log("\nBamazon Supervisor Interface\n");
        topMenu();            
    });
};

function topMenu() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Which action do you want to perform?",
        choices: [
            "View Product Sales by Department",
            "Create New Department",
            "Exit program"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                createDepartment();
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

function viewSales() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var allSales = [];
        res.forEach(element => {
            allSales.push({department: element.department_name, sales: element.product_sales});
        });
        var sortedSales = [];
        allSales.forEach(element => {
            var deptFound = false;
            var index;
            for (var i = 0; i < sortedSales.length; i++) {
                if (sortedSales[i].department === element.department) {
                    deptFound = true;
                    index = i;
                }
            };
            if (deptFound) {
                sortedSales[index].sales = (sortedSales[index].sales + element.sales);
            } else {
                sortedSales.push({department: element.department, sales: element.sales});
            };
        });
        connection.query("SELECT * FROM departments", function(err, res) {
            var table = new Table({
                head: ['ID', 'DEPARTMENT NAME', 'OVERHEAD COSTS', 'PRODUCT SALES', 'TOTAL PROFIT']
              , colWidths: [10, 25, 20, 20, 20]
            });
            // res.forEach(element => {
            //     table.push([element.item_id, element.product_name, element.department_name, element.price, element.stock_quantity]);
            // });
            res.forEach(element => {
                var sales = 0;
                var profit = 0;
                for (var i = 0; i < sortedSales.length; i++) {
                    if (sortedSales[i].department === element.department_name) {
                        sales = sortedSales[i].sales;
                    }
                };
                profit = sales - element.over_head_costs;
                table.push([element.department_id, element.department_name, element.over_head_costs, sales, profit]);
            });
            console.log(table.toString());
            restart();
        });
    });   
};

function createDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of this department?",
        },
        {
            name: "over_head",
            type: "input",
            message: "What are the overhead costs of this department?",
        }
    ]).then(function(answer) {
        console.log()
        connection.query("INSERT INTO departments SET ?", [{department_name: answer.department, over_head_costs: answer.over_head}],function(err, res) {
            if (err) throw err;
            console.log("Department added to database.")
            restart();
        });
    });
};

start();