import {Link} from "react-router-dom"

function Message(props){
    return(<div className="message">
    <h2>{props.message}</h2>
    <Link to="/listadoLibro" className="link volver">Volver al listado de libros</Link>
     </div>)
}
export default Message