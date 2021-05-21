const express = require('express');
const app = express();
const mysql = require('mysql');
const {categoriaGetById} = require('./routes/categoria')

const connection = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'',
 database:'libreria'
})

connection.connect();
//se exporta la conexion a la base de datos para que sea una sola en todo el backend y 
//se pueda usar en los requests de cada categoria
exports.connection = connection;



app.use(express.urlencoded);

//Requests de persona

//fin de requests Persona


//Requests de Libro

//fin de requests de libro


//Requests de Categoria
app.get('/categoria/:id',categoriaGetById);
//fin de requests de categoria

app.listen(3000,()=>console.log('listening on port 3000'));