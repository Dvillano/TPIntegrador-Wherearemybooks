import './MessagePersona.css'
import {Link} from "react-router-dom"

function Message(props){
    return(<div className="message">
    <h2>{props.message}</h2>
    <Link to="/listadoPersona" className="link volver">Ir al listado de personas</Link>
     </div>)
}
export default Message