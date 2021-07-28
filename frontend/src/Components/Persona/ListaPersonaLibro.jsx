import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, } from 'react-router-dom';

const libroUrl = 'http://localhost:4200/libro'
const personaUrl = "http://localhost:4200/persona"

export default function ListaPersonaLibro() {

    const {id} = useParams();
    const [libros,setLibro] = useState([])
    const [persona,setPersona] = useState({})

    useEffect(async()=>{
     //buscar todos los libros para filtrar luego
     try{
     const libros = await axios.get(libroUrl);
     if(libros.status == 200){
        setLibro(libros.data.response)
     }
      }catch(error){
       console.log(typeof error)
       console.error(error)
      }

      //buscar persona especifica

      try{
      const persona = await axios.get(personaUrl + "/" + id)
      if(persona.status ==200){
          setPersona(persona.data.respuesta[0])
      }
    }catch(error){
    console.log(typeof error)
     console.error(error)
    }

    },[])

    const Persona = ()=>{
        return(<div>
            <h3>Alias</h3>
            <p>{persona.alias}</p>
            </div>)
    }

    const Libro = (props)=>{
        return(<div>
            <h3>{props.titulo}</h3>
            <p>{props.descripcion}</p>
        </div>)
    }

    return(
        <div>
       <Persona/>
       {libros.filter(element=>persona.ID == element.persona_id).map(element=>{
           return(
           <Libro titulo={element.titulo} descripcion={element.descripcion}/>)
       })}
        </div>
    )
}
