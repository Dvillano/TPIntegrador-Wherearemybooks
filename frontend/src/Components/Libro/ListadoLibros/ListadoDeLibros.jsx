import React, {useEffect, useState} from 'react';
import axios from 'axios'; 
import './listadolibros.css'

function ListadoDeLibros (){
const [libro, setlibro] = useState([])
const apiUrl = 'http://localhost:4200/libro'
useEffect(async()=>{
    try{
        const respuesta=await axios.get(apiUrl)
        if (respuesta.status == 200){ 
            console.log(respuesta)
            setlibro(respuesta.data.response)
            console.log (libro)
        }   } 
    catch(error){
        console.log (error)
    }},[]
    ) 
    const onClickBorrar = async(e) =>{
        const libro_id=e.target.attributes[0].value
        try{
            const respuesta=await axios.delete(apiUrl + "/"+libro_id)
            if (respuesta.status == 200){
                console.log(respuesta)
            }
        }
    catch(error){
        console.log (error)
    }
    }
    return(
        <div className="list-container">
            {libro.map((el)=>{
                return(<div className="list-item">
                    <p className="titulo">{el.titulo}</p>
                    <p className="genero"> {el.genero}</p>
                    <p className="descripcion">{el.descripcion}</p>
                    <button className="borrarbtn" libro_id={el.ID}onClick={onClickBorrar}>borrar</button>
                </div>)
            })}
        </div>
    )
}
export default ListadoDeLibros