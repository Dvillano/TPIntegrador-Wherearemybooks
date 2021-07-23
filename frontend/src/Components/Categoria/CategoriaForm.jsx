import React, { useState, useEffect } from "react";
import axios from 'axios';
import './formCss.css'

export default function CategoriaForm() {


    return (
        <div className='form-container'> 
            <Titulo />
            <Form />                 
        </div>
    )
}

const Titulo = () => {
    return(
        <h3>Ingrese una nueva categoría</h3>
    )
};

const Form = () => {
    const [categoria, setCategoria] = useState([]); 
    const [genero, setGenero] = useState([]);
    const [data, setData] = useState([]);
    

    const inputCategoriaHandler = (e) => { 
        e.preventDefault();
        setCategoria(e.target.value)
    }

    function submitHandler(e) { 
        e.preventDefault(); 
        setGenero([             
                {                  
                genero:categoria
            }
        ]);
        setCategoria('') 
    }
    const postPersonaUrl = 'http://localhost:4200/categoria' 

    useEffect( async () => { 
        
        try{
        const response = await axios.post(postPersonaUrl, genero[0])
            //if(response.status === 200){
            setData(response.data)
           }         
       // } 
        catch(e) {
            console.error(e.message);
            setData(e.message);
        }         
    }, [genero]);
       
   console.log(data, typeof data)
    return(
        <form>                                   
            <input 
                value={categoria} 
                onChange={inputCategoriaHandler} 
                type='text'                    
                placeholder='Nueva categoría...'>
            </input>
            <button 
                onSubmit={submitHandler} 
                type='submit'>
                    Agregar
            </button>
            <p>
               
            </p>
        </form>
    )
};

