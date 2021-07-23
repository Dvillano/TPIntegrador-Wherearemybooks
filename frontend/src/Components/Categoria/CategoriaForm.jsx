import React, { useState, useEffect } from "react";
import axios from 'axios';
import './formCss.css'

export default function CategoriaForm() {


    return (
        <div className='form-container'> 
            <Titulo />
            <Form 

            />                 
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
        const response = await axios.post(postPersonaUrl, genero[0])
            if(response.status === 200){
            setData(response.data)
            
        };            
    }, [genero]);

    return(
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
            <p data={data}>
                    
            </p>
        </form>
    )
};

