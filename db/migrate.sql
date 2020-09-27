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

DROP TABLE IF EXISTS reports;

CREATE TABLE IF NOT EXISTS reports (
    week        INT(1) NOT NULL,
    title       VARCHAR(20) NOT NULL,
    data        TEXT(10000) NOT NULL,
    UNIQUE(title)
);
