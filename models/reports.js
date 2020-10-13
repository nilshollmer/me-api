// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const dbPath = path.resolve(__dirname, '../me.sqlite')
const db = require("../db/database.js");


const jwt = require('jsonwebtoken');

const reports = {
    getAllReports: function(req, res) {
        const sql = "SELECT * FROM reports;";

        db.all(sql, [], function(err, rows) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(200).json( { data: rows } );
        });
    },
    getReport: function(res, week) {
        const sql = "SELECT * FROM reports WHERE week = ?;";

        if (!week) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Week number missing",
                    detail: "Week number missing in request"
                }
            });
        }

        db.get(sql, week, (err, row) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(200).json( { data: row } );
        });
    },
    updateReport: function(res, body) {
        const week = body.week;
        const title = body.title;
        const data = body.data;

        if (!week) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Week number missing",
                    detail: "Week number missing in request"
                }
            });
        }
        const sql = `UPDATE reports SET title = ?, data = ? WHERE week = ?;`;

        db.run(sql, title, data, week, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(201).json({
                data: {
                    status: 204,
                    title: "Report updated",
                    detail: `Report with week number ${week} has been updated`
                }
            });
        });
    },
    createReport: function(res, body) {
        const week = body.week;
        const title = body.title;
        const data = body.data;

        if (!week) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Week number missing",
                    detail: "Week number missing in request"
                }
            });
        }

        const sql = `INSERT INTO reports (week, title, data) VALUES (?, ?, ?);`;

        db.run(sql, week, title, data, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(201).json({
                data: {
                    status: 201,
                    title: "Report created",
                    detail: `Report with week number ${week} has been created`
                }
            });
        });
    },

    deleteReport: function(res, body) {
        const week = body.week;

        if (!week) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Week missing",
                    detail: "Week number missing in request"
                }
            });
        }

        const sql = `DELETE FROM reports WHERE week = ?;`;

        db.run(sql, week, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(204).json({
                data: {
                    status: 204,
                    title: "Report deleted",
                    detail: `Report with week number ${week} has been deleted`
                }
            });
        });
    }
};




module.exports = reports;
