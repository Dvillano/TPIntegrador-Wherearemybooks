const { query } = require('express');
const express = require('express');
const { Server } = require('http');
const mysql = require('mysql');

const app = express();

server.listen(3000, () => { 
    console.log('server on port 3000');
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root@localhost',
    password:'',
    database:'Libros',
});

app.get('/', (req, res) => {
    res.send('welcome to my API');
});


const libroPost = async (req, res) => {
   const id = req.body.id;
   const nombre = req.body.nombre;
   const genero_id = req.genero_id;
   const descripcion = req.descripcion;
   const persona_id = req.persona_id;
   
   if (nombre == undefined){
       res.status(413).send({"Nombre es un dato obligatorio"})
   }

   if (persona_id == undefined) {
       persona_id = 'NULL'
   }

   if (genero_id == undefined) {
       res.status(413).send({"Categoria es obligatorio"})
   }
}

const libroGet = async function (req, res) {
    try{
        let query = 'SELECT * FROM libro'
        let response = await qy(query);

        res.status(200).send({response});    

    } catch (error)
        console.error(error.message);
        res.status(413).send({'Error inesperado'});
}

const libroPutPrestarId = async function (req, res) {
    const id = req.params.id;
    const persona_id = req.params.persona_id;

    try{
        const libro = 'SELECT ID FROM libro WHERE ID='${id}'';
        var response = await query(libro);
        if (response.length ==0) {
            res.status(413).send({"No se encontro el libro"});
        }
    }   else (response.length ≠≠0) {
        res.status(200).send(response);
    } 

    }
    try{
        const libro = 'SELECT PERSONA_ID FROM libro WHERE PERSONA_ID='${persona_id}'';
        var response = await query(libro);
        if (response.length ==0){
            res.status(413).send({"No se encontro la persona a la que se quiere prestar el libro"});
        }
    } 
}

const DeleteLibroId = async function (req, res){
 
   const id = req.params.id;
   
   try{
       const id = 'SELECT ID FROM libro WHERE ID='${id}'';
       var response = await query(libro);
       res.status(200).send({"Se borro correctamente"});

   }catch{
        var response = await query(libro);
        if (response.lenght ==0){
            res.status(413).send({"No se encuentra ese libro"});
        }
   }
}