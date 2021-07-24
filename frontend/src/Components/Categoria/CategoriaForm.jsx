import React, {useState, useEffect} from "react";
import axios from "axios";
import  Titulo  from "./ComponentsForm/Titulo";
import './formCss.css'

export default function CategoriaForm() {
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
            setData(response.data)
    }, [genero]);

    //console.log(genero[0], typeof genero[0]);
    //console.log(data, typeof data)


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
            <p data={data}  >
               {data.Respuesta}
            </p>
        </form>                
        </div>
    )
}


