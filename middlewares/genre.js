const db = require("../db/database");
const {
    QueryTypes
} = require("sequelize");


exports.genreBody = (req, res, next) => {
    const {
        name,
        image,
        movies
    } = req.body;

    if (name && image && movies) {
        next();
    } else {
        res.status(422).json({
            success: false,
            error: "The body request has semantic errors",
            schemaExample: {
                "name": "Comedy",
                "image": "https://i.pinimg.com/originals/47/25/e6/4725e6abf4ba15d25fb20b6f0131fb9d.png",
                "movies": 5 
            }
        });
    }
};


exports.genreNameExists = (req, res, next) => {
    const {
        name
    } = req.body;

    db.query('SELECT * FROM genre WHERE name = ?', {
        type: QueryTypes.SELECT,
        replacements: [name]
    })
        .then(result => {
            const genre = result[0];

            if (genre) {
                res.status(409).json({
                    success: false,
                    error: "Genre name already exists"
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


exports.validateGenreId = (req, res, next) => {
    const { genreId } = req.params;

    db.query('SELECT * FROM genre WHERE genre_id = ?', {
        type: QueryTypes.SELECT,
        replacements: [genreId]
    })
        .then(result => {
            const genre = result[0];

            if (!genre) {
                res.status(409).json({
                    success: false,
                    error: "The genre required by id doesn't exist"
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
