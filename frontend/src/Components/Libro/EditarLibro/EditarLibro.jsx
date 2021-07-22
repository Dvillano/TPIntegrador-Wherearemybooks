import './style.css'

import React,{useState} from 'react'

import Aceptarbtn from "./AceptarBtn"
import Descripcion from "./Descripcion"
import DescripcionInput from "./DescripcionInput"
import LibroEditado from './LibroEditado/LibroEditado'
import Message from '../Common/Message'
import Titulo from "./Titulo"
import axios from "axios"

function EditarLibro(props){
const id = props.id
const [editado,setEditado] = useState(false)
const [libroData,setLibroData] = useState({})
const [message,setMessage] = useState("")
const [error,setError] = useState(false)

const onSubmit=async (e)=>{
    e.preventDefault()
    const descripcion = e.target[0].value;
    const editarUrl = "http://localhost:4200/libro/" + id
    try{
        const response = await axios.put(editarUrl,{descripcion:descripcion})
        if(response.status == 200){
            setEditado(true)
            setMessage("El libro fue editado de forma exitosa")
            setLibroData(response.data[0])
          }
    }catch(error){
        setError(true);
        setMessage("Error inesperado:" +error.response.data.mensaje)
        console.error(error)
    }

    /*axios.put(editarUrl,{descripcion:descripcion}).then((response)=>{
  if(response.status == 200){
     setEditado(true)
     setMessage("El libro fue editado de forma exitosa")
     setLibroData(response.data[0])
   }
   }).catch(error=>{
       setError(true);
       setMessage("Error inesperado")
       console.error(error)
   })*/
}
//Try redux here with libro editado to avoid passing too many props
if(error){
    return(<Message message={message}/>)
}
else if(!editado){
 return(<div className="containerEditarLibro">
     <Titulo/>
     <Descripcion/>
     <form onSubmit={onSubmit}>
     <DescripcionInput/>
     <Aceptarbtn/>
     </form>
 </div>)
}else if(editado){
    return(<div><Message message={message}/>
    <LibroEditado titulo={libroData.titulo} descripcion={libroData.descripcion} genero_id={libroData.genero_id} persona_id={libroData.persona_id}/></div>)
}
}
export default EditarLibro