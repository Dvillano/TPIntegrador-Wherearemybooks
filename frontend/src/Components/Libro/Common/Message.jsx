import './style.css'


function Message(props){
    return(<div className="message">
    <h2>{props.message}</h2>
    <button className="link volver" onClick={props.onclick}>Volver al listado de libros</button>
     </div>)
}
export default Message