USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
("Bar Soap", "Personal Hygiene", 3.00, 50000),
("Shampoo", "Personal Hygiene", 10.00, 45000),
("Ladder", "Tools", 100.00, 5000),
("Patio Umbrella", "Outdoor Furniture", 100.00, 1000),
("Bowls", "Houseware", 15.00, 15000),
("Dog Clippers", "Pet Supplies", 30.00, 3000),
("4K Television", "Electronics", 600.00, 8000),
("Mattress", "Furniture", 500.00, 5000),
("Laptop", "Electronics", 800.00, 3000),
("Legos", "Toys", 75.00, 20000),
("Turboman Action Figure", "Toys", 100.00, 1),
("Tickle Me Elmo", "Toys", 50.00, 3);

INSERT INTO departments (department_name, over_head_costs) VALUES 
("Personal Hygiene", 10000),
("Tools", 25000),
("Outdoor Furniture", 30000),
("Houseware", 15000),
("Pet Supplies", 20000),
("Electronics", 75000),
("Furniture", 50000),
("Toys", 20000);

SELECT * FROM products;
SELECT * FROM departments;