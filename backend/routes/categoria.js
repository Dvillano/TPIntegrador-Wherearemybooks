const {connection} = require('../app');
const util = require('util');

const qy = util.promisify(connection.query).bind(connection);

const categoriaPost = async (req, res) => {
    try{
        if (!req.body.genero) {
            throw new Error ('Falta enviar el genero');
        }

        const categoria = req.body.genero.toUpperCase();

        let consulta = await  qy ('SELECT id FROM categoria WHERE genero = ?',[categoria]);

            if (consulta.length > 0 ) {
                throw new Error ('¡Esa categoria ya existe!');
            };

        const query = 'INSERT INTO categoria (genero) VALUE (?)';

        const respuesta = await qy(query, [categoria]);

        res.status(200).send({'Respuesta': respuesta.insertId});
        console.log(respuesta)
    }
    catch(e){
        console.error(e.message);
        res.status(413).send({'Error': e.message});
    }
};

const categoriaGet = async (req, res) => {
    try{
        const query = 'SELECT * FROM categoria';

        const respuesta =  await qy(query);
            if (respuesta.length == 0){
                throw new Error ('No hay categorias cargadas');
            }
        res.status(200).send({respuesta});
    }
    catch(e){
        console.error(e.message);
        res.status(413).send({'Error': e.message});
    }
};


const categoriaGetById = async (req, res) => {
    try{
        let query = 'SELECT * FROM categoria WHERE id = ?';
        
        let respuesta =  await qy(query, [req.params.id]);

            if (respuesta.length == 0 ) {
                throw new Error ('Categoría no encontrada');
            };
        
        res.status(200).send({respuesta});

    }
    catch(e){
        console.error(e.message);
        res.status(413).send({'Error': e.message});
    }
};


const categoriaDeleteById = async (req, res) => {
    try {
        
        let consultaGeneroID = await qy('SELECT * FROM categoria WHERE id = ?', [req.params.id]);

            if(consultaGeneroID.length == 0){
                throw new Error ('No existe genero con el ID indicado')
            } 
        
        let query = 'SELECT * FROM libro WHERE genero_id = ?';
        let respuesta = await qy (query, [req.params.id]);

            if (respuesta.length > 0 ) {
                throw new Error ('Esta categoría tiene productos asociados, no se puede borrar');
            }
        
        query =  'DELETE FROM categoria WHERE id = ?'; 
        respuesta = await qy (query, [req.params.id]) ;
        res.status(200).send({'respuesta': respuesta.affectedRows});
    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"Error": e.message});
    }
};  
    


module.exports={
    categoriaPost,categoriaGet,categoriaGetById, categoriaDeleteById
}
