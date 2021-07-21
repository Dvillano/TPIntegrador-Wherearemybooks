import './style.css'

import React,{useState} from 'react'

import Aceptarbtn from "./AceptarBtn"
import Descripcion from "./Descripcion"
import DescripcionInput from "./DescripcionInput"
import Message from '../PrestarLibro/Message'
import Titulo from "./Titulo"
import axios from "axios"

function EditarLibro(props){
const id = props.id
const [editado,setEditado] = useState(false)

const onSubmit=(e)=>{
    e.preventDefault()
    const descripcion = e.target[0].value;
    const editarUrl = "http://localhost:3000/libro/" + id
 /* axios.put(editarUrl,{descripcion:descripcion}).then((response)=>{


   })*/
  setEditado(true)
}

if(!editado){
 return(<div className="containerEditarLibro">
     <Titulo/>
     <Descripcion/>
     <form onSubmit={onSubmit}>
     <DescripcionInput/>
     <Aceptarbtn/>
     </form>
 </div>)
}else{
    return(<Message message="El libro fue editado de forma exitosa"/>)
}
}
export default EditarLibro