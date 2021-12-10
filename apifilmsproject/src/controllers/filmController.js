const connection = require('../config/connection');

function listaFilms(req, res){
    if(connection){

        let query = `SELECT 
                            film.filmID, film.filmName, film.filmDirector, film.filmDescription, film.filmType, film.filmYear, film.filmReview, film.filmScore,
                            genre.genID, genre.genName,
                            favorites.favID
                    FROM film 
                    INNER JOIN genre ON genre.genID = film.genID
                    LEFT JOIN favorites ON favorites.filmID = film.filmID`;
        
        connection.query(query, (err, films) => {
            if(err){
                res.status(400).json(err);
            }else{
                res.json(films);
            }
        });
    }
}

function obtenerFilm(req, res) {
    if(connection) {
        const filmID = req.params.filmID;
        
        let sql = `SELECT 
                            film.filmID, film.filmName, film.filmDirector, film.filmDescription,film.filmType, film.filmYear, film.filmReview, film.filmScore,
                            genre.genID, genre.genName,
                            favorites.favID
                   FROM film
                   INNER JOIN genre ON genre.genID = film.genID
                   LEFT JOIN favorites ON favorites.filmID = film.filmID
                   WHERE film.filmID = ${connection.escape(filmID)}`;

        connection.query(sql, (err, film) => {
            if(err){
                res.status(400).json(err);
            } else {
                let mensaje = ""
                if(film === undefined || film.length === 0)
                    mensaje = "Film no encontrado"
                res.json({data: film[0], mensaje});
            }
        });
    }
}

function obtenerFilmAleatorio(req, res) {
    if (connection) {
        let query = `SELECT 
                    film.filmID, film.filmName, film.filmDirector, film.filmType, film.filmYear, 
                    genre.genID, genre.genName,
                    favorites.favID
                    FROM film 
                    INNER JOIN genre ON genre.genID = film.genID
                    LEFT JOIN favorites ON favorites.filmID = film.filmID
                    ORDER BY RAND()
                    LIMIT 1`;

        connection.query(query, (err, films) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.json(films);
            }
        });
    }
}

function crearFilm(req, res) {
    if(connection){
        const film = req.body;
 
        if(!film.filmName){
            return res.status(400).json({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(film.filmName.length > 80){
            return res.status(400).json({error: true, mensaje: "El nombre debe de ser de 80 caracteres o menos."});
        }

        if(!film.filmDirector){
            return res.status(400).json({error: true, mensaje: "El director es obligatorio"});
        }

        if(film.filmDirector.length > 60){
            return res.status(400).json({error: true, mensaje: "El director debe de ser de 60 caracteres o menos."});
        }

        if(!film.genID){
            return res.status(400).json({error: true, mensaje: "El genero es obligatorio"});
        }

        if(!film.filmType){
            return res.status(400).json({error: true, mensaje: "El tipo es obligatorio"});
        }

        if(!film.filmYear){
            return res.status(400).json({error: true, mensaje: "El año es obligatorio"});
        }

        if(film.filmYear.length != 4){
            return res.status(400).json({error: true, mensaje: "El año debe ser de 4 digitos."});
        }

        let sql = "INSERT INTO film set ?";
        connection.query(sql, [film], (err, rows) => {
            if(err){
                res.status(400).json(err);
            } else {
                res.json({error: false, data: rows, mensaje: "Film agregado con exito."});
            }
        });
    }
}

function editarFilm(req, res){
    if(connection) {
        const {filmID} = req.params;
        const film = req.body;

        if(film.filmDescription.length > 200){
            return res.status(400).json({error: true, mensaje: "La descripción debe ser de 200 caracteres o menos."});
        }
        if(!film.filmType){
            return res.status(400).json({error: true, mensaje: "El tipo es obligatoria"});
        }

        if(!film.filmYear){
            return res.status(400).json({error: true, mensaje: "El año es obligatorio."});
        }
        if(film.filmYear.length != 4){
            return res.status(400).json({error: true, mensaje: "El año debe ser de 4 digitos."});
        }

        if(film.filmReview.length > 500){
            return res.status(400).json({error: true, mensaje: "La review debe ser de 500 caracteres o menos."});
        }
        /*
        if(film.filmScore.length != 1){
            return res.status(400).json({error: true, mensaje: "El score debe ser de 1 caracter."});
        }
        */
        let sql = "UPDATE film set ? WHERE filmID = ?";
        connection.query(sql, [film, filmID], (err, rows) => {
            if(err) {
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(rows.changedRows === 0) mensaje = "La información es la misma.";
                else mensaje = "Film actualizada con exito.";
                res.json({error: false, data: rows, mensaje});
            }
        });
    }
}

function eliminarFilm(req, res) {
    if(connection){
        const {filmID} = req.params;
        let sql = "DELETE FROM film where filmID = ?";
        connection.query(sql, [filmID], (err, rows) => {
            if(err) {
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(rows.affectedRows === 0) mensaje = "Film no encontrado";
                else mensaje = "Film eliminado con exito."
                res.json({error: false, data: rows, mensaje});
            }
        });
    }
}

module.exports = {
    listaFilms,
    obtenerFilm,
    crearFilm,
    editarFilm,
    eliminarFilm,
    obtenerFilmAleatorio
}