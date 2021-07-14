const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

// Conexion a DB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "libreria",
});

// Verificar conexion a DB
connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Conexion con la base de datos establecida");
});

//se exporta la conexion a la base de datos para que sea una sola en todo el backend y
//se pueda usar en los requests de cada categoria
exports.connection = connection;

//Rutas importadas
const {
  categoriaPost,
  categoriaGet,
  categoriaGetById,
  categoriaDeleteById,
} = require("./routes/categoria");
const {
  postPersona,
  getPersona,
  getPersonaById,
  putPersonaById,
  deletePersonaById,
} = require("./routes/persona");

const {
  libroGetId,
  libroPost,
  libroPutDevolver,
  libroPutId,
  DeleteLibroId,
  libroPutPrestarId,
  libroGet,
} = require("./routes/libro");

//Requests de persona:
app.post("/persona", postPersona);
app.get("/persona", getPersona);
app.get("/persona/:id", getPersonaById);
app.put("/persona/:id", putPersonaById);
app.delete("/persona/:id", deletePersonaById);

//fin de requests Persona

//Requests de Libro
app.post("/libro", libroPost);
app.get("/libro/:id", libroGetId);
app.put("/libro/devolver/:id", libroPutDevolver);
app.put("/libro/:id", libroPutId);
app.get("/libro", libroGet);
app.put("/libro/prestar/:id", libroPutPrestarId);
app.delete("/libro/:id", DeleteLibroId)

//fin de requests de libro

//Requests de Categoria
app.post("/categoria", categoriaPost);
app.get("/categoria", categoriaGet);
app.get("/categoria/:id", categoriaGetById);
app.delete("/categoria/:id", categoriaDeleteById);
//fin de requests de categoria

app.listen(3000, () => console.log("listening on port 3000"));
