import './style.css'

import React,{useEffect, useState} from 'react'

import Message from './Message'
import PersonaCard from './PersonaCard'
import Titulo from './Titulo'
import axios from 'axios'

function PrestarLibro(props){
  const personaurl = "http://localhost:4200/persona"
  const libroId=props.id

  const [data,setData] = useState([]);
  const [prestado,setPrestado] = useState(false)

  const onClick = (e)=>{
    /*si se presta el libro de forma exitosa setPrestado a true
    id de libro a prestar
    */
    const prestarUrl = "http://localhost:4200/libro/prestar"
    const personaId=e.target.attributes[0].value
    setPrestado(!prestado);
   }

const mostrarPersona = data.map(element=>{
    return(<PersonaCard personaid={element.ID} key={element.ID} onClick={onClick} alias={element.alias} nombre={element.nombre} apellido={element.apellido} email={element.email}/>)
})

 useEffect(() => {
  axios.get(personaurl).then(response=>{
      setData(response.data.Respuesta)
  })
  }, [])

  if(!prestado){
    return(<div>
      <Titulo/>
      {mostrarPersona}
     </div>)
  }else if(prestado){
    /*Devolver el libro fue prestado de forma exitosa
    */
    return(<Message message="El libro fue prestado de forma exitosa"/>)
  }
   
}

export default PrestarLibro