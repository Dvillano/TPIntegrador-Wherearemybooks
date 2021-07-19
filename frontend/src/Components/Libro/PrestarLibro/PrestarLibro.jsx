import './style.css'

import PersonaCard from './PersonaCard'
import React from 'react'
import Titulo from './Titulo'
import axios from 'axios'

export default function(){
  const personaurl = "http://localhost:3000/persona"

  const [data,setData] = React.useState([]);

const onClick = ()=>{

}

  React.useEffect(() => {
  axios.get(personaurl).then(response=>{
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