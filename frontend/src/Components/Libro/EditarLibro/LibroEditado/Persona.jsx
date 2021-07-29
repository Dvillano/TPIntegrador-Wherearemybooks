import React,{useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";

import axios from 'axios'

//todo buscar personas en store

function Persona(props){
   const persona_id = props.persona_id;
   const personas = useSelector(state=>state.personas)
   const personaUrl = "http://localhost:4200/persona"
   const [persona,setPersona] = useState("");
   const dispatch =useDispatch()

   useEffect(async()=>{
     if(personas.length ==0){
      try {
        const response = await axios.get(personaUrl)
        if(response.status==200){
          dispatch({type:"SET_PERSONAS",personas:response.data.Respuesta})
      }
    } catch (error) {
      alert("Error inesperado")
      console.error(error)
    } 
    if(persona_id !== null){
      setPersona(personas.find(element=>element.ID == parseInt(persona_id)))

    }
     }
   },[])
   
    //Buscar persona si no existe libro no esta prestado
   if(persona == ""){
    return(<div>Este libro no esta prestado</div>)
   } else{
    return(<div>{persona.alias}</div>)
   }

}
export default Persona