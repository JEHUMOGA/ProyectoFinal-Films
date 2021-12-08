const express = require('express');

const routes = express.Router();

const filmController = require('../controllers/filmController');

routes.get('/films', filmController.listaFilms);

routes.get('/films/:filmID', filmController.obtenerFilm);

routes.post('/films', filmController.crearFilm);

routes.put('/films/:filmID', filmController.editarFilm);

routes.delete('/films/:filmID',filmController.eliminarFilm);

module.exports = routes;