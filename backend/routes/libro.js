const { connection } = require("../app");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

const libroPost = async function (req, res) {

 if(!req.body.nombre || !req.body.genero_id || !req.body.descripcion){
   res.status(413).send({mensaje:"No se enviaron todos los datos necesarios"})
 }
   //Validacion de datos
   if (req.body.nombre == "" || req.body.genero_id == "") {
    res.status(413).send({mensaje:"Nombre y genero son datos obligatorios"});
  }
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const genero_id = req.body.genero_id;
  var persona_id;

  if (req.body.persona_id == undefined || req.body.persona_id == "") {
    persona_id = null;
  }else{
    persona_id =req.body.persona_id
  }

  try{
    //Validar existencia de persona
    if (persona_id !== null) {

      const personaquery = 'SELECT ID FROM persona WHERE ID=?';

      var response = await query(personaquery,[persona_id]);

      if (response.length == 0) {
        res.status(413).send({mensaje:"la persona indicada no existe"});
      }
    }
    //Validacion de categoria
    const categoriaQuery = 'SELECT ID FROM categoria WHERE ID=?';
    response = await query(categoriaQuery,[genero_id]);

    if (response.length == 0) {
      res.status(413).send({mensaje:"la categoria indicada no existe"});
    }

    //Validacion de libro
    const libroquery = 'SELECT titulo FROM libro WHERE titulo=?';
    response = await query(libroquery,[nombre]);
    if (response.length > 0) {
      res.status(413).send({mensaje:"El libro ya existe"});
    }

    //Post nuevo libro
    const postquery = `INSERT INTO libro (titulo,descripcion,genero_id,persona_id) VALUES (?,?,?,?)`;
    var response = await query(postquery,[nombre,descripcion,genero_id,persona_id]);

    const selectPostedBook = 'SELECT * FROM libro WHERE ID=?';
    response = await query(selectPostedBook,[response.insertId]);
    res.status(200).send(response);
  } 
  catch (error) {
    res.status(413).send({ mensaje:"Error inesperado"});
  }

}

const libroGetId = async function (req, res) {
  const id = req.params.id;
  try {
    //Buscar libro devolver error en caso de que no exista
    const getquery = 'SELECT * FROM libro WHERE ID=?';
    var response = await query(getquery,[id]);
    if (response.length == 0) {
      res.status(413).send({ mensaje: "no se encuentra ese libro" });
    } else res.status(200).send(response[0]);
  } catch (error) {
    res.status(413).send({
      mensaje: "Error inesperado",
    });
  }
};

const libroPutId = async function (req, res) {
  const nombre = req.body.nombre;
  var persona_id = parseInt(req.body.persona_id);
  const genero_id = parseInt(req.body.genero_id);

  const id = req.params.id;
  const descripcion = req.body.descripcion;

  try {
    //Validacion de libro
    const libroquery = 'SELECT * FROM libro WHERE ID=?';
    var response = await query(libroquery,[id]);
    if (response.length == 0) {
      res
        .status(413)
        .send({ mensaje: "El libro que intenta actualizar no existe" });
    }
    if (Number.isNaN(persona_id) || persona_id == "") {
      persona_id = null;
    }

    //solo se puede modificar la descripcion del libro
    if (nombre !== response[0].titulo ||persona_id !== response[0].persona_id ||genero_id !== response[0].genero_id
    ) res.status(413).send({ mensaje: "Solo se puede modificar la descripcion del libro" });
    

    //Update libro
    const updateQuery = 'UPDATE libro SET descripcion=? WHERE ID=?';
    response = await query(updateQuery,[descripcion,id]);

    const selectUpdatedBook = 'SELECT * FROM libro WHERE ID=?';
    response = await query(selectUpdatedBook,[id]);
    res.status(200).send(response);
  } catch (error) {
    res.status(413).send({
      mensaje: error.message,
    });
  }
};

const libroPutDevolver = async function (req, res) {

  const id = req.params.id;
  try {
    //Validacion de libro
    const libroquery = 'SELECT ID FROM libro WHERE ID=?';
    var response = await query(libroquery,[id]);
    if (response.length == 0) {
      res.status(413).send({ mensaje: "El libro no existe" });
    }

    //Validar que ese libro este prestado
    const personaquery = 'SELECT persona_id FROM libro WHERE ID=?';
    response = await query(personaquery,[id]);
    if (response[0].persona_id == null) {
      res.status(413).send({ mensaje: "ese libro no estaba prestado" });
    }

    //Devolver libro
    var persona_id = null
    const updateQuery = 'UPDATE libro SET persona_id=? WHERE ID =?';
    response = await query(updateQuery,[persona_id,id]);
    res.status(200).send({ mensaje: "Se realizo la devolucion correctamente" });
  } catch (error) {
    console.log(error);
    res.status(413).send({
      mensaje: "Error inesperado",
    });
  }
};

 const libroGet = async function (req, res) {
     try{
         let queryLibro = 'SELECT * FROM libro'
         let response = await query(queryLibro);
 
         res.status(200).send({response});    

         if (response.length ==0) {
             res.status(413).send({response});
         }
 
     } catch (error){
         console.error(error.message);
         res.status(413).send({mensaje: 'Error inesperado'});}
 }
 
 const libroPutPrestarId = async function (req, res) {
     const id = req.params.id;
     const persona_id = req.body.persona_id;
 
     try{
         const libro = `SELECT persona_id FROM libro WHERE ID=?`;
         var response = await query(libro, [id]);
         if (response.length ==0) {
             res.status(413).send({mensaje: "No se encontro el libro"});
             return;
         }
         if (response[0].persona_id!==null) {
             res.status(413).send({mensaje: "El libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva"});
             return;
         }
 
         const persona = `SELECT ID FROM persona WHERE ID=?`;
         response = await query(persona,[persona_id]);
         if (response.length ==0){
             res.status(413).send({mensaje: "No se encontro la persona a la que se quiere prestar el libro"});
         }
         else {
             const prestar = `UPDATE libro SET PERSONA_ID =? WHERE ID=?`;
             response = await query(prestar,[persona_id][id]);
             res.status(200).send({mensaje: "Se presto correctamente"});
         }
     } catch (error){
         console.error(error.message);
         res.status(413).send({message: 'Error inesperado'});}
     }
 
 const DeleteLibroId = async function (req, res){
  
    const id = req.params.id;
    
    try{
        const libro = `SELECT persona_id FROM libro WHERE ID=?`;
         var response = await query(libro,[id]);
         if (response.length ==0) {
             res.status(413).send({mensaje: "No se encuentra ese libro"});
             return;
         }
         if (response[0].persona_id !==null) {
             res.status(413).send({mensaje: "Ese libro esta prestado no se puede borrar"});
             return;
         }
         else {
            const idQuery = `DELETE FROM libro WHERE ID=?`;
            response = await query(idQuery,[id]);
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
  libroGet,
}