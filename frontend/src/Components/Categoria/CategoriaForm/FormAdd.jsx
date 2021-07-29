import React from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";


const FormAdd = () =>{
    const generos = useSelector(state=>state.generos)
    const dispatch = useDispatch()
    const [categoria,setCategoria] = useState("")
    
    const inputCategoriaHandler = (e) => {
        setCategoria(e.target.value);
    }

    const submitHandler = async(e) => { 
        
        e.preventDefault(); 

        const postPersonaUrl = 'http://localhost:4200/categoria';
        
        const genero = {
            genero:categoria
        }    
        
        try{
            const respuesta = await axios.post(postPersonaUrl, genero);
            if(respuesta.status == 200){
                generos.push({ID:respuesta.data.Respuesta,genero:categoria})
                dispatch({type:"SET_GENEROS",generos:generos})
            }            
        }
        catch (error){  
           console.log(error.response.data)
        }
        setCategoria('') 
    }

    return(
        <form>
            <input
            value={categoria}
            onChange={inputCategoriaHandler}
            type='text'                    
            placeholder='Nueva categoría...'
            >   
            </input>
            <button onClick={submitHandler} type='submit' className='btn-form'>
                Agregar
            </button>
        </form>
    )
}


export default FormAdd;