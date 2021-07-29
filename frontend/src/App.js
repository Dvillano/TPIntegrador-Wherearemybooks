import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import EditarLibro from './Components/Libro/EditarLibro/EditarLibro';
import Navbar from './Components/PaginaInicio/Navbar'
import PrestarLibro from './Components/Libro/PrestarLibro/PrestarLibro';
import NuevoLibro from './Components/Libro/IngresarLibro/NuevoLibro';
import ListadoDeLibros from './Components/Libro/ListadoLibros/ListadoDeLibros';

import CategoriaForm from './Components/Categoria/CategoriaForm/CategoriaForm';
import ListadoCategoria from './Components/Categoria/ListarCategoria/ListadoCategoria';

import IngresarPersona from './Components/Persona/IngresarPersona';
import ListadoPersona from './Components/Persona/ListadoPersona';
import EditarPersona from './Components/Persona/EditarPersona';
import ListaPersonaLibro from './Components/Persona/ListaPersonaLibro';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
     <Route path="/prestarLibro/:id" component={PrestarLibro}/>
     <Route path="/editarLibro/:id" component={EditarLibro}/>
     <Route path="/ingresarLibro" component={NuevoLibro}/>
     <Route path="/listadoLibro" component={ListadoDeLibros}/>

     <Route path="/ingresarGenero" component={CategoriaForm}/>
     <Route path="/listadoGenero" component={ListadoCategoria}/>

     <Route path="/ingresarPersona" component={IngresarPersona} />
     <Route exact path="/listadoPersona" component={ListadoPersona} />
     <Route path="/ListaPersona/editarPersona/:id" component={EditarPersona} />
     <Route path="/ListaPersona/listaPersonaLibro" component={ListaPersonaLibro} />

    </div>
    </Router>
  );
}

export default App;
