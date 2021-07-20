import Alias from "./Alias"
import Apellido from "./Apellido";
import Email from "./Email";
import Nombre from "./Nombre";
import PrestarBtn from "./PrestarBtn";

function PersonaCard(props){
    return(
    <div className="card">
   <Nombre nombre={props.nombre}/>
   <Apellido apellido={props.apellido}/>
   <Email email={props.email}/>
   <Alias alias={props.alias}/>
   <PrestarBtn onClick={props.onClick} personaId={props.key}/>
    </div>)
}

export default PersonaCard