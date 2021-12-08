const express = require('express');

const routes = express.Router();

const favoritesController = require('../controllers/favoritesController');

routes.get('/favorites', favoritesController.listaFavorites);

routes.post('/favorites', favoritesController.crearFilmFav);

routes.delete('/favorites/:filmID',favoritesController.eliminarFilmFav);

module.exports = routes;