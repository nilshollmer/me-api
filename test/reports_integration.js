process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");
const db = require("../db/database.js");

chai.should();

chai.use(chaiHttp);

let jwtToken = "";

describe('reports', () => {
    describe('GET /reports', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('GET /reports/week/1', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /reports/week/:week', () => {
        it('should have week value 1 and title kmom01', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.body.data.should.be.an("object");
                    res.body.data.week.should.equal(1);
                    res.body.data.title.should.equal("Kmom01");

                    done();
                });
        });
        it('should have week value 2 and title kmom02', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.body.data.should.be.an("object");
                    res.body.data.week.should.equal(2);
                    res.body.data.title.should.equal("Kmom02");

                    done();
                });
        });
        it('should have week value 3 and title kmom03', (done) => {
            chai.request(server)
                .get("/reports/week/3")
                .end((err, res) => {
                    res.body.data.should.be.an("object");
                    res.body.data.week.should.equal(3);
                    res.body.data.title.should.equal("Kmom03");

                    done();
                });
        });
    });

    describe('POST /reports/add', () => {
        before(() => {
            let user = {
                email: "admin",
                password: "test"
            };

            return new Promise((resolve) => {
                chai.request(server)
                    .post("/login")
                    .send(user)
                    .end((err, res) => {
                        jwtToken = res.body.data.token;
                        resolve();
                    });
            });
        });

        it('should get a 401 since no week number is being sent', (done) => {
            let body = {
                week: "",
                title: "title",
                data: "report body"
            }
            chai.request(server)
                .post("/reports/add")
                .set("x-access-token", jwtToken)
                .send(body)
                .end((err, res) => {
                    res.status.should.equal(401);
                    res.body.errors.title.should.equal("Week number missing");
                    done();
                });
        });

        it('should get a 401 since no title is being sent', (done) => {
            let body = {
                week: "1",
                title: "",
                data: "report body"
            }
            chai.request(server)
                .post("/reports/add")
                .set("x-access-token", jwtToken)
                .send(body)
                .end((err, res) => {
                    res.status.should.equal(401);
                    res.body.errors.title.should.equal("Title missing");
                    done();
                });
        });

        it('should get a 401 since no report body is being sent', (done) => {
            let body = {
                week: "1",
                title: "title",
                data: ""
            }
            chai.request(server)
                .post("/reports/add")
                .set("x-access-token", jwtToken)
                .send(body)
                .end((err, res) => {
                    res.status.should.equal(401);
                    res.body.errors.title.should.equal("Report body missing");
                    done();
                });
        });

        it('should get a 500 since week number is not unique', (done) => {
            let body = {
                week: "1",
                title: "title",
                data: "report body"
            }
            chai.request(server)
                .post("/reports/add")
                .set("x-access-token", jwtToken)
                .send(body)
                .end((err, res) => {
                    res.status.should.equal(500);
                    res.body.errors.detail.should.equal("SQLITE_CONSTRAINT: UNIQUE constraint failed: reports.week");

                    done();
                });
        });

        it('should get a 201 Success', (done) => {
            let body = {
                week: "4",
                title: "title",
                data: "report body"
            }
            chai.request(server)
                .post("/reports/add")
                .set("x-access-token", jwtToken)
                .send(body)
                .end((err, res) => {
                    res.status.should.equal(201);
                    res.body.data.detail.should.equal("Report with week number 4 has been created");

                    done();
                });
        });
    });

    describe('POST /reports/edit', () => {
        before(() => {
            let user = {
                email: "admin",
                password: "test"
            };

            return new Promise((resolve) => {
                chai.request(server)
                    .post("/login")
                    .send(user)
                    .end((err, res) => {
                        jwtToken = res.body.data.token;
                        resolve();
                    });
            });
        });

        it('should get a 401 since no week number is being sent', (done) => {
            let body = {
                week: "",
                title: "title",
                data: "report body"
            }
            chai.request(server)
                .post("/reports/edit")
                .set("x-access-token", jwtToken)
                .send(body)
                .end((err, res) => {
                    res.status.should.equal(401);
                    res.body.errors.title.should.equal("Week number missing");
                    done();
                });
        });


        it('should get a 201 Success', (done) => {
            let body = {
                week: "2",
                title: "new title",
                data: "report body"
            }
            chai.request(server)
                .post("/reports/edit")
                .set("x-access-token", jwtToken)
                .send(body)
                .end((err, res) => {
                    res.status.should.equal(201);
                    res.body.data.detail.should.equal('Report with week number 2 has been updated')

                    done();
                });
        });
    });
});
