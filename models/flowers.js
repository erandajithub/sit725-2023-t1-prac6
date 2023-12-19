const { ObjectId } = require('mongodb');
let client = require('../dbConnection');
let collection = client.db().collection('Flowers');



function postCat(cat, callback) {
    // Check if imagePath already exists
    collection.findOne({ path: cat.path }, (err, existingCat) => {
        if (err) {
            callback(err, null);
        } else if (existingCat) {
            // imagePath already exists
            const error = new Error('Image path already exists');
            callback(error, null);
        } else {
            // insert
            collection.insertOne(cat, callback);
        }
    });
}


function getAllCats(callback) {
    collection.find({}).toArray(callback);
}

const deleteCatById = (catId, callback) => {
    const objectId = new ObjectId(catId);
    collection.deleteOne({ _id: objectId }, (err, result) => {
        if (!err) {
            callback(null, { statusCode: 200, data: result, message: 'success' });
        } else {
            callback(err); // Handle error case
        }
    });
};


module.exports = { postCat, getAllCats, deleteCatById };
