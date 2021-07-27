import './style.css'

import React,{useEffect, useState} from 'react'

import Message from '../Common/Message'
import PersonaCard from './PersonaCard'
import Titulo from './Titulo'
import axios from 'axios'
import { useParams } from 'react-router'

function PrestarLibro(props){
  const personaurl = "http://localhost:4200/persona"
  const { id } = useParams()
  const [data,setData] = useState([]);
  const [prestado,setPrestado] = useState(false)
  const [mensaje,setMensaje] = useState("")
  const [error,setError] = useState(false)


  const onClick =async (e)=>{
    const personaId=e.target.attributes.personaid.value
    const prestarUrl = "http://localhost:4200/libro/prestar" + "/" +id
    try{
      const respuesta= await axios.put(prestarUrl,{persona_id:personaId})
      if(respuesta.status==200){
        setPrestado(true);
        setMensaje(respuesta.data.mensaje)
      }
    }catch(error){
      setError(true)
      setMensaje("Error inesperado:" +error.response.data.mensaje )
      console.error(error)
    }

   }

const mostrarPersona = data.map(element=>{
    return(<PersonaCard personaid={element.ID} key={element.ID} onClick={onClick} alias={element.alias} nombre={element.nombre} apellido={element.apellido} email={element.email}/>)
})

 useEffect(async () => {
   //si no hay datos,buscarlos en la bd
   if(data.length == 0){
     try {
      const personas=await axios.get(personaurl)
      if(personas.status == 200){
        setData([...personas.data.Respuesta])
      }
     } catch (error) {
       console.error(error)
     }
    }
  }, [])
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