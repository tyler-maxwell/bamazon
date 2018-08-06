DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  product_sales DECIMAL(11,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT NOT NULL,
  PRIMARY KEY (department_id)
);

SELECT * FROM products;
SELECT * FROM departments;