const {connection} = require('../app');
const util = require('util');


const qy = util.promisify(connection.query).bind(connection);
/*toda la implementacion de los requests aca luego se agregan en index js*/



//conexion a base de datos importada de index



//crear una categoría
const categoriaPost = async (req, res) => {
    try{
        if (!req.body.genero) {
            throw new Error ('Falta enviar el genero');
        }

        let query = 'SELECT id FROM categoria WHERE genero = ?';

        let respuesta = await  qy(query, [req.body.genero.toUpperCase()]);

        if (respuesta.length > 0 ) {
            throw new Error ('¡Esa categoria ya existe!');
        };

        query = 'INSERT INTO categoria (genero) VALUE (?)';

        respuesta = await qy(query, [req.body.genero.toUpperCase()]);

        res.send({'respuesta': respuesta.insertId});
        
    }
    catch(e){
        console.error(e.message);
        res.status(413).send({'Error': e.message});
    }
};



//buscar todas las categorias
const categoriaGet = async (req, res) => {
    try{
        const query = 'SELECT * FROM categoria';

        const respuesta =  await qy(query);
        
        res.send({"Respuesta": respuesta});

    }
    catch(e){
        console.error(e.message);
        res.status(413).send({'Error': e.message});
    }
};



//buscar las categorías por ID
const categoriaGetById = async (req, res) => {
    try{
        let query = 'SELECT * FROM categoria WHERE id = ?';
        
        let respuesta =  await qy(query, [req.params.id]);

        if (respuesta.length == 0 ) {
            throw new Error ('Esa categoría no existe');
        };
        
        res.send({"Respuesta": respuesta});

    }
    catch(e){
        console.error(e.message);
        res.status(413).send({'Error': e.message});
    }
};



//actualizar categoria
const categoriaUpdate = async (req, res) => {
    try {
        if (!req.body.nombre) {
            throw new Error ('Falta enviar el nombre');

        let query = 'SELECT * FROM categoría WHERE nombre = ? AND id <>?';
        
        let respuesta = await qy (query, [req.body.nombre, req.params.id])
    
        if (respuesta.length > 0 ){
            throw new Error ('El nombre de la categoria que queres poner ahora ya existe')
    }
    query = 'UPDATE categoria SET nombre =? WHERE id = ?';

    respuesta = await qy (query [req.body.nombre, rec.params.id]);
    res.send({'respuesta': respuesta}); 
    }
    }
    catch(e) {
    console.error(e.message);
    res.status(413).send({"Error": e.message});
    }
});



//eliminar una categoria
const categoriaDeleteById = async (req, res) => {
    try {
        let query = 'SELECT * FROM libro WHERE categoria_id = ?';
        let respuesta = await qy (query, [req.params.id]);

        if (respuesta.length > 0 ) {
        throw new Error ('Esta categoría tiene productos asociados, no se puede borrar');
    }
        query =  'DELETE FROM categoria WHERE id = ?'; 
        respuesta = await qy (query [req.params.id]) ;
        res.send({'respuesta': respuesta});
    }
    catch(e) {
        console.error(e.message);
        res.status(413).send({"Error": e.message});
    }
});  
    


module.exports={
    categoriaPost,categoriaGet,categoriaGetById,categoriaUpdate, categoriaDeleteById
}
