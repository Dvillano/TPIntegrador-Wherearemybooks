import React, {useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './ListadoPersona.css';
import {useDispatch,useSelector} from "react-redux"


// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons'

const iconoModificar = <FontAwesomeIcon icon={faEdit} />
const iconoBorrar = <FontAwesomeIcon icon={faTrashAlt} />

const apiUrl = 'http://localhost:4200/persona/'

// GET Lista Persona
export default function ListadoPersona() {

    // const [listado, setListado] = useState([]);
    const dispatch = useDispatch()
    const personas =useSelector((state)=>state.personas)

    useEffect(() => {

        //let isMounted = true;
 if(personas.length ==0){
    try{
        const fetchData = async () => {
            const respuesta = await axios.get(apiUrl);

            if (respuesta.status === 200 ){
                // setListado(respuesta.data.Respuesta);
                dispatch({type:"SET_PERSONAS",personas :respuesta.data.Respuesta})
            }
        }

        fetchData();
    }
    catch (err) {
        console.log('Error', err.message);
        alert(err.response.data);
    }
 }
       // return () => { isMounted = false }
    }, [])

    // DELETE Persona
    const borrarPersona = async (personaId) => {
        const persona_id = personaId

        try {

            const respuesta = await axios.delete(apiUrl+persona_id);
            
            if(respuesta.status === 200){
                const nuevaLista = personas.filter(element=>element.ID !== parseInt(persona_id))
                dispatch({type:"SET_PERSONAS",personas:nuevaLista})
                alert("Persona Borrada");
            }


        } catch (err) {
            console.log('Error', err.message);
            alert(err.response.data);
        }
    }


    const listaPersona = personas.map( el => {
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

