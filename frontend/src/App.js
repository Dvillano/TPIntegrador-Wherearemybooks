import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import EditarLibro from './Components/Libro/EditarLibro/EditarLibro';
import Navbar from './Components/PaginaInicio/Navbar'
import PrestarLibro from './Components/Libro/PrestarLibro/PrestarLibro';
import CategoriaForm from './Components/Categoria/CategoriaForm';
import CategoriaList from './Components/Categoria/CategoriaList';



function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
     <Route path="/prestarLibro" component={PrestarLibro}/>
     <Route path="/editarLibro" component={EditarLibro}/>
     <Route path="/ingresarGenero" component={CategoriaForm}/>
     <Route path="/listadoGenero" component={CategoriaList}/>
    </div>
    </Router>
  );
}

export default App;
