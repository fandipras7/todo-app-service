CREATE TABLE products(
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (64) NOT NULL,
    description VARCHAR(128) NULL,
    stock INT DEFAULT 0,
    price INT DEFAULT 0,
    id_category INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE category (
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL
)

INSERT into category(name)VALUES("makanan"),("minuman"),("snack"),("permen");

INSERT into category(name)VALUES('err'),('reree'),('dadadsada'),('adadad'),('dasdasd');

INSERT into products(name, description, id_category)VALUES('mie goreng', 'rasa kari ayam', 1), ('es teh', 'es teh manis', 2),('lolipop', 'rasa blueberry', 4),('cireng', '', 3);

INSERT into products(name, description, id_category)VALUES('nokia', 'n73 terbaru', 7);

-- mengambil semua produk dan category yang berisian dalam hal ini id nya sama
SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id;
-- mengambil semua produk, untuk kategory hanya yang id kategorinya sama dengan id produk
SELECT products.*, category.name AS name_category FROM products LEFT JOIN category ON products.id_category = category.id;
-- mengambil produk yang idnya sama dengan id kategori, dan mengambil semua kategory
SELECT products.*, category.name AS name_category FROM products RIGHT JOIN category ON products.id_category = category.id;

/* Limitation*/
SELECT * from category LIMIT 4 OFFSET 0;

/* Total */
SELECT COUNT(*) AS total from category;