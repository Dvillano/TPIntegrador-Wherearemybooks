const express = require('express');
const app = express();
const mysql = require('mysql');


app.use(express.json());
app.use(express.urlencoded());

// Conexion a DB
const connection = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'',
 database:'libreria'
})

// Verificar conexion a DB
connection.connect( (error) => {
    if (error){
        throw error;
    }
    console.log('Conexion con la base de datos establecida');
});


//se exporta la conexion a la base de datos para que sea una sola en todo el backend y 
//se pueda usar en los requests de cada categoria
exports.connection = connection;


//Rutas importadas 
const {categoriaGetById} = require('./routes/categoria')
const {categoriaPostPersona, categoriaGetPersona} = require('./routes/persona')

const {libroGetId,libroPost,libroPutDevolver, libroPutId} = require('./routes/libro');


//Requests de persona:
app.post('/persona', categoriaPostPersona);
app.get('/persona', categoriaGetPersona);
//fin de requests Persona


//Requests de Libro
app.post('/libro',libroPost);
app.get('/libro/:id',libroGetId);
app.put('/libro/devolver/:id',libroPutDevolver);
app.put('/libro/:id',libroPutId);
//fin de requests de libro


//Requests de Categoria
//app.get('/categoria/:id',categoriaGetById);
//fin de requests de categoria

app.listen(3000,()=>console.log('listening on port 3000'));

