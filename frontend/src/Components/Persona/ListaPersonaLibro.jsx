import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, } from 'react-router-dom';
import './ListaPersonaLibro.css'

const libroUrl = 'http://localhost:4200/libro'
const personaUrl = "http://localhost:4200/persona"

export default function ListaPersonaLibro() {

    const {id} = useParams();
    const [libros,setLibro] = useState([])
    const [persona,setPersona] = useState({})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
     //buscar todos los libros para filtrar luego
     
     const fetchData = async () => {
        try{
            const libros = await axios.get(libroUrl);
            if(libros.status === 200){
               setLibro(libros.data.response)
            }
           }catch(error){
              console.log(typeof error)
              console.error(error)
           }
       
             //buscar persona especifica
       
             try{
             const persona = await axios.get(personaUrl + "/" + id)
             if(persona.status === 200){
                 setPersona(persona.data.respuesta[0])
             }
           }catch(error){
           console.log(typeof error)
            console.error(error)
           }

           
     }
     
     fetchData();

    }, [id])

    const Persona = () => {
        return(<div>
            <h1>Alias</h1>
            <h2> {persona.alias}</h2>
            </div>)
    }

    const Libro = (props) => {
        return(<div>
            <ul>
                <li>
                    <p>Titulo: {props.titulo}</p>
                    <p>Descripcion: {props.descripcion}</p>
                </li>
            </ul>
            
        </div>)
    }

    return(
        <div className="container">
       <Persona/>
       <h1>Libros prestados: </h1>
       {libros.filter(element=>persona.ID === element.persona_id).map(element=>{
           return(
           <Libro titulo={element.titulo} descripcion={element.descripcion}/>)
       })}
        </div>
    )
}
