import React,{useState,useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"

const personaUrl = "http://localhost:4200/persona"
const libroUrl = "http://localhost:4200/libro"

function PrestarBtn(props){
const dispatch= useDispatch()
const persona_id = props.persona_id
const libros =useSelector(state=>state.libros)
const libro_id =props.libro_id
const [persona,setPersona] = useState(null)

useEffect(async ()=>{
if(persona_id !== null){
try {
    const response = await axios.get(personaUrl + "/" + persona_id)
    if(response.status == 200){
        setPersona(response.data.respuesta)
    }
} catch (error) {
    alert(error.response.data)
    console.error(error)
}
}
},[])

const devolverLibro = async()=>{
    if(props.libro_id !==null){
    try {
        const response = await axios.put(libroUrl + "/devolver/"+ props.libro_id )
        if(response.status == 200){
            //buscar libro con id de persona y y cambiar id en store
            const libro = libros.find(element=>element.ID==props.libro_id)
            var index = libros.indexOf(libro)
            libro.persona_id = null
            libros.splice(index,1,libro)
            dispatch({type:"SET_LIBROS",libros:libros})
            setPersona(null)
            alert(response.data.mensaje)
        }
    } catch (error) {
        console.error(error)
    }
}
}

if(persona==null){
    return(<div className="Prestar-btn">
        <p>Este libro no esta prestado</p>
        <Link to={"/prestarLibro/"+libro_id} className="link">Prestar</Link>
        </div>)
}else{
    return(<div className="Prestar-btn">
        <p>{persona[0].alias}</p>
  <button onClick={devolverLibro}>Devolver</button>
        </div>)
}

}

export default PrestarBtn