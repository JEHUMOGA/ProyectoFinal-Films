const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use(cors());


app.set('port', process.env.PORT || 3000);


app.get('/',(req,res) =>{res.json({mensaje:"Holaatodos"})});

require('./config/connection');

app.use(require('./routes/genresRoute'));
app.use(require('./routes/filmRoute'));
app.use(require('./routes/favoritesRoute'));

app.listen(app.get('port'), (error) => {
    if(error) {
        console.log("Ha ocurrido un error: ", error);
    } else {
        console.log("Servidor en puerto: ", app.get('port'));
    }
});