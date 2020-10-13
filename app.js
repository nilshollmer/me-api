const express = require('express');
const router = express.Router();
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const bodyParser = require("body-parser");

// Database
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const dbPath = path.resolve(__dirname, 'me.sqlite')
// const db = new sqlite3.Database(dbPath);


// Models
const auth = require('./models/auth.js');

// Routes
const index = require("./routes/index.js");
const reports = require("./routes/reports.js");

const port = 1337;

app.use(cors());

// Hide log while testing
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log on command line
    app.use(morgan('combined')); // 'combined' outputs Apache style logs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use("/me-api/", index);
app.use("/me-api/reports", reports);
app.use("/me-api/login", (req, res) => auth.login(res, req.body));
app.use("/me-api/register", (req, res) => auth.register(res, req.body));
// app.get("/hello/:msg", hello);

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
            "status": err.status,
            "title": err.message,
            "detail": err.message
            }
        ]
    });
});

app.listen(port, () => console.log(`API listening to port ${port}.`));
