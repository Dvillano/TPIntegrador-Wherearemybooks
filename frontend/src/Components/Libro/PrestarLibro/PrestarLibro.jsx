import './style.css'

import React,{useEffect, useState} from 'react'

import Message from '../Common/Message'
import PersonaCard from './PersonaCard'
import Titulo from './Titulo'
import axios from 'axios'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

function PrestarLibro(props){
  const personaurl = "http://localhost:4200/persona"
  const { id } = useParams()
  const [prestado,setPrestado] = useState(false)
  const [mensaje,setMensaje] = useState("")
  const [error,setError] = useState(false)

  const personas = useSelector(state=>state.personas);
  const libros = useSelector(state=>state.libros);
  const dispatch = useDispatch()

  useEffect(async () => {
    if(personas.length == 0){
      try {
       const personas=await axios.get(personaurl)
       if(personas.status == 200){
         dispatch({type:"SET_PERSONAS",personas:personas.data.Respuesta})
         //setData([...personas.data.Respuesta])
       }
      } catch (error) {
        console.error(error)
      }
     }
   }, [])
 

  const onClick =async (e)=>{
    const personaId=e.target.attributes.personaid.value
    const prestarUrl = "http://localhost:4200/libro/prestar" + "/" +id
    try{
      const respuesta= await axios.put(prestarUrl,{persona_id:personaId})
      if(respuesta.status==200){
        //modificar libro en store
       const libro = libros.find(element=>element.ID == parseInt(id))
       var index=libros.indexOf(libro)
       libro.persona_id = personaId;
       libros.splice(index,1,libro)
        setPrestado(true);
        setMensaje(respuesta.data.mensaje)
      }
    }catch(error){
      setError(true)
      setMensaje("Error inesperado:" +error.response.data.mensaje )
      console.error(error)
    }

   }

const mostrarPersona = personas.map(element=>{
    return(<PersonaCard personaid={element.ID} key={element.ID} onClick={onClick} alias={element.alias} nombre={element.nombre} apellido={element.apellido} email={element.email}/>)
})


 if(prestado ===true || error===true){
    return(<Message message={mensaje}/>)
  }
 else if(prestado===false){
    return(<div>
      <Titulo/>
      {mostrarPersona}
     </div>)
  } 
   
}

export default PrestarLibro