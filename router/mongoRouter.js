const express = require('express');
const router = express.Router();
let { mongoController } = require('../controller');
let {
    getMovies,
    addMovies,
    editMovies,
    deleteMovies
} = mongoController

router.get('/get-mongo', getMovies);
router.post('/add-mongo', addMovies);
router.patch('/edit-mongo/:id', editMovies);
router.delete('/delete-mongo/:id', deleteMovies);

module.exports = router;