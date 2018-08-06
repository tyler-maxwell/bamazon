# bamazon

## Purpose
This is a class project to demonstrate my ability to create and manipulate databases using MySQL and Node. 

## Overview
This repository utilizes MySQL to create a database for an online store. Node packages Inquirer and CLI-Table are used to manipulate the database and display output to the console. There are three javascript files that interact with the database in different ways for different purposes.

#### bamazonCustomer.js
This file contains the interface for customer interactions with the database. It allows the user to view products either by department or by total list. After list is displayed the user is allowed to purchase a product.

#### bamazonManager.js
This file contains the interface for manager interactions with the database. It allows the user to view all products for sale, view products with low inventory values (5 or less), add more units of a preexisting product to the inventory, and a new products to the database.

#### bamazonSupervisor.js
This file contains the interface for supervisor interactions with the database. It allows the user to view all departments and calcuate the profit of each department by subtracting overhead costs from total sales. It also allows the user to create new departments.

## Video Demo
[YouTube](https://youtu.be/fmKTRae-9gs)

## Github Link

[https://github.com/tyler-maxwell/bamazon](https://github.com/tyler-maxwell/bamazon)