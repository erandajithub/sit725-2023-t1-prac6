let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/', function (req, res) {
    controller.postCat(req, res);
});

router.get('/', (req, res) => {
    controller.getAllCats(req, res);
});

// router.delete('/:id', (req, res) => {
//     const catId = req.params.id;

//     if (!catId) {
//         return res.status(400).json({ error: catId });
//     }

//     controller.deleteCatById(catId, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             res.status(200).json(result);
//         }
//     });
// });

router.delete('/:id', controller.deleteCatById);



module.exports = router;
