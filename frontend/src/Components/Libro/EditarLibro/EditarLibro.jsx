import './style.css'

import Aceptarbtn from "./AceptarBtn"
import Descripcion from "./Descripcion"
import DescripcionInput from "./DescripcionInput"
import Titulo from "./Titulo"
import axios from "axios"

function EditarLibro(props){
const id = props.id

const onSubmit=(e)=>{
    e.preventDefault()
    const descripcion = e.target[0].value;
    const editarUrl = "http://localhost:3000/libro/" + id
 /*  axios.put(editarUrl,{descripcion:descripcion}).then((response)=>{


   })*/

}

 return(<div className="containerEditarLibro">
     <Titulo/>
     <Descripcion/>
     <form onSubmit={onSubmit}>
     <DescripcionInput/>
     <Aceptarbtn/>
     </form>
 </div>)

}
export default EditarLibro