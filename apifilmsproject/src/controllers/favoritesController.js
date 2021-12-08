const connection = require('../config/connection');

function listaFavorites(req, res){
    if(connection){

        let query = `SELECT 
                            favorites.favID,
                            film.filmName, film.filmDirector, film.filmType, film.filmYear, 
                            genre.genID, genre.genName
                     FROM favorites
                     INNER JOIN film ON film.filmID = favorites.filmID
                     INNER JOIN genre ON genre.genID = film.genID `;
        
        connection.query(query, (err, favoritos) => {
            if(err){
                res.status(400).json(err);
            }else{
                res.json(favoritos);
            }
        })
    }
}

function crearFilmFav(req, res) {
    if(connection){
        const favoritos = req.body;
 
        if(!favoritos.filmID){
            return res.status(400).json({error: true, mensaje: "El id es obligatorio"});
        }

        let sql = "INSERT INTO favorites set ?";
        connection.query(sql, [favoritos], (err, rows) => {
            if(err){
                res.status(400).json(err);
            } else {
                res.json({error: false, data: rows, mensaje: "Film agregado con exito a favoritos."});
            }
        });
    }
}

function eliminarFilmFav(req, res) {
    if(connection){
        const {filmID} = req.params;
        let sql = "DELETE FROM favorites where filmID = ?";
        connection.query(sql, [filmID], (err, rows) => {
            if(err) {
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(rows.affectedRows === 0) mensaje = "Film no encontrado";
                else mensaje = "Film eliminado con exito de favoritos."
                res.json({error: false, data: rows, mensaje});
            }
        });
    }
}

module.exports = {
    listaFavorites,
    crearFilmFav,
    eliminarFilmFav
}