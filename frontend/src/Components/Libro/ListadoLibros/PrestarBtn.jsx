import React,{useState,useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const personaUrl = "http://localhost:4200/persona"
const libroUrl = "http://localhost:4200/libro"

function PrestarBtn(props){
const persona_id = props.persona_id
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
    console.error(error)
}
}
},[])

const devolverLibro = async()=>{
    //devolver
    if(props.libro_id !==null){
    try {
        const response = await axios.put(libroUrl + "/devolver/"+ props.libro_id )
        if(response.status == 200){
            alert(response.data.mensaje)
            //Action set libro
            //actualizar persona id de libro 
            //buscar array de libro en store buscar item especifico modificar mediante action
        }
    } catch (error) {
        console.error(error)
    }
}
}

if(persona==null){
    return(<div><Link to={"/prestarLibro/"+libro_id} className="link">Prestar</Link></div>)
}else{
    return(<div>
  <button onClick={devolverLibro}>Devolver</button>
        </div>)
}

}

export default PrestarBtn