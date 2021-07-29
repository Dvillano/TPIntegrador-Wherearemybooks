import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AceptarBtn from '../EditarLibro/AceptarBtn';
import Titulo from './Titulo'
import './ingresarLibro.css'
import {useSelector,useDispatch} from "react-redux"

function NuevoLibro () {
    const apiUrl = 'http://localhost:4200/libro' 
    const UrlCategoria = 'http://localhost:4200/categoria'
    const dispatch=useDispatch()
    const libros = useSelector(state=>state.libros)
    const generos = useSelector(state=>state.generos)
    //const [categoria, setCategoria] = useState([])

    useEffect(async()=>{
        if(generos.length == 0){
            try{
                const respuesta = await axios.get(UrlCategoria)
                if (respuesta.status == 200){
                    dispatch({type:"SET_GENEROS",generos:respuesta.data.respuesta})
                   // setCategoria(respuesta.data.respuesta)
                }
            }
            catch(error){
                console.log (error)
            }
        }
     
    },[]
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nombre = e.target[0].value
        const descripcion = e.target[1].value
        const categoria_ID = e.target[2].value

try {
    const respuesta = await axios.post(apiUrl,{nombre:nombre, descripcion:descripcion, genero_id:categoria_ID});
    if (respuesta.status == 200){
        libros.push(respuesta.data[0]);
        alert("Libro creado");
    }
}
catch (error) {
    alert(error.response.data.mensaje);
}   
}
 
return(
    <div className= 'form-container'>
        <Titulo/>
        <form onSubmit = {handleSubmit}>
            <label>Nombre</label>
            <input type="text" id="Nombre" name="Nombre" />
        
            <label>Descripcion</label>
            <input type="text" id="Descripcion" name="Descripcion" />
            
            <label>Categoria</label>
           <select name= "categoria">
               {generos.map(el=>{return(<option value={el.ID} key ={ el.ID } >{el.genero}</option>)})}              
           </select>
           
           
        
           <AceptarBtn/>
           
        </form>
        </div>
        )

           }

export default NuevoLibro
