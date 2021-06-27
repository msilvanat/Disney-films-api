const db = require("../db/database");
const {
    QueryTypes
} = require("sequelize");


exports.validateMovieScore = (req, res, next) => {
    const {
        score
    } = req.body;

    if ( score <= 5 && score > 0 ) {
        next();
    } else {
        res.status(422).json({
            success: false,
            error: "Score has to be from 1 to 5"
        });
    }
};


exports.movieBody = (req, res, next) => {
    const {
        movieImage,
        title,
        releaseDate,
        score,
        cast
    } = req.body;

    if (movieImage && title && releaseDate && score && cast) {
        next();
    } else {    
        res.status(422).json({
            success: false,
            error: "The body request has semantic errors",
            schemaExample: {
                "movieImage": "https://i.pinimg.com/originals/47/25/e6/4725e6abf4ba15d25fb20b6f0131fb9d.png",
                "title": "Moana, a sea of adventures",
                "releaseDate": "2016-04-25 18:31:38",
                "score": 5,
                "cast": 7
            }
        });
    }
};


exports.movieTitleExists = (req, res, next) => {
    const {
        title
    } = req.body;

    db.query('SELECT * FROM movies WHERE title = ?', {
        type: QueryTypes.SELECT,
        replacements: [title]
    })
        .then(result => {
            const title = result[0];

            if (title) {
                res.status(409).json({
                    success: false,
                    error: "Movie title already exists"
                });
            } else {
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};


exports.validateMovieId = (req, res, next) => {
    const { movieId } = req.params;

    db.query('SELECT * FROM movies WHERE movie_id = ?', {
        type: QueryTypes.SELECT,
        replacements: [movieId]
    })
        .then(result => {
            const movie = result[0];

            if (!movie) {
                res.status(409).json({
                    success: false,
                    error: "The movie required by id doesn't exist"
                });
            } else {
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};














