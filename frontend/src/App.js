import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import EditarLibro from './Components/Libro/EditarLibro/EditarLibro';
import Navbar from './Components/PaginaInicio/Navbar'
import PrestarLibro from './Components/Libro/PrestarLibro/PrestarLibro';

import IngresarPersona from './Components/Persona/IngresarPersona';
import ListadoPersona from './Components/Persona/ListadoPersona';
import EditarPersona from './Components/Persona/EditarPersona';
import ListaPersonaLibro from './Components/Persona/ListaPersonaLibro';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
     <Route path="/prestarLibro" component={PrestarLibro}/>
     <Route path="/editarLibro" component={EditarLibro}/>

     <Route path="/ingresarPersona" component={IngresarPersona} />
     <Route exact path="/ListadoPersona" component={ListadoPersona} />
     <Route path="/ListaPersona/editarPersona" component={EditarPersona} />
     <Route path="/ListaPersona/listaPersonaLibro" component={ListaPersonaLibro} />

    </div>
    </Router>
  );
}

export default App;
