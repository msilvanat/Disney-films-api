const db = require('../db/database');
const {
    QueryTypes
} = require('sequelize');


// GET ALL MOVIES (LIST WITH IMAGE, TITLE AND RELEASE DATE), FILTERED OR SORTED BY RELEASE DATE
exports.getMovies = async (req, res) => {

    const { title, genre, order } = req.query;

    if (!title && !genre && !order) {
        db.query('SELECT movieImage, title, releaseDate FROM movies', {
            type: QueryTypes.SELECT
        })
            .then(movies => res.json(movies))
            .catch(error => res.status(500).json({
                error: "Server Internal Error",
                success: false
            }));
    }

    // FILTER BY TITLE
    if (title) {
        const movieTittle = '%' + title + '%'
        let response = await db.query('SELECT movieImage, title, releaseDate FROM movies WHERE title LIKE ?', {
            type: QueryTypes.SELECT,
            replacements: [movieTittle]
        })
        res.json({ response })
    }


    // FILTER BY GENRE
    if (genre) {
        let response = await db.query('SELECT movieImage, title, releaseDate FROM movies AS mo, genre_movie AS gm WHERE gm.genre_id = ? AND gm.movie_id = mo.movie_id', {
            type: QueryTypes.SELECT,
            replacements: [genre]
        })
        res.json({ response })
    }


    // SORT BY RELEASE DATE 
    if (order) {
        switch (order) {
            case 'ASC', 'DESC':
                break;
            default:
                order = 'ASC';
                break;
        }
        let response = await db.query(`SELECT movieImage, title, releaseDate FROM movies ORDER BY releaseDate ${order}`, {
            type: QueryTypes.SELECT
        })
        res.json({ response })
    }
};


// GET MOVIE DETAIL: RETURN ALL THE FIELDS AND THE CHARACTERS
exports.getMovieDetail = async (req, res) => {
    let id = req.params.movieId;
    console.log(req.params);

    let movieDetail = await db.query('SELECT * FROM movies WHERE movie_id = ?', {
        type: QueryTypes.SELECT,
        replacements: [id]
    })
    let movieCharacters = await db.query('SELECT ch.name,ch.charImage FROM cast AS ca, characters AS ch WHERE ca.movie_id = ? AND ca.character_id = ch.character_id', {
        type: QueryTypes.SELECT,
        replacements: [id]
    })
    res.json({ movieDetail, movieCharacters })
}


// CREATE MOVIE
exports.addNewMovie = (req, res) => {
    const movie = req.body;
    const { movieImage, title, releaseDate, score, cast } = req.body;

    db.query('INSERT INTO movies (movieImage, title, releaseDate, score, cast) VALUES (?, ?, ? ,? ,?)', {
        type: QueryTypes.INSERT,
        replacements: [movieImage, title, releaseDate, score, cast]
    })
        .then(() => {
            res.status(201).json({
                success: true,
                msg: "The movie was created successfully",
                movie: movie
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
};


// GET MOVIE BY ID
exports.getMovieById = (req, res) => {
    const { movieId } = req.params;

    db.query('SELECT * FROM movies WHERE movie_id = ?', {
        type: QueryTypes.SELECT,
        replacements: [movieId]
    })
        .then(movies => res.json(movies[0]))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};


// EDIT MOVIE
exports.editMovieById = (req, res) => {
    const movie = req.body;
    const { movieId } = req.params;
    const {
        movieImage,
        title,
        releaseDate,
        score,
        cast
    } = req.body;

    db.query('UPDATE movies SET movieImage = ?, title = ?, releaseDate = ?, score = ?, cast = ? WHERE movie_id = ?', {
        type: QueryTypes.UPDATE,
        replacements: [movieImage, title, releaseDate, score, cast, movieId]
    })
        .then(() => {
            res.status(200).json({
                success: true,
                msg: "The movie was updated successfully",
                movie: movie
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: 'Server internal error'
            });
        });
}


// DELETE MOVIE 
exports.deleteMovieById = (req, res) => {
    const {
        movieId
    } = req.params;

    db.query('DELETE FROM movies WHERE movie_id = ?', {
        type: QueryTypes.DELETE,
        replacements: [movieId]
    })
        .then(movies => res.json({
            success: true,
            msg: "The movie was deleted successfully"
        }))
        .catch(error => res.status(500).json({
            error: "Server Internal Error",
            success: false
        }));
};
























