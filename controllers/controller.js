let collection = require('../models/flowers');

// In your controller file

const postCat = (req, res) => {
    let cat = req.body;
    collection.postCat(cat, (err, result) => {
        if (err) {
            if (err.message === 'Image path already exists') {
                res.status(400).json({ statusCode: 400, message: 'Image path already exists' });
            } else {
                res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
            }
        } else {
            res.status(201).json({ statusCode: 201, data: result, message: 'success' });
        }
    });
}


const getAllCats = (req, res) => {
    collection.getAllCats((error, result) => {
        if (!error) {
            res.json({ statusCode: 200, data: result, message: 'success' });
        }
    });
}

const deleteCatById = (req, res) => {
    const catId = req.params.id;
    collection.deleteCatById(catId, (err, result) => {
        if (err) {
            res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
        } else if (!result || result.deletedCount === 0) {
            res.status(404).json({ statusCode: 404, message: 'Cat not found' });
        } else {
            res.status(200).json({ statusCode: 200, data: result, message: 'success' });
        }
    });
};

module.exports = { postCat, getAllCats, deleteCatById };
