import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"


// Iconos para modificar y borrar datos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons'

const iconoModificar = <FontAwesomeIcon icon={faEdit} />
const iconoBorrar = <FontAwesomeIcon icon={faTrashAlt} />

const apiUrl = 'http://localhost:4200/persona/'


// DELETE Persona
const BorrarPersona = async (idPersona) => {
    try {
        const respuesta = await axios.delete(apiUrl+idPersona);
        
        if(respuesta.status === 200){
            alert("Persona Borrada");
        }

    } catch (err) {
        console.log('Error', err.message);
    }
}


// GET Lista Persona
export default function ListadoPersona() {


    const [data, setData] = useState([]);

    useEffect(() => {

        let isMounted = true;

        try{
            const fetchData = async () => {
                const respuesta = await axios.get(apiUrl);

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

        return () => { isMounted = false }

    }, [data])


    const listaPersona = data.map( el => {
        return (

            <div key={el.ID}>
                <div >
                    <ul>
                        <li>
                            <p>{"Nombre: " + el.nombre}</p>
                            <p>{"Apellido :" + el.apellido}</p>
                            <p>{"Alias :" + el.alias}</p>
                            <p>{"Email :" + el.email}</p>
                            <button><Link to="/editarPersona">Editar {iconoModificar}</Link></button>
                            <button onClick={() => BorrarPersona(el.ID)}>Borrar {iconoBorrar}</button>
                            <button><Link to="/listaPersonaLibro">Mostrar libros prestados</Link></button> 
                        </li>
                    </ul>
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

