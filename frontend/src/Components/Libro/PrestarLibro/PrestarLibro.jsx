import './style.css'

import React,{useEffect, useState} from 'react'

import PersonaCard from './PersonaCard'
import Titulo from './Titulo'
import axios from 'axios'

function PrestarLibro(){
  const personaurl = "http://localhost:4200/persona"

  const [data,setData] = useState([]);
  const [prestado,setPrestado] = useState(false)

const onClick = (e)=>{
 /*si se presta el libro de forma exitosa setPrestado a true*/
 const prestarUrl = "http://localhost:4200/libro/prestar"
 console.log(e)
}

 useEffect(() => {
  axios.get(personaurl).then(response=>{
      setData(response.data.Respuesta)
  })
  }, [])

  if(!prestado){
    return(<div>
      <Titulo/>
      {data.map(element=>{
          return(<PersonaCard key={element.ID} onClick={onClick} alias={element.alias} nombre={element.nombre} apellido={element.apellido} email={element.email}/>)
      })}
     </div>)
  }else if(prestado){
    /*Devolver el libro fue prestado de forma exitosa*/
    return(<div>
    
    </div>)
  }
   
}

export default PrestarLibro