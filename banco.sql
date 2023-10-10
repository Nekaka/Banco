CREATE DATABASE banco;

USE banco;

CREATE TABLE cliente(
	id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    direccion VARCHAR(50),
    telefono VARCHAR(12),
    correo_electronico VARCHAR(50)
);

CREATE TABLE sucursal(
	id_sucursal INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    direccion VARCHAR(50),
    telefono VARCHAR(12)
);

CREATE TABLE empleado(
	id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    cargo VARCHAR(20),
    fecha_contratacion DATE,
    id_sucursal INT,
    FOREIGN KEY (id_sucursal) REFERENCES sucursal (id_sucursal)
);

CREATE TABLE cuenta(
	id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
    tipo_cuenta VARCHAR(15),
    saldo FLOAT,
    fecha_apertura DATE,
    id_cliente INT,
    id_empleado INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES empleado (id_empleado)
);

CREATE TABLE transaccion(
	id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    tipo_transaccion VARCHAR(20),
    monto FLOAT,
    id_cuenta INT,
    FOREIGN KEY (id_cuenta) REFERENCES cuenta (id_cuenta)
);

CREATE TABLE prestamo(
	id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
    id_cuenta INT,
    monto FLOAT,
    taza_interes FLOAT,
    fecha_inicio DATE,
    fecha_finalizacion DATE,
    FOREIGN KEY (id_cuenta) REFERENCES cuenta(id_cuenta)
);

CREATE TABLE tipo_tarjeta(
	id_tipo_tarjeta INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(30),
    fecha_creacion DATE,
    estado INT
);

CREATE TABLE tarjeta(
	id_tarjeta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_tipo_tarjeta INT,
    numero_tarjeta INT,
    clave_tarjeta INT,
    limite_credito FLOAT,
    saldo_actual FLOAT,
    fecha_caducidad DATE,
    id_cuenta INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_tipo_tarjeta) REFERENCES tipo_tarjeta(id_tipo_tarjeta),
    FOREIGN KEY (id_cuenta) REFERENCES cuenta(id_cuenta)
);