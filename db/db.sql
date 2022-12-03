USE udemy_app_delivery_flutter;

CREATE TABLE users
(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(200) NOT NULL,
    telephone VARCHAR(100) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);