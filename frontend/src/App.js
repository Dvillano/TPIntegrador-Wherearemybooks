import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import EditarLibro from './Components/Libro/EditarLibro/EditarLibro';
import Navbar from './Components/PaginaInicio/Navbar'
import PrestarLibro from './Components/Libro/PrestarLibro/PrestarLibro';

import IngresarPersona from './Components/Persona/IngresarPersona/IngresarPersona';
import ListadoPersona from './Components/Persona/ListadoPersona/ListadoPersona';


function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
     <Route path="/prestarLibro" component={PrestarLibro}/>
     <Route path="/editarLibro" component={EditarLibro}/>

     <Route path="/ingresarPersona" component={IngresarPersona} />
     <Route path="/ListadoPersona" component={ListadoPersona} />

    </div>
    </Router>
  );
}

export default App;
