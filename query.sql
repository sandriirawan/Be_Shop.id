-- Active: 1686748002540@@127.0.0.1@5432@authentication


CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    role VARCHAR
);

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    photo VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    category_id INT FOREIGN KEY category (id)
);


CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE order_table (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product (id)
);

ALTER TABLE product
ADD category_id INT;

ALTER TABLE product
ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES category (id);



SELECT * FROM product;

DELETE FROM product;