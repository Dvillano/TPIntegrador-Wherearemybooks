import './style.css'

import { Link } from "react-router-dom"
import Title from "./Title"

export default function(){
    return(<div className="navbar">
   <Title/>
   <div className="options">
   <Link to="/ingresarPersona" className="link left">Ingresar nueva persona</Link>
   <Link to="/listadoPersona" className="link middle">Listado de personas</Link>
   <Link to="/ingresarGenero" className="link right">Ingresar nuevo genero</Link>
   <Link to="/listadoGenero" className="link left">Listado de generos</Link>  
   <Link to="/ingresarLibro" className="link middle">Ingresar nuevo libro</Link>
   <Link to="/listadoLibro" className="link right">Listado de libros</Link>
   <Link to="/prestarLibro" className="link">Prestar Libro(prueba)</Link>
   </div>
    </div>)
}