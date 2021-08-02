import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditarPersona.css';
import Message from './MessagePersona';
import { useSelector,useDispatch } from 'react-redux';

const apiUrl = 'http://localhost:4200/persona/'

// Formulario para editar persona (PUT)
export default function EditarPersona() { 
    const personas = useSelector(state=>state.personas)
    const dispatch = useDispatch()

    const param = useParams();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [alias, setAlias] = useState('');  

    const handleEdit = async (e) => {

        const form = {
            nombre: nombre,
            apellido: apellido,
            alias: alias
        }

        try {
            const respuesta = await axios.put(apiUrl+param.id, form);
            if(respuesta.status === 200){
                //modificar en store
                const persona =personas.find(element=>element.ID === parseInt(param.id))
                const index = personas.indexOf(persona)
                dispatch({type:"SET_PERSONAS",personas:personas.splice(index,1,{...form,ID:persona.ID,email:persona.email})})
                alert("Se modificaron los datos de la persona");
                e.preventDefault();
            } 

        } catch (err) {
            alert(err.response.data);
            console.log('Error: ', err.message);
        }


    }

    return(
        <div className='form-container'>
            <h3 className= 'categoriaformtitulo'>Editar persona</h3> 
            <form>
                <label>Nombre</label>
                <input className="categoriaforminput" required type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

                <label>Apellido</label>
                <input className="categoriaforminput" required type="text" id="apellido" value={apellido} onChange={e => setApellido(e.target.value)} />

                <label>Alias</label>
                <input className="categoriaforminput" required type="text" id="alias" value={alias} onChange={e => setAlias(e.target.value)} />

                <button className="agregarbtn"  type="submit" onClick={() => { if (window.confirm("¿Estas seguro que deseas modificar los datos de esta persona?"))  {handleEdit()} }}>Enviar</button>
            </form>
            <Message />
        </div>
        
    )
}