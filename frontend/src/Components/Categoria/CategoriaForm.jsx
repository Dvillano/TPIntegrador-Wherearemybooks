import React, { useState, useEffect } from "react";
import axios from 'axios';
import shortid from "shortid";

export default function CategoriaForm() {
    const [categoria, setCategoria] = useState('');
    const [inputText, setInputText] = useState('');

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    }
    
    const postPersonaUrl = 'http://localhost:3000/categoria'
    
    useEffect( () => {
        async function fetchData() {
            const respuesta = await axios.post(postPersonaUrl, inputText);
            console.log(respuesta.data)
        } 
        
        fetchData();
    }, []);

    
    function submitHandler(e) {
        e.preventDefault();
        setCategoria([
            ...categoria,
                {
                    text: inputText,
                    id: shortid.generate()
                }
        ])
        
        
        //alert(`You entered ${categoria}`)
    }
    /*
    function handleChange(event){
        setCategoria(event.target.value)
    }*/

    return (
        <div>
            <h3>Ingrese una nueva categoría</h3>
            <form  action='/categoria' method='POST'>
                <label>Categoría</label>
                <input onChange={inputTextHandler} type='text' placeholder='ingrese aquí la nueva categoría'></input>
                <button onClick={submitHandler} type='submit'>
                        Agregar!
                </button>
            </form>
        </div>
        /*
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="categoriaInput">Género nuevo</label>
                <input 
                    id="categoriaInput" 
                    type="text" 
                    onChange={handleChange}
                    value={categoría}
                />
            </div>
            <div className='btn-agregar'>
                <button type="submit">Agregar género</button>
            </div>
        </form>
        */
    )
}

