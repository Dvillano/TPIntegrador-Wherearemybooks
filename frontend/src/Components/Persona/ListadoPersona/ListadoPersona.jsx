import React, {useEffect, useState} from 'react';
import axios from 'axios';

// Iconos para modificar y borrar datos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons'
const iconoModificar = <FontAwesomeIcon icon={faEdit} />
const iconoBorrar = <FontAwesomeIcon icon={faTrashAlt} />

const apiUrl = 'http://localhost:4200/persona/'

const handleDelete = async (idPersona) => {
    

    try {
        const respuesta = await axios.delete(apiUrl+idPersona); // BUSCAR ALTERNATIVA, NO ENVIAR VARIABLES EN REQUEST
        
        if(respuesta.status === 200){
            alert("Persona Borrada");
        }

    } catch (err) {
        console.log('Error', err.message);
    }
}


// Lista de personas con GET
function MostrarPersonas() {

    const [data, setData] = useState([]);

    useEffect(() => {

        let isMounted = true;

        try{
            const fetchData = async () => {
                const respuesta = await axios.get('http://localhost:4500/persona');

                if (respuesta.status === 200 && isMounted){
                    setData(respuesta.data.Respuesta);
                }
            }

            fetchData();
        }
        catch (err) {
            console.log('Error', err.message);
            alert(err.response.data);
        }

        return () => {isMounted = false}

    }, [data])


    const listaPersona = data.map( el => {
        return (

            <div key={el.ID}>
                <div >
                <p>{"Nombre: " + el.nombre}</p>
                <p>{"Apellido :" + el.apellido}</p>
                <p>{"Alias :" + el.alias}</p>
                <p>{"Email :" + el.email}</p>
                <button>{iconoModificar}</button>
                <button onClick={() => handleDelete(el.ID)}>{iconoBorrar}</button>
                <br />
                <br />
                </div>
            </div>
        )
    })

    return(
        <>
            {listaPersona}
        </>
    )
}

export default function ListadoPersona() {
    
    const [session, setSession] =   useState(false);

    const showPersonas = () => {
        !session ? setSession(true) : setSession(false)
    }

    return(
        <div>
            {/* Mostramos el formulario al cliquear en el componente */}
            <h1 onClick={showPersonas}>Listado de personas</h1> 
            {session ? <MostrarPersonas /> : <></>}
        </div>
    )

}