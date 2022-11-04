CREATE DATABASE IF NOT EXISTS companybd

USE companybd;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL, 
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id) 
)
DESCRIBE employee;

INSERT INTO  employee VALUES 
    (1, ' Joe', 1000),
    (2, ' Henry', 3000),
    (3, ' Sam', 4000),
    (4, ' David', 6000),
    (5, ' Max', 7000);

