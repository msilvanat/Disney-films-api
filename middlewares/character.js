const db = require("../db/database");
const {
    QueryTypes
} = require("sequelize");


exports.characterBody = (req, res, next) => {
    const {
        charImage,
        name,
        age,
        weight,
        history
    } = req.body;

    if (charImage && name && age && weight && history) {
        next();
    } else {
        res.status(422).json({
            success: false,
            error: "The body request has semantic errors",
            schemaExample: {
                "charImage": "https://i.pinimg.com/originals/47/25/e6/4725e6abf4ba15d25fb20b6f0131fb9d.png",
                "name": "Moana",
                "age": 16,
                "weight": 50,
                "history": "Sixteen-year-old Moana Waialiki, daughter of a chief of a long line of navigators, sets sail for an island with a powerful demigod to help save her family from annihilation"
            }
        });
    }
};


exports.characterNameExists = (req, res, next) => {
    const {
        name
    } = req.body;

    db.query('SELECT * FROM characters WHERE name = ?', {
        type: QueryTypes.SELECT,
        replacements: [name]
    })
        .then(result => {
            const character = result[0];

            if (character) {
                res.status(409).json({
                    success: false,
                    error: "Character name already exists"
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


exports.validateCharacterId = (req, res, next) => {
    const { characterId } = req.params;

    console.log('getCharacterById');

    db.query('SELECT * FROM characters WHERE character_id = ?', {
        type: QueryTypes.SELECT,
        replacements: [characterId]
    })
        .then(result => {
            const character = result[0];

            if (!character) {
                res.status(409).json({
                    success: false,
                    error: "The character required by id doesn't exist"
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
