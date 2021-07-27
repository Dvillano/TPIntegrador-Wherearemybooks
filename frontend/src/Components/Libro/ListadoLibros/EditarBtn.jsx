import { Link } from "react-router-dom"

function EditarBtn(props){
 const libro_id=props.editarlibroid
  return(<div>
      <Link to={"/editarLibro/" + libro_id} className="link">Editar</Link>
  </div>)
}


export default EditarBtn