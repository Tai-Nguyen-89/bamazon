DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Smart TV", "Electronic", 470, 20);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Laptop", "Electronic", 800, 25);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Lego", "Toy", 30, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Hot Wheels", "Toy", 4, 70);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Generic Shampoo", "Healthcare", 5, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Generic Body Wash", "Healthcare", 6, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Generic Gum", "Candy", 1, 500);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Minty Mints", "Candy", 2, 400);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Soda", "Drink", 1, 300);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Water", "Drink", 1, 600);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Best Movie", "Movies", 21, 3);