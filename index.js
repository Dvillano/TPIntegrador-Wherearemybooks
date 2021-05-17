const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'',
 database:''
})

connection.connect();
//se exporta la conexion a la base de datos para que sea una sola en todo el backend y 
//se pueda usar en los requests de cada categoria
exports.connection = connection;

const {categoriaGetById} = require('./routes/categoria')

app.use(express.urlencoded);

//Requests de persona

//fin de requests Persona


//Requests de Libro

//fin de requests delibro


//Requests de Categoria
app.get('/categoria/:id',categoriaGetById);
//fin de requests de categoria

app.listen(3000,()=>console.log('listening on port 3000'));