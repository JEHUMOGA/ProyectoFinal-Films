const mysql = require('mysql');

const objectConnection = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "J3humog@.6",
    "database": "FILMS"
}

const myConn = mysql.createConnection(objectConnection);

myConn.connect((error) => {
  if(error) {
      console.log("error: ", error);
  } else {
      console.log("Base de datos conectada");
  }
});

module.exports = myConn;