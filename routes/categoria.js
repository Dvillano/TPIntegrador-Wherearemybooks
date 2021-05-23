const {connection} = require('../index');
const util = require('util');


const qy = util.promisify(connection.query).bind(connection);
/*toda la implementacion de los requests aca luego se agregan en index js*/

//querys a utilizar en las funciones
const qyCategoria = 'SELECT * FROM categoria';
const qyCategoriaID = 'SELECT genero FROM categoria WHERE id = ?';
const qyCreatCategoria = 'INSERT INTO categoria VALUES (?, ?)';
const qyDeleteCategoria = 'DELET FROM categoria WHERE id = ?';

//conexion a base de datos importada de index


//crear una categoría
const categoriaPost = async (req, res) => {

}

//buscar todas las categorias
const categoriaGet = async (req, res) => {
    try{
        let query = 'SELECT * FROM categoria';
        
        let respuesta =  await qy(query);
        console.log(respuesta);
        res.send({"Respuesta": respuesta});

    }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Error": e.message});
    }
};


//buscar las categorías por ID
const categoriaGetById = async (req, res) => {
    try{
        let query = 'SELECT * FROM categoria WHERE id = ?';
        
        const respuesta =  await qy(query, [req.params.id]);
        
        res.send({"Respuesta": respuesta});

    }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Error": e.message});
    }
};



//eliminar una categoria
const categoriaDeleteById = async (req, res) => {

}

module.exports={
    categoriaPost,categoriaGet,categoriaGetById,categoriaDeleteById
}