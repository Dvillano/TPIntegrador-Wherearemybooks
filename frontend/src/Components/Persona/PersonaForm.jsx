import React, { useState } from 'react';
const axios = require('axios');

const apiUrl = 'http://localhost:4500/persona'


//Formulario para ingresar nueva persona
function FormularioPostPersona() {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [alias, setAlias] = useState('');   

    const handleSubmit = async () => {
        const data = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            alias: alias
        }

        try {
            const respuesta = await axios.post(apiUrl, data);
            
            if(respuesta.status === 200){
                alert("Persona creada");
            }

        } catch (err) {
            console.log('Error: ', err.message);
            alert(err.response.data);
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

                <button onClick={handleSubmit}>Enviar</button>
            </form>
        </>
    );
}

const Cargando = () => {
    return(null);
}

export default function PersonaForm() {

    const [session, setSession] = useState(false);

    const showForm = () => {
        !session ? setSession(true) : setSession(false)
    }

    return(
        <div>
            <h1 onClick={showForm}>Ingresar nueva persona</h1> 
            {session ? <FormularioPostPersona /> : <Cargando />}
        </div>
    )

}