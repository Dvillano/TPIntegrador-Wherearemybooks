import React, {useState, useEffect} from "react";
import axios from "axios";
import  Titulo  from "./ComponentsForm/Titulo";
import './formCss.css'

export default function CategoriaForm() {
    const [categoria, setCategoria] = useState(''); 
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    
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
            if(respuesta.status === 200){
                setData(respuesta.data)
            }
        }
        catch (error){  
           console.log(error.response.data, typeof error.response.data)
           
           setData(error.response.data)
        }

        setCategoria('') 
    }
    
    return (
        <div className='form-container'> 
            <Titulo />
            <form>                                   
            <input 
                value={categoria} 
                onChange={inputCategoriaHandler} 
                type='text'                    
                placeholder='Nueva categoría...'>
            </input>
            <button 
                onClick={submitHandler} 
                type='submit'>
                    Agregar
            </button>
        </form>
        <p data={data} >
               {data.Respuesta}{data.Error}
               
            </p>                
        </div>
    )
}


