process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");
const db = require("../db/database.js");

chai.should();

chai.use(chaiHttp);

describe('auth', () => {
    describe('POST /login', () => {
        it('should return 401 since email is missing in request', (done) => {
            let user = {
                email: "",
                password: "test"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(401);

                    done();
                });
        });

        it('should return 401 since password is missing in request', (done) => {
            let user = {
                email: "admin",
                password: ""
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(401);

                    done();
                });
        });

        it('should return 401 since email cant be found', (done) => {
            let user = {
                email: "notauser",
                password: "test"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(401);

                    done();
                });
        });

        it('should return 401 since email cant be found', (done) => {
            let user = {
                email: "admin",
                password: "wrong password"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(401);
                    res.body.errors.title.should.equal("Incorrect password" );

                    done();
                });
        });


        it('should return 200 and jwtToken', (done) => {
            let user = {
                email: "admin",
                password: "test"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.data.user.should.equal(user.email);
                    res.body.data.token.should.be.an('string');

                    done();
                });
        });
    });


    describe('POST /register', () => {
        it('should return 401 since email is missing in request', (done) => {
            let user = {
                email: "",
                password: "pass"
            };
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(401);
                    res.body.errors.title.should.equal("Email missing");

                    done();
                });
        });

        it('should return 401 since password is missing in request', (done) => {
            let user = {
                email: "email",
                password: ""
            };
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(401);
                    res.body.errors.title.should.equal("Password missing");

                    done();
                });
        });

        it('should return 500 since username already exists', (done) => {
            let user = {
                email: "admin",
                password: "pass"
            };
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(500);
                    res.body.errors.title.should.equal("Database error");

                    done();
                });
        });

        it('should return 201', (done) => {
            let user = {
                email: "email",
                password: "pass"
            };
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.status.should.equal(201);
                    res.body.data.title.should.equal("User successfully created");

                    done();
                });
        });
    });
});
