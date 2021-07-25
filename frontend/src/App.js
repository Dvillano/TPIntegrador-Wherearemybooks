import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import EditarLibro from './Components/Libro/EditarLibro/EditarLibro';
import Navbar from './Components/PaginaInicio/Navbar'
import PrestarLibro from './Components/Libro/PrestarLibro/PrestarLibro';
import CategoriaForm from './Components/Categoria/CategoriaForm/CategoriaForm';
import CategoriaList from './Components/Categoria/CategoriaList/CategoriaList';



import IngresarPersona from './Components/Persona/IngresarPersona/IngresarPersona';
import ListadoPersona from './Components/Persona/ListadoPersona/ListadoPersona';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
     <Route path="/prestarLibro" component={PrestarLibro}/>
     <Route path="/editarLibro" component={EditarLibro}/>
     <Route path="/ingresarGenero" component={CategoriaForm}/>
     <Route path="/listadoGenero" component={CategoriaList}/>
     <Route path="/ingresarPersona" component={IngresarPersona} />
     <Route exact path="/ListadoPersona" component={ListadoPersona} />

    </div>
    </Router>
  );
}

export default App;
