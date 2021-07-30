import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux"
import axios from 'axios'; 
import PrestarBtn from './PrestarBtn';
import EditarBtn from './EditarBtn';
import './listadolibros.css'

function ListadoDeLibros (){
const libros =useSelector((state)=>state.libros)
const dispatch = useDispatch()
const apiUrl = 'http://localhost:4200/libro'

useEffect(async()=>{
    if(libros.length == 0){
        try{
            const respuesta=await axios.get(apiUrl)
            if (respuesta.status == 200){ 
                dispatch({type:"SET_LIBROS",libros:respuesta.data.response})
            }  
        } 
        catch(error){
            alert(error.response.data)
            console.log(error)
        }
    }
} ,[]) 

    const onClickBorrar = async(e) =>{
        const libro_id=e.target.attributes[0].value
        try{
            const respuesta=await axios.delete(apiUrl + "/"+libro_id)
            if (respuesta.status == 200){
                const nuevaLista = libros.filter(element=>element.ID !== parseInt(libro_id))
              dispatch({type:"SET_LIBROS",libros:nuevaLista})
            }
        }
    catch(error){
        console.log(error)
    }
    }

    return(
        <div className="list-container">
            {libros.map((el)=>{
                return(<div className="list-item">
                    <p className="titulo">{el.titulo}</p>
                    <p className="genero"> {el.genero}</p>
                    <p className="descripcion">{el.descripcion}</p>
                    <button className="borrarbtn" libro_id={el.ID}onClick={onClickBorrar}>borrar</button>
                    <PrestarBtn persona_id={el.persona_id} libro_id={el.ID}/>
                    <EditarBtn editarlibroid={el.ID}/>
                </div>)
            })}
        </div>
    )      
    }

export default ListadoDeLibros