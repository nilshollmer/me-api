const express = require('express');
const router = express.Router();

const auth = require('../models/auth.js');
const reports = require('../models/reports.js');

router.get('/week/1', (req, res) => {
    const data = {
        data: {
            msg: `
[Github repo](https://github.com/nilshollmer/me-angular/)

# MeAppAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8.

## Install

Run \`npm install\` to install dependencies needed for this project.

## Development server

Run \`ng serve\` for a dev server. Navigate to \`http://localhost:4200/\`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run \`ng generate component component-name\` to generate a new component. You can also use \`ng generate directive|pipe|service|class|guard|interface|enum|module\`.

## Build

Run \`ng build\` to build the project. The build artifacts will be stored in the \`dist/\` directory. Use the \`--prod\` flag for a production build.

## Running unit tests

Run \`ng test\` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run \`ng e2e\` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use \`ng help\` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).`
        }
    };

    res.json(data);
});

router.get('/week/2', (req, res, next) => {
    const data = {
        data: {
            msg: `
[Github repo](https://github.com/nilshollmer/me-api/)

#Me-API

## Install
Run \`npm install\` to install dependencies.

## Usage
Run \`npm start\` to start nodemon on \`localhost:1337\`

Run \`npm production\` to hide verbose error handling.`
        }
    };

    res.json(data);
});

router.post('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => reports.createReport(res, req.body)
);
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
