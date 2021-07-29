import Descripcion from "./Descripcion";
import Genero from "./Genero";
import Persona from "./Persona";
import Titulo from "./Titulo";
import {useSelector} from "react-redux"

function LibroEditado(props){
    const libro_id=props.libro_id
    const libros = useSelector(state=>state.libros)
    const libro =libros.find(element=>element.ID == parseInt(libro_id))

 return(<div>
  <Titulo titulo={libro.titulo}/>
  <Genero genero_id={libro.genero_id}/>
  <Descripcion descripcion={libro.descripcion}/>
  <Persona persona_id={libro.persona_id}/>
 </div>)
}

export default LibroEditado