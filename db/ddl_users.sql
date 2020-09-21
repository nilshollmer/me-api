--
-- Create tables
--
-- By Nils Hollmer for course JSramverk
-- 2020-09-16
--

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(60) NOT NULL,
    UNIQUE(email)
);
