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
const categoriaPostPersona = async (req, res) => {
  try {
<<<<<<< HEAD

    // Validar que esten todos los campos
    if (!req.body.nombre || !req.body.alias || !req.body.apellido || !req.body.email) {
      res.status(413).send("Faltan datos");
    }

    let nombre = req.body.nombre.toUpperCase().trim();
    let alias = req.body.alias.toUpperCase().trim();
    let apellido = req.body.apellido.toUpperCase().trim();
    let email = req.body.email.toUpperCase().trim();

=======
    let nombre = req.body.nombre.toUpperCase();
    let alias = req.body.alias.toUpperCase();
    let apellido = req.body.apellido.toUpperCase();
    let email = req.body.email.toUpperCase();

    // Validar que esten todos los campos
    if (!nombre || !alias || !apellido || !email) {
      res.status(413).send("Faltan datos");
    }

>>>>>>> origin/D-commit
    // Validar estructura del email
    if (validateEmail(email) == false) {
      res.status(413).send("Mail invalido");
    }

    let query = "SELECT id FROM persona WHERE email = ?";
    let respuesta = await qy(query, [email]);

    // Validar email repetido
    if (respuesta.length > 0) {
      throw new Error("Ese email ya esta registrado");
    }

    //Guardo nueva persona
    query =
      "INSERT INTO persona (nombre, alias, apellido, email) VALUE (?, ?, ?, ?)";
    respuesta = await qy(query, [nombre, alias, apellido, email]);

    console.log(respuesta);
<<<<<<< HEAD
    res.status(200).send({"Respuesta": respuesta.insertId });
=======
    res.status(200).send({ Respuesta: respuesta });
>>>>>>> origin/D-commit
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ Error: error.message });
  }
};

//GET
const categoriaGetPersona = async (req, res) => {
  try {
    let query = "SELECT * FROM persona";
    let respuesta = await qy(query);

<<<<<<< HEAD
    res.status(200).send({ Respuesta: respuesta });
=======
    res.status(200).send({ respuesta: respuesta });
>>>>>>> origin/D-commit
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ Error: error.message }, "Error inesperado");
  }
};

//GET by ID
const categoriaGetPersonaById = async (req, res) => {
  try {
    let query = "SELECT * FROM persona WHERE id = ?";
    let respuesta = await qy(query, [req.params.id]);

    if (respuesta == 0) {
<<<<<<< HEAD
      res.status(413).send({Respuesta :"No se encuentra esta persona"});
    }
    res.status(200).send({ Respuesta: respuesta });
=======
      res.status(413).send("No se encuentra esta persona");
    }
    res.status(200).send({ respuesta: respuesta });
>>>>>>> origin/D-commit
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ Error: error.message });
  }
};

//PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar
//retorna status 200 y el objeto modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

const categoriaPutPersonaById = async function (req, res) {
  try {
    const consulta = await qy("SELECT * FROM persona WHERE id=?", [
      req.params.id,
    ]);

    if (consulta.length == 1) {
      if (!req.body.nombre || !req.body.apellido || !req.body.alias) {
        throw new Error("Todos los campos son requeridos.");
      }
      let newEmail = await qy("SELECT email FROM persona WHERE id = ?", [
        req.params.id,
      ]);

      const email = req.body.email.toUpperCase().trim();

      if (email != newEmail[0].email) {
        throw new Error("No se puede modificar el e-mail.");
      }

      const nombre = req.body.nombre.toUpperCase().trim();
      const apellido = req.body.apellido.toUpperCase().trim();
      const alias = req.body.alias.toUpperCase().trim();

      await qy(
        "UPDATE persona SET nombre=?, apellido=?, alias=?, email=? WHERE id=?",
        [nombre, apellido, alias, email, req.params.id]
      );
      const respuesta = await qy("SELECT * FROM persona WHERE id=?", [
        req.params.id,
      ]);
      res.send(respuesta[0]);
    } else {
      throw new Error(
        "La persona que intenta modificar no se encuentra en la base de datos."
      );
    }
  } catch (e) {
<<<<<<< HEAD
    res.status(413).send({ Error: e.message });
=======
    res.status(413).send(e.message);
>>>>>>> origin/D-commit
  }
};

//DELETE '/persona/:id' retorna: 200 y {mensaje: "se borro correctamente"}
// o bien 413, {mensaje: <descripcion del error>} "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"

const categoriaDeletePersonaById = async function (req, res) {
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
        throw new Error(
          "La persona que intenta eliminar tiene uno o más libros asociados."
        );
      }
    } else {
      throw new Error(
        "La persona que intenta eliminar no se encuentra en la base de datos."
      );
    }
  } catch (e) {
<<<<<<< HEAD
    res.status(413).send({ Error: e.message });
=======
    res.status(413).send(e.message);
>>>>>>> origin/D-commit
  }
};

module.exports = {
  categoriaPostPersona,
  categoriaGetPersona,
  categoriaGetPersonaById,
  categoriaPutPersonaById,
  categoriaDeletePersonaById,
};

//PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar
//retorna status 200 y el objeto modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

//PUT by Persona
