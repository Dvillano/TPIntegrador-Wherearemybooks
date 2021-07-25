import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './list.css';

export default function CategoriaList() {

    const [ listado, setListado ] = useState([])
    const [ borrado, setBorrado  ] = useState(false)

    
    useEffect(() => {
        try {
             const myFetch = async () => {
                const url = 'http://localhost:4200/categoria/'
                const result = await axios.get(url);
                if (result.status === 200) {
                    setListado(result.data.respuesta)
                    console.log(listado)
                }
            }
            myFetch()
        }
        
        catch (error) {
            console.log(error)
        }
    }, [])
    
    const categoriaUrl = 'http://localhost:4200/categoria/'
    
    

    const borrarCategoria = async () => {

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

    const ListaCategorias = () => {

        return (
            <ul>
                {listado.map(item => 
                    <div className="li-btn">
                        <li key={item.ID} className="item">
                            {item.genero}
                        </li>                        
                        <button key={item.ID} onClick={borrarCategoria(item.ID)}>Borrar</button>
                    </div>
                )}
            </ul>
                            
        )}
        
    return (
        <div className="list-container">
            <h3>Géneros</h3>
            <div className="list">
                <ListaCategorias />    
            </div>
        </div>
    
    )
}