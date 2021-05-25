const express = require('express');
const app = express();
const mysql = require('mysql');


app.use(express.json());

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
const {categoriaPost,categoriaGet,categoriaGetById,categoriaUpdate, categoriaDeleteById} = require('./routes/categoria')
const {categoriaPostPersona, categoriaGetPersona} = require('./routes/persona')


//Requests de persona:
app.post('/persona', categoriaPostPersona);
app.get('/persona', categoriaGetPersona);
//fin de requests Persona


//Requests de Libro

//fin de requests de libro


//Requests de Categoria
app.post('/categoria',categoriaPost);
app.get('/categoria',categoriaGet);
app.get('/categoria/:id',categoriaGetById);
app.put('/categoria',categoriaUpdate);
app.delete('/categoria/:id', categoriaDeleteById);
//fin de requests de categoria

app.listen(3000,()=>console.log('listening on port 3000'));

