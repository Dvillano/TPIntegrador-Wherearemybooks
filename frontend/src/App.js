import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import Navbar from './Components/PaginaInicio/Navbar'
import PrestarLibro from './Components/Libro/PrestarLibro/PrestarLibro';
import CategoriaForm from './Components/Categoria/CategoriaForm';



function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
     <Route path="/prestarLibro" component={PrestarLibro}/>
     <Route path="/ingresarGenero" component={CategoriaForm}/>
    </div>
    </Router>
  );
}

export default App;
