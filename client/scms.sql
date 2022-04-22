drop database scms;
create database scms;
use scms;

CREATE TABLE `categories` ( 
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `products` ( 
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `price` DOUBLE(10,2) NOT NULL,
    `category_id` INT(10),
    PRIMARY KEY (`id`),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE `customers` ( 
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(40) NOT NULL,
    `last_name` VARCHAR(40) NOT NULL,
    `street` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `zip_code` VARCHAR(4) NOT NULL,
    `phone_number` VARCHAR(11) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `orders` ( 
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `customer_id` INT(10) NOT NULL,
    `is_order_fulfilled` INT(1) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE `order_items` ( 
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `order_id` INT(10) NOT NULL,
    `product_id` INT(10) NOT NULL,
    `price` DOUBLE(10,2) NOT NULL,
    `quantity` INT(10) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- DEFAULT DATA
INSERT INTO categories (name) VALUES
    ('Clothes'),
    ('Gadgets'),
    ('Toys');

INSERT INTO products (name, price, category_id) VALUES
    ('With You Hoodie', 9899.99, 1),
    ('Armyst Hoodie', 9899.99, 1),
    ('Mikrokosmos Mood Lamp', 15699.99, 2),
    ('DC-Red Hood Figurine', 10499.99, 3);

INSERT INTO customers (first_name, last_name, street, city, zip_code, phone_number) VALUES
    ('Jimin','Park','Somewhere in','Seoul','1013','09111111111'),
    ('Namjoon','Kim','Somewhere in','Seoul','0912','09222222222'),
    ('Jungkook','Jeon','Somewhere in','Seoul','0901','09333333333');