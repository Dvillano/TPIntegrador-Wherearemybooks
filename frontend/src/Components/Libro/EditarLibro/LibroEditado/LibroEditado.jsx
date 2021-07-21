import Descripcion from "./Descripcion";
import Genero from "./Genero";
import Persona from "./Persona";
import Titulo from "./Titulo";

function LibroEditado(props){

 

 return(<div>
  <Titulo titulo={props.titulo}/>
  <Genero genero_id={props.genero_id}/>
  <Descripcion descripcion={props.descripcion}/>
  <Persona persona_id={props.persona_id}/>
 </div>)
}

export default LibroEditado