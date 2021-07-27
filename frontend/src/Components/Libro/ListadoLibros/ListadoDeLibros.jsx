import React, {useEffect, useState} from 'react';
import axios from 'axios'; 
import PrestarBtn from './PrestarBtn';
import EditarBtn from './EditarBtn';

function ListadoDeLibros (){
const [libro, setlibro] = useState([])
const apiUrl = 'http://localhost:4200/libro'

useEffect(async()=>{
    try{
        const respuesta=await axios.get(apiUrl)
        if (respuesta.status == 200){ 
            setlibro(respuesta.data.response)
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
        <div>
            {libro.map((el)=>{
                return(<div>
                    <p>{el.titulo}</p>
                    <p>{el.genero}</p>
                    <p>{el.descripcion}</p>
                    <button libro_id={el.ID}onClick={onClickBorrar}>borrar</button>
                    <PrestarBtn persona_id={el.persona_id} libro_id={el.ID}/>
                    <EditarBtn editarlibroid={el.ID}/>
                </div>)
            })}
        </div>
    )      
    }

export default ListadoDeLibros