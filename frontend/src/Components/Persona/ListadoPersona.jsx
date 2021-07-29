import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './ListadoPersona.css';


// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons'

const iconoModificar = <FontAwesomeIcon icon={faEdit} />
const iconoBorrar = <FontAwesomeIcon icon={faTrashAlt} />

const apiUrl = 'http://localhost:4200/persona/'


// DELETE Persona
const borrarPersona = async (idPersona) => {
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

    const [listado, setListado] = useState([]);

    useEffect(() => {

        let isMounted = true;

        try{
            const fetchData = async () => {
                const respuesta = await axios.get(apiUrl);

                if (respuesta.status === 200 && isMounted){
                    setListado(respuesta.data.Respuesta);
                }
            }

            fetchData();
        }
        catch (err) {
            console.log('Error', err.message);
            alert(err.response.data);
        }

        return () => { isMounted = false }

    }, [listado])


    const listaPersona = listado.map( el => {
        return (
            <ul key={el.ID}>
                <li className="list-item">
                    <p><span>Nombre: </span>{el.nombre}</p>
                    <p><span>Apellido: </span>{el.apellido}</p>
                    <p><span>Alias: </span>{el.alias}</p>
                    <p><span>Email: </span>{el.email}</p>
                    <div className="icon-container">
                        <i className="icon-btn-modificar"><Link to={"/listadoPersona/EditarPersona/" + el.ID}>{iconoModificar}</Link></i>
                        <i className="icon-btn-borrar" onClick={() => { if (window.confirm("Estas seguro que deseas borrar a esta persona?"))  borrarPersona(el.ID)}}>{iconoBorrar}</i>
                    </div>
                    <button className="btn-mostrar"><Link to={"/listadoPersona/ListaPersonaLibro/" + el.ID}>Mostrar libros prestados</Link></button> 
                </li>
            </ul>
        )
    })

    return(
        <div className="list-container">
            {listaPersona}
        </div >
    )
}

