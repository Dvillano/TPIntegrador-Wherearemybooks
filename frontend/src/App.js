import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import EditarLibro from './Components/Libro/EditarLibro/EditarLibro';
import Navbar from './Components/PaginaInicio/Navbar'
import PrestarLibro from './Components/Libro/PrestarLibro/PrestarLibro';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
     <Route path="/prestarLibro" component={PrestarLibro}/>
     <Route path="/editarLibro" component={EditarLibro}/>
    </div>
    </Router>
  );
}

export default App;
