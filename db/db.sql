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

CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'RESTAURANTE',
    '/restaurant/orders/list',
    '2022-02-13',
    '2022-02-13'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'REPARTIDOR',
    '/delivery/orders/list',
    '2022-02-13',
    '2022-02-13'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'CLIENTE',
    '/client/products/list',
    '2022-02-13',
    '2022-02-13'
);

CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,    
    id_rol BIGINT NOT NULL,    
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);