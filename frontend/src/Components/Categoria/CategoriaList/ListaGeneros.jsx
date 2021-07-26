import React, {useState, useEffect} from "react";
import axios from 'axios';

const ListadeGeneros = () =>{

    const [ genero, setGenero ] = useState([])
    const url = 'http://localhost:4200/categoria/';

    useEffect( async () => {

        try{
            const consulta = await axios.get(url);
            if (consulta.status === 200){
                setGenero(consulta.data.respuesta)
            }
        }
        catch(error){
           console.log(error)
        }
    },   [genero])

    const handleDelete = async (e) =>{
        const generoid = e.target.attributes[0].value;
         try{
             const borrarGenero = await axios.delete(url + generoid)
             if(borrarGenero.status === 200){
                console.log(borrarGenero)
             }     
        }
        catch(error){
            console.log(error)
        }
    };
    
    return(
        <div className='conteinerList'>
            <ul className='ul-list'>
                {genero.map((item, index) =>(
                    <li className='li-list'>
                        <button id={item.genero} className='btn-list-genero'>
                            {item.genero} {item.ID}
                        </button>
                        <button generoid={item.ID} onClick={handleDelete} className='btn-borrar'>
                            Borrar
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default ListadeGeneros;