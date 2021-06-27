var request = require('supertest');
const assert = require('chai').assert;

// add describe.skip when you want to test another service 
describe('REGISTER USER/ LOGIN', function () {

    // Please change the following values each time
    const createUsername = 'silvanitat230';
    const createEmail = 'silvanita230@yopmail.com';
    const createDiferentUsername = 'silvanitat88';
    const createDiferentEmail = 'silvanita786@yopmail.com';

    it('Create User works', function (done) {
        request("http://localhost:3000")
            .post("/users/register")
            .send({
                "username": createUsername,
                "password": "silvanita123",
                "fullname": "Silvana Martinez",
                "email": createEmail
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(
                {
                    "success": true,
                    "msg": "User created successfully, check your email!"
                }
            )
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it('Get error on try to use an username that already exists.', function (done) {
        request("http://localhost:3000")
            .post("/users/register")
            .send({
                "username": createUsername,
                "password": "silvanita123",
                "fullname": "Silvana Martinez",
                "email": createDiferentEmail
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(409)
            .expect({
                success: false,
                error: 'Username already exists'
            })
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it('Get error on try to use an email that is already registered.', function (done) {
        request("http://localhost:3000")
            .post("/users/register")
            .send({
                "username": createDiferentUsername,
                "password": "silvanita123",
                "fullname": "Silvana Martinez",
                "email": createEmail
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(409)
            .expect({
                success: false,
                error: 'Mail already exists'
            })
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });



    it('Get when the body has an invalid format. Username missing.', function (done) {
        request("http://localhost:3000")
            .post("/users/register")
            .send({
                "password": "silvanita123",
                "fullname": "Silvana Martinez",
                "email": createDiferentEmail
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function (response) {
                assert.equal(response.statusCode, 422, 'Valid Error Code');
                const responseBodyRaw = response.text;
                const responseBodyJson = JSON.parse(responseBodyRaw);

                assert.isBoolean(responseBodyJson.success);
                assert.isNotTrue(responseBodyJson.success, 'Create process fail.');

                assert.exists(responseBodyJson.error, 'An error has ocurred.');
                assert.include(responseBodyJson.error, 'semantic errors');

                assert.exists(responseBodyJson.schemaExample);
                assert.hasAllKeys(responseBodyJson.schemaExample, ['username', 'password', 'fullname', 'email']);
            })
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    
    it('Login User works', function (done) {
        request("http://localhost:3000")
            .post("/users/login")
            .send({
                "username": createUsername,
                "password": "silvanita123",
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

  

});




