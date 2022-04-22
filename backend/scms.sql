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


-- order item
-- referencing product & order, with column price
-- record price fetched by products table