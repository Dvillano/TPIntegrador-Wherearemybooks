import Alias from "./Alias"
import Apellido from "./Apellido";
import Email from "./Email";
import Nombre from "./Nombre";

export default function(props){
    return(
    <div>
    <button onClick={props.onClick}>
   <Nombre nombre={props.nombre}/>
   <Apellido apellido={props.apellido}/>
   <Email email={props.email}/>
   <Alias alias={props.alias}/>
   </button>
    </div>)
}