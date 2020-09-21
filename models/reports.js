const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/reports.sqlite');


const jwt = require('jsonwebtoken');

const reports = {
    createReport: function(res, body) {
        const kmom = body.kmom;
        const data = body.data;

        if (!kmom) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Kmom missing",
                    detail: "Kmom number missing in request"
                }
            });
        }

        const sql = `INSERT INTO reports (kmom, data) VALUES (?, ?);`;

        db.run(sql, kmom, data, (err) => {
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
                    detail: `Report with kmom number ${kmom} has been created`
                }
            });
        });
    }
};




module.exports = reports;
