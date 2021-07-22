import './style.css'

import { Link } from "react-router-dom"
import Title from "./Title"

function Navbar(){
    return(<div className="navbar">
   <Title/>
   <div className="options">
   <Link to="/ingresarLibro" className="link left">Ingresar nuevo libro</Link>
   <Link to="/ingresarPersona" className="link middle">Ingresar nueva persona</Link>
   <Link to="/ingresarGenero" className="link right">Ingresar nuevo genero</Link>
   <Link to="/listadoLibro" className="link left">Listado de libros</Link>
   <Link to="/listadoPersona" className="link middle">Listado de personas</Link>
   <Link to="/listadoGenero" className="link right">Listado de generos</Link>  
   <Link to="/prestarLibro" className="link">Prestar Libro(prueba)</Link>
   <Link to="/editarLibro" className="link">Editar Libro(prueba)</Link>
   </div>
    </div>)
}


export default Navbar