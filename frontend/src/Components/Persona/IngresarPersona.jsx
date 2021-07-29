import React, { useState } from 'react';
import axios from 'axios';  
import './IngresarPersona.css';    
import Message from './MessagePersona';
import { useSelector,useDispatch } from 'react-redux';

const apiUrl = 'http://localhost:4200/persona'


//Formulario para ingresar nueva persona (POST)
export default function IngresarPersona() {
    const dispatch=useDispatch()
    const personas=useSelector(state=>state.personas)
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [alias, setAlias] = useState('');   

    const handleSubmit = async (e) => {
        
        const form = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            alias: alias
        }

        try {
            const respuesta = await axios.post(apiUrl, form);

            if(respuesta.status === 200){
                personas.push({ID:respuesta.data.Respuesta,...form})
                dispatch({type:"SET_PERSONAS",personas:personas})
                alert("Persona creada");
                e.preventDefault(); 
            }

        } catch (err) {
            alert(err.response.data);
            console.log('Error: ', err.message);
        }

    }

    return (
        <div className='form-container'>
            <h3 className= 'categoriaformtitulo'>Ingresar nueva persona</h3> 
            <form>
                <label>Nombre</label>
                <input  className="categoriaforminput" required type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

                <label>Apellido</label>
                <input  className="categoriaforminput" required type="text" id="apellido" value={apellido} onChange={e => setApellido(e.target.value)} />

                <label>Alias</label>
                <input className="categoriaforminput"  required type="text" id="alias" value={alias} onChange={e => setAlias(e.target.value)} />

                <label>Email</label>
                <input  className="categoriaforminput" required type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                <button className="agregarbtn"  type="submit" onClick={handleSubmit}>Enviar</button>

            </form>
            <br />
            <Message />
        </div >
    );
}

