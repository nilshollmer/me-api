const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/users.sqlite');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let config;

try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}

const jwtSecret = process.env.JWT_SECRET || config.secret;

const auth = {
    checkToken: function(req, res, next) {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "No token",
                    detail: "No jwt-token provided in headers"
                }
            });
        }

        jwt.verify(token, jwtSecret, function(err, decoded) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Authentication failed",
                        detail: "The token you provided is not valid."
                    }
                });
            }

            next();
            return undefined;
        });
    },

    login: function(res, body) {
        const email = body.email;
        const password = body.password;

        if (!email) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Email missing",
                    detail: "Email missing in request"
                }
            });
        }

        if (!password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Password missing",
                    detail: "Password missing in request"
                }
            });
        }

        const sql = `SELECT * FROM users WHERE email = ?;`;

        db.get(sql, email, (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {   
                        status: 500,
                        title: "Database error",
                        detail: "Error while running SQL-command"
                    }
                });
            }

            if (rows === undefined) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        title: "Failed to find user",
                        detail: `User with name ${email} not found in db`
                    }
                });
            }

            bcrypt.compare(password, rows.password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            title: "bcrypt error",
                            detail: "Error while hashing password using bcrypt."
                        }
                    });
                }

                if (result) {
                    const secret = process.env.JWT_SECRET;
                    let payload = { email: email };
                    let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '24h'});


                    return res.json({
                        data: {
                            status: 200,
                            title: "Login successful",
                            detail: `User ${email} is now logged in.`,
                            token: jwtToken
                        }
                    });
                }

                return res.status(401).json({
                    errors: {
                        status: 401,
                        title: "Incorrect password",
                        detail: "The password you entered was incorrect."
                    }
                });
            });
        });
    },


    register: function(res, body) {
        const email = body.email;
        const password = body.password;

        if (!email) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Email missing",
                    detail: "Email missing in request"
                }
            });
        } else if (!password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Password missing",
                    detail: "Password missing in request"
                }
            });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "bcrypt error",
                        detail: "Error while hashing password using bcrypt."
                    }
                });
            }

            const sql = `INSERT INTO users (email, password) VALUES (?, ?);`;

            db.run(sql, email, hash, (err) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            title: "Database error",
                            detail: "Error while running SQL-command."
                        }
                    });
                }

                return res.status(201).json({
                    errors: {
                        status: 201,
                        title: "User successfully created",
                        detail: `User with email ${email} successfully created`
                    }
                });
            });
        });

    }
}

module.exports = auth;
