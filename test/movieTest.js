var request = require('supertest');
const assert = require('chai').assert;


describe('MOVIES', function () {

    it('Get error on try to create a movie without authorization.', function (done) {
        request("http://localhost:3000")
            .post("/movies")
            .send({
                "movieImage": "https://i.pinimg.com/originals/47/25/e6/4725e6abf4ba15d25fb20b6f0131fb9d.png",
                "title": "Moana, a sea of adventures",
                "releaseDate": "2016-04-25 18:31:38",
                "score": 5,
                "cast": 7
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({
                success: false,
                error: 'A token must be provided'
            })
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it('Get on error on try to list all movies', (done) => {
        request("http://localhost:3000")
            .get("/movies")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });


    });




});