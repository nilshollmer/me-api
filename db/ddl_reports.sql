--
-- Create tables
--
-- By Nils Hollmer for course JSramverk
-- 2020-09-16
--

CREATE TABLE IF NOT EXISTS reports (
    kmom        INT(2) NOT NULL,
    data        TEXT(10000) NOT NULL,
    UNIQUE(kmom)
);
