const {connection} = require('../app');
const util = require('util');
const { Console } = require('console');
const query = util.promisify(connection.query).bind(connection);


const libroPost = async function (req, res) {
    const name = req.body.name
    const description = req.body.description
    const categoria_id = req.body.categoria_id;
    var persona_id = req.body.persona_id;

    try {
        //Validacion de datos
        if (name == undefined || categoria_id == undefined) {
            res.status(413).send({
                msg: "Nombre y categoria son datos obligatorios"
            });
        }

        if (name == undefined) {
            res.status(413).send({
                msg: "Nombre es un dato obligatorio"
            });
        }
        if (categoria_id == undefined) {
            res.status(413).send({
                msg: "Categoria es un dato obligatorio"
            });
        }
        if (persona_id == undefined) {
            persona_id = 'NULL'
        }

        //Si el libro esta prestado a alguien
        if (persona_id !== 'NULL') {
            const personaquery = `SELECT ID FROM persona WHERE ID='${persona_id}'`;

            var response = await query(personaquery);

            if (response.length == 0) {
                res.status(413).send({
                    msg: "la persona indicada no existe"
                });
            }
        }

       //Validacion de categoria
        const categoriaQuery = `SELECT ID FROM categoria WHERE ID='${categoria_id}'`
        response = await query(categoriaQuery);

        if (response.length == 0) {
            res.status(413).send({
                msg: "La categoria indicada no existe"
            });
        }

        //Validacion de libro
        const libroquery = `SELECT titulo FROM libro WHERE titulo='${name}'`;
        response = await query(libroquery);
        if (response.length > 0) {
            res.status(413).send({
                msg: "El libro ya existe"
            })
        }

        //Post nuevo libro
        const postquery = `INSERT INTO libro (titulo,descripcion,genero_id,persona_id) VALUES ('${name}','${description}','${categoria_id}',${persona_id})`
        response = await query(postquery);
        res.status(200).send(response);
    } catch (error) {
        res.status(413).send(`Error inesperado ${error}`)
    }
}

const libroGetId = async function (req, res) {

    const id = req.params.id;
    try {
        //Buscar libro devolver error en caso de que no exista
        const getquery = `SELECT * FROM libro WHERE ID=${id}`;
        var response = await query(getquery);
        if (response.length == 0) {
            res.status(413).send({
                msg: "no se encuentra ese libro"
            })
        } else
            res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(413).send({
            msg: `Error inesperado: ${error}`
        });
    }

}

const libroPutId = async function (req, res) {

    const id = req.params.id;
    const description = req.body.description;

    try {
        //Validacion de libro
        const libroquery = `SELECT ID FROM libro WHERE ID='${id}'`;
        var response = await query(libroquery);
        if (response.length == 0) {
            res.status(413).send({
                msg: "El libro que intenta actualizar no existe"
            });
        }

        //Update libro
        const updateQuery = `UPDATE libro SET descripcion='${description}' WHERE ID='${id}'`;
        response = await query(updateQuery);
        res.status(200).send(response);
    } catch (error) {
        console.log(error)
        res.status(413).send({
            msg: 'Error inesperado'
        })
    }
}

const libroPutDevolver = async function (req, res) {
    const id = req.params.id;
    try {
        //Validacion de libro
        const libroquery = `SELECT ID FROM libro WHERE ID='${id}'`
        var response = await (libroquery);
        if (response.length == 0) {
            res.status(413).send({
                msg: "El libro no existe"
            })
        }

       //Validar que ese libro este prestado
        const personaquery = `SELECT persona_id FROM libro WHERE ID='${id}'`;
        response = await query(personaquery);
        console.log(response[0].persona_id);
        if (response[0].persona_id == null) {
            res.status(413).send({
                msg: "ese libro no estaba prestado"
            })
        }

        //Devolver libro
        const updateQuery = `UPDATE libro SET persona_id=NULL WHERE ID ='${id}'`;
        response = await query(updateQuery);
        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(413).send({
            msg: "Error inesperado"
        })
    }


}

 
 const libroGet = async function (req, res) {
     try{
         let queryLibro = 'SELECT * FROM libro'
         let response = await query(queryLibro);
 
         res.status(200).send({response});    
 
     } catch (error){
         console.error(error.message);
         res.status(413).send({mensaje: 'Error inesperado'});}
 }
 
 const libroPutPrestarId = async function (req, res) {
     const id = req.params.id;
     const persona_id = req.body.persona_id;
 
     try{
         const libro = `SELECT persona_id FROM libro WHERE ID='${id}'`;
         var response = await query(libro);
         console.log (response)
         if (response.length ==0) {
             res.status(413).send({mensaje: "No se encontro el libro"});
         }
         else if (response[0].persona_id!=='NULL') {
             res.status(413).send({mensaje: "El libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva"});
         }
 
         const persona = `SELECT ID FROM persona WHERE ID='${persona_id}'`;
         response = await query(persona);
         if (response.length ==0){
             res.status(413).send({mensaje: "No se encontro la persona a la que se quiere prestar el libro"});
         }
         else {
             const prestar = `UPDATE libro SET PERSONA_ID ='${persona_id}' WHERE ID='${id}'`;
             response = await query(prestar);
             res.status(200).send({mensaje: "Se presto correctamente"});
         }
     } catch (error){
         console.error(error.message);
         res.status(413).send({message: 'Error inesperado'});}
 
     }
 
 
 const DeleteLibroId = async function (req, res){
  
    const id = req.params.id;
    
    try{
        const libro = `SELECT persona_id FROM libro WHERE ID='${id}'`;
         var response = await query(libro);
         if (response.length ==0) {
             res.status(413).send({mensaje: "No se encuentra ese libro"});
         }
         else if (response[0].persona_id !=='NULL') {
             res.status(413).send({mensaje: "Ese libro esta prestado no se puede borrar"});
         }
         else {
            const idQuery = `DELETE FROM libro WHERE ID='${id}'`;
            response = await query(idQuery);
            res.status(200).send({mensaje: "Se borro correctamente"});
         }

        
    }catch (error){
        console.error(error.message);
             res.status(413).send({mensaje: "Error inesperado"});
         }
    }
 


module.exports = {
    libroPost,
    libroGetId,
    libroPutId,
    libroPutDevolver,
    DeleteLibroId,
    libroPutPrestarId,
    libroGet

}