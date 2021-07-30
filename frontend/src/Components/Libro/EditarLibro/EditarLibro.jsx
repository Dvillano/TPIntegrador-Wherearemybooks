import './style.css'

import React,{useState} from 'react'

import Aceptarbtn from "./AceptarBtn"
import Descripcion from "./Descripcion"
import DescripcionInput from "./DescripcionInput"
import LibroEditado from './LibroEditado/LibroEditado'
import Message from '../Common/Message'
import Titulo from "./Titulo"
import axios from "axios"
import { useParams } from 'react-router'
import {useSelector,useDispatch} from "react-redux"

function EditarLibro(props){

 const {id} = useParams()
 const [editado,setEditado] = useState(false)
 const [message,setMessage] = useState("")
 const [error,setError] = useState(false)
 const libros = useSelector(state=>state.libros)
 const dispatch=useDispatch()

const onSubmit=async (e)=>{
    e.preventDefault()
    const descripcion = e.target[0].value;
    const editarUrl = "http://localhost:4200/libro/" + id

    try{
        const response = await axios.put(editarUrl,{descripcion:descripcion})
        if(response.status == 200){
            var index = libros.indexOf(libros.find(element=>element.ID ==response.data[0].ID))
            libros.splice(index,1,response.data[0])
            dispatch({type:"SET_LIBROS",libros:libros})
            setMessage("El libro fue editado de forma exitosa")
            setEditado(true)
          }
    }catch(error){
        setError(true);
        setMessage("Error inesperado:" +error.response)
        console.error(error)
    }
}
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
    <LibroEditado libro_id={id}/></div>)
}
}
export default EditarLibro