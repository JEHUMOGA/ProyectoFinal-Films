const connection = require('../config/connection');

function listaGenres(req, res){
    if(connection){

        let query = "SELECT * FROM genre ";
        
        connection.query(query, (err, generos) => {
            if(err){
                res.status(400).json(err);
            }else{
                res.json(generos);
            }
        })
    }
}

function crearGenero(req, res) {
    if(connection){
        const genero = req.body;
 
        if(!genero.genName){
            return res.status(400).json({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(genero.genName.length > 40){
            return res.status(400).json({error: true, mensaje: "El nombre debe de ser de 40 caracteres o menos."});
        }

        let sql = "INSERT INTO genre set ?";
        connection.query(sql, [genero], (err, rows) => {
            if(err){
                res.status(400).json(err);
            } else {
                res.json({error: false, data: rows, mensaje: "Genero agregado con exito."});
            }
        });
    }
}

function eliminarGenero(req, res) {
    if(connection){
        const {genID} = req.params;
        let sql = "DELETE FROM genre where genID = ?";
        connection.query(sql, [genID], (err, rows) => {
            if(err) {
                res.status(400).json(err);
            } else {
                let mensaje = "";
                if(rows.affectedRows === 0) mensaje = "Genero no encontrado";
                else mensaje = "Genero eliminado con exito."
                res.json({error: false, data: rows, mensaje});
            }
        });
    }
}

module.exports = {
    listaGenres,
    crearGenero,
    eliminarGenero
}