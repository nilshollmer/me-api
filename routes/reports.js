const express = require('express');
const router = express.Router();

const auth = require('../models/auth.js');
const reports = require('../models/reports.js');

router.post('/add',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => reports.createReport(res, req.body)
);

router.post('/edit',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => reports.updateReport(res, req.body)
);

router.get("/", (req, res) => reports.getAllReports(req, res));
router.get("/week/:week", (req, res) => reports.getReport(res, req.params.week));
// router.get('/reports/week/:kmom', (req, res, next) => {
//     const data = {
//         data: {
//
//         }
//     };
//
//     res.json(data);
// });

module.exports = router;
