const {connection} = require('../app');
const util = require('util');


const qy = util.promisify(connection.query).bind(connection);

// Funcion para validar mail
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// PERSONA
// POST
const categoriaPostPersona = async (req,res) => {
    try {

        let nombre = req.body.nombre.toUpperCase();
        let alias = req.body.alias.toUpperCase();
        let apellido = req.body.apellido.toUpperCase();
        let email = req.body.email.toUpperCase();

        // Validar que esten todos los campos
        if (!nombre || !alias || !apellido || !email){
            res.status(413).send('Faltan datos');
        }

        // Validar estructura del email
        if (validateEmail(email) == false){
            res.status(413).send('Mail invalido');
        }
    
        let query = 'SELECT id FROM persona WHERE email = ?'
        let respuesta = await qy(query, [email]);

        // Validar email repetido
        if (respuesta.length > 0) {
            throw new Error ('Ese email ya esta registrado');
        }

        //Guardo nueva persona
        query = 'INSERT INTO persona (nombre, alias, apellido, email) VALUE (?, ?, ?, ?)';
        respuesta = await qy(query, [nombre, alias, apellido, email]);

        console.log(respuesta);
        res.status(200).send({'respuesta': affectedRows});

    } catch (error) {
        console.error(error.message);
        res.status(413).send({"Error": error.message}); 
    }
}

module.exports={
    categoriaPostPersona
}