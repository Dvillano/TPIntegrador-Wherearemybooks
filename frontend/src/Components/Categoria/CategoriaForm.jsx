import React, { useState, useEffect } from "react";
import axios from 'axios';
import shortid from "shortid";
import './formCss.css'

export default function CategoriaForm() {
    const [categoria, setCategoria] = useState(''); //uso este estado para guardar lo que se pone en el input
    const [genero, setGenero] = useState([]); //uso este estado para guardar lo que se agrega con submit
    const [data, setData] = useState([]);

    const inputCategoriaHandler = (e) => { //esta funcion es para manejar que el valor que se pone en el input y se guarde en la const categoria
        setCategoria(e.target.value)
    }
    
        function submitHandler(e) { // esta funcion es para guargar en genero con el boton submit en el estado de genero desde la línea 17 a 22
        e.preventDefault(); // esta funcion es para evitar que vuelva a cargar la página cuando se aprete el botón
        setGenero([
           // ...genero, 
                {
                    //id:shortid.generate(),
                    genero: categoria
                }  
        ])
        setCategoria('') // este llamado es para vaciar el input una vez apretado el botón
    }    
    
    const postPersonaUrl = 'http://localhost:3000/categoria'   //direccion servidor
    
    useEffect( async () => { 
        const response = await axios.post(postPersonaUrl, genero)
            if(response.status === 200){
            setData(response.data)};            
    }, [genero, data]);
       
    console.log();
    //console.log(categoria);

    return (
        <div className='form-container'> 
            <h3>Ingrese una nueva categoría</h3>
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
                        Agregar!
                </button>
            </form>
        </div>
    )
}


