--
-- Add data to table users
--
-- Username: admin
-- Password: test
--
INSERT INTO users ( email, password ) VALUES ("admin", "$2a$10$gdKiQGTUrcrIVnldy7afNeVWRE1BTMecTiyqar0wMMRvuQSc0zt3W");

--
-- Add data to table reports
--

INSERT INTO reports ( week, title, data ) VALUES (1, "Kmom01", "[Github repo](https://github.com/nilshollmer/me-angular/)

# MeAppAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8.

## Install

Run `npm install` to install dependencies needed for this project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
");

INSERT INTO reports (week, title, data ) VALUES (2, "Kmom02", "[Github repo](https://github.com/nilshollmer/me-api/)

# Me-API

## Install
Run `npm install` to install dependencies.

## Usage
Run `npm start` to start nodemon on `localhost:1337`

Run `npm production` to hide verbose error handling.`");


INSERT INTO reports (week, title, data ) VALUES (3, "Kmom03", "
API: [Github repo](https://github.com/nilshollmer/me-api/)

Angular-app: [Github repo](https://github.com/nilshollmer/me-angular/)

## Driftsättning
Driftsättningen av appen har gått smidigt, allt från att registrera domännamn till att rsynca lokala filer till min digital ocean droplet. Det som jag stött på problem med gäller sökvägar för databasfiler och kontakt med databas som jag etablerat i kmom02 men behövde omstrukturera nu.

## Devops
Den största lärdomen jag dragit från devops-delen av denna kurs är att det känns tryggt att följa en applikation från utveckling till testning till lansering och även om det är något som jag tagit för givet som ensam utvecklar så förstår jag att det kan vara annorlunda när man jobbar i team.");
