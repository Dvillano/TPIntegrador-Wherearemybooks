import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:4200/persona'


//Formulario para ingresar nueva persona (POST)
export default function IngresarPersona() {

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
                alert("Persona creada");
                e.preventDefault();
            }

        } catch (err) {
            alert(err.response.data);
            console.log('Error: ', err.message);
        }

    }

    return (
        <>
            <h3>Ingresar nueva persona</h3> 
            <form>
                <label>Nombre</label>
                <input required type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

                <label>Apellido</label>
                <input required type="text" id="apellido" value={apellido} onChange={e => setApellido(e.target.value)} />

                <label>Alias</label>
                <input required type="text" id="alias" value={alias} onChange={e => setAlias(e.target.value)} />

                <label>Email</label>
                <input required type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                <button type="submit" onClick={handleSubmit}>Enviar</button>
            </form>
        </>
    );
}