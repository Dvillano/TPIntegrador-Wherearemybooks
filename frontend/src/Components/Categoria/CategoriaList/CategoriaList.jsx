import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GenerosTitulo from './Titulo';
import './list.css';

export default function CategoriaList() {

    const [ listado, setListado ] = useState([])
    const [ borrado, setBorrado  ] = useState(false)
    const [ genero, setGenero ] = useState({id:'', genero:''})

    useEffect(() => {
        try {
             const myFetch = async () => {
                const url = 'http://localhost:4200/categoria/'
                const result = await axios.get(url);
                //console.log(result.data.respuesta[0].ID, typeof result.data.respuesta[0].ID )
                if (result.status === 200) {
                    setListado(result.data.respuesta)
                    /*
                    setGenero({
                        id: result.data.respuesta[i].id,
                        genero: result.data.respuesta[i].genero
                    })
                    */
                }
            }
            myFetch()
        }
        
        catch (error) {
            console.log(error)
        }
    }, [])
    
    //console.log(genero)
    //console.log(genero.genero)
    //console.log(listado)
    
    const borrarCategoria = async (e) => {

        e.preventDefault();

        try {
            const respuesta = await axios.delete(categoriaUrl)
        
            if(respuesta.status === 200){
                setBorrado(true)
                //alert("La categoria se borro con éxito")
            }
        }
        catch(e) {
            console.log('Error', [])
        }
    }

    const categoriaUrl = 'http://localhost:4200/categoria/'

    const ListaCategorias = () => {

        return (
            <ul>
                {listado.map(item => 
                    <div key={item.ID} className="li-btn">
                        <li  className="item">
                            {item.genero}
                        </li>                        
                        <button onClick={borrarCategoria}>Borrar</button>
                    </div>
                )}
            </ul>
        ); 
    }
        
    return (
        <div className="list-container">
            <GenerosTitulo />
            <div className="list">
                <ListaCategorias />    
            </div>
        </div>
    
    )
}
