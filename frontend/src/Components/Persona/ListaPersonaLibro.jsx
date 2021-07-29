import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, } from 'react-router-dom';
import './ListaPersonaLibro.css'
import { useDispatch, useSelector } from 'react-redux';

//todo

const libroUrl = 'http://localhost:4200/libro'
const personaUrl = "http://localhost:4200/persona"

export default function ListaPersonaLibro() {
    const libros = useSelector(state=>state.libros)
    const personas = useSelector(state=>state.personas)
    const dispatch = useDispatch()
    const {id} = useParams();
    const [persona,setPersona] = useState({})

    useEffect(()=>{
     //buscar todos los libros para filtrar luego
        const fetchData = async () => {
            if(libros.length ==0){
            try{
                const libros = await axios.get(libroUrl);
                if(libros.status === 200){
                    dispatch({type:"SET_LIBROS",libros:libros.data.response})
                }
               }catch(error){
                  console.log(typeof error)
                  console.error(error)
               }
            }   
            if(personas.length==0)    {
                //buscar persona especifica   
                  try{
                    const persona = await axios.get(personaUrl)
                    if(persona.status === 200){
                        dispatch({type:"SET_PERSONAS",personas:persona.data.Respuesta})
                        var index = personas.indexOf(personas.find(element=>element.ID==parseInt(id)))
                        setPersona(personas[index])
                    }
                  }catch(error){
                  console.log(typeof error)
                   console.error(error)
                  }
            }
            
         
     }
   
     fetchData();

    }, [])

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
