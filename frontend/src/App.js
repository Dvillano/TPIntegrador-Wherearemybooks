import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom'

import Navbar from './Components/PaginaInicio/Navbar'
import PrestarLibro from './Components/Libro/PrestarLibro/PrestarLibro';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
     <Route path="/prestarLibro" component={PrestarLibro}/>
    </div>
    </Router>
  );
}

export default App;
