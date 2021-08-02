const { connection } = require("../app");
const util = require("util");

const qy = util.promisify(connection.query).bind(connection);

// Funcion para validar mail
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// PERSONA
// POST
const postPersona = async (req, res) => { 
  try {

    // Validar que esten todos los campos
    if (!req.body.nombre || !req.body.alias || !req.body.apellido || !req.body.email) {
      res.status(413).send("Faltan datos");
    }

    let nombre = req.body.nombre.toUpperCase().trim();
    let alias = req.body.alias.toUpperCase().trim();
    let apellido = req.body.apellido.toUpperCase().trim();
    let email = req.body.email.toUpperCase().trim();

    // Validar estructura del email
    if (validateEmail(email) == false) {
      res.status(413).send("Mail invalido");
      return;
    }

    let query = "SELECT id FROM persona WHERE email = ?";
    let respuesta = await qy(query, [email]);

    // Validar email repetido
    if (respuesta.length > 0) {
      res.status(413).send("Ese email ya esta registrado");
    }

    //Guardo nueva persona
    query =
      "INSERT INTO persona (nombre, alias, apellido, email) VALUE (?, ?, ?, ?)";
    respuesta = await qy(query, [nombre, alias, apellido, email]);

    console.log(respuesta);
    res.status(200).send({"Respuesta": respuesta.insertId });
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ Error: error.message });
  }
};

//GET
const getPersona = async (req, res) => {
  try {
    let query = "SELECT * FROM persona";
    let respuesta = await qy(query);

    res.status(200).send({ Respuesta: respuesta });
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ Error: error.message }, "Error inesperado");
  }
};

//GET by ID
const getPersonaById = async (req, res) => {
  try {
    let query = "SELECT * FROM persona WHERE id = ?";
    let respuesta = await qy(query, [req.params.id]);

    if (respuesta == 0) {
      res.status(413).send({Respuesta :"No se encuentra esta persona"});
    }
    res.status(200).send({respuesta});
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ Error: error.message });
  }
};

//PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar
//retorna status 200 y el objeto modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

const putPersonaById = async function (req, res) {
  try {
    const respuesta = await qy("SELECT * FROM persona WHERE id=?", [
      req.params.id,
    ]);

    if (respuesta.length == 1) {
      if (!req.body.nombre || !req.body.apellido || !req.body.alias) {
        res.status(413).send("Todos los campos son requeridos.");
      }

      const nombre = req.body.nombre.toUpperCase().trim();
      const apellido = req.body.apellido.toUpperCase().trim();
      const alias = req.body.alias.toUpperCase().trim();

      await qy(
        "UPDATE persona SET nombre=?, apellido=?, alias=? WHERE id=?",
        [nombre, apellido, alias, req.params.id]
      );

      res.send(respuesta[0]);
    } else {
      throw new Error(
        "La persona que intenta modificar no se encuentra en la base de datos."
      );
    }
  } catch (e) {
    res.status(413).send({ Error: e.message });
  }
};

//DELETE '/persona/:id' retorna: 200 y {mensaje: "se borro correctamente"}
// o bien 413, {mensaje: <descripcion del error>} "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"

const deletePersonaById = async function (req, res) {
  try {
    const idregistro = await qy("SELECT * FROM persona WHERE id=?", [
      req.params.id,
    ]);
    if (idregistro.length == 1) {
      const consulta = await qy(
        "SELECT persona_id FROM libro WHERE persona_id=?",
        [req.params.id]
      );
      if (consulta.length == 0) {
        await qy("DELETE FROM persona WHERE id=?", [req.params.id]);
        res.json({ message: "se borro correctamente" });
      } else {
        res.status(413).send("No puede borrar una persona con libros prestados");
      }
    } else {
      throw new Error(
        "La persona que intenta eliminar no se encuentra en la base de datos."
      );
    }
  } catch (e) {
    res.status(413).send({ Error: e.message });
  }
};

module.exports = {
  postPersona,
  getPersona,
  getPersonaById,
  putPersonaById,
  deletePersonaById,
};

//PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar
//retorna status 200 y el objeto modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

//PUT by Persona
