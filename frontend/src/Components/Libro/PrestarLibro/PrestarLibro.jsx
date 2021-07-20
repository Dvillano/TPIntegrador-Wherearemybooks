import './style.css'

import React,{useEffect, useState} from 'react'

import PersonaCard from './PersonaCard'
import Titulo from './Titulo'
import axios from 'axios'

function PrestarLibro(){
  const personaurl = "http://localhost:3000/persona"

  const [data,setData] = useState([]);

const onClick = ()=>{

}

 useEffect(() => {
  axios.get(personaurl).then(response=>{
    console.log(response)
      setData(response.data.Respuesta)
  })
  }, [])

    return(<div>
     <Titulo/>
     {data.map(element=>{
         return(<PersonaCard onClick={onClick} alias={element.alias} nombre={element.nombre} apellido={element.apellido} email={element.email}/>)
     })}
    </div>)
}

export default PrestarLibro