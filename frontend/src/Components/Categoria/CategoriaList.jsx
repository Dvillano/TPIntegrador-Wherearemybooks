import React from 'react';
import axios from 'axios';
import './list.css';

export default function CategoriaList() {

    const [ listado, setListado ] = React.useState([])
    const [ borrado, setBorrado  ] = React.useState(false)
    
    React.useEffect(() => {
        try {
            const myFetch = async () => {
                const url = 'http://localhost:4200/categoria/'
                const result = await axios.get(url);
                if (result.status === 200) {
                    setListado(result.data.respuesta)
                }
            }
            myFetch()
            }
        
        catch (error) {
            console.log(error)
        }
        }, [])
        const categoriaUrl = 'http://localhost:4200/categoria/'

        const borrarCategoria = async (ID) => {
            try {
                const respuesta = await axios.delete(categoriaUrl+ID)
    
                if(respuesta.status === 200){
                    setBorrado(true)
                    alert("La categoria se borro con éxito")
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
                    <li key={item.ID} className="item">
                        {item.genero}
                        <div key={item.ID}>
                            <button onClick={borrarCategoria(item.ID)}>Borrar</button>
                        </div>
                    </li>)}
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