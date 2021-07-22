import './style.css'

import React,{useEffect, useState} from 'react'

import Message from '../Common/Message'
import PersonaCard from './PersonaCard'
import Titulo from './Titulo'
import axios from 'axios'

function PrestarLibro(props){
  const personaurl = "http://localhost:4200/persona"
  const libroId=props.id

  const [data,setData] = useState([]);
  const [prestado,setPrestado] = useState(false)
  const [mensaje,setMensaje] = useState("")
  const [error,setError] = useState(false)

  const onClick =async (e)=>{
    const prestarUrl = "http://localhost:4200/libro/prestar" + "/" +libroId
    const personaId=e.target.attributes[0].value
  
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
    /*.then(response=>{
     if(response.status == 200){
      setPrestado(true);
      setMensaje(response.data.mensaje)
     }
    }).catch(error=>{
      setError(true)
      setMensaje("Error inesperado")
      console.error(error)
    })*/ 
   }

const mostrarPersona = data.map(element=>{
    return(<PersonaCard personaid={element.ID} key={element.ID} onClick={onClick} alias={element.alias} nombre={element.nombre} apellido={element.apellido} email={element.email}/>)
})

 useEffect(() => {
   //si no hay datos,buscarlos en la bd
   if(data.length == 0){
    axios.get(personaurl).then(response=>{
      if(response.status == 200){
        setData(response.data.Respuesta)
      }
    })
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