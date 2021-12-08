const express = require('express');

const routes = express.Router();

const genresController = require('../controllers/genresController');

routes.get('/genres', genresController.listaGenres);

routes.post('/genres', genresController.crearGenero);

routes.delete('/genres/:genID',genresController.eliminarGenero);

module.exports = routes;