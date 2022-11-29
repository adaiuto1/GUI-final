DROP DATABASE IF EXISTS db; -- why are we dropping an existing database?

-- create database db
CREATE DATABASE IF NOT EXISTS db;

-- use newly create database
USE db;

-- create table in db
CREATE TABLE `db`.`test_table` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `value` VARCHAR(45), 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE users_table(
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE
)

CREATE TABLE profiles(
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INT,
    gender VARCHAR(255),
    interests TEXT,
    image_url VARCHAR(255),
    looking_for TEXT,
    user_status TEXT,
    rating FLOAT
)

-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');