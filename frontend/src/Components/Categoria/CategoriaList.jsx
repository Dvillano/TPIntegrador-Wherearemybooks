import React from 'react';
import axios from 'axios';
import './list.css';
import './BorrarBtn'
import BorrarCategoria from './BorrarBtn';


export default function CategoriaList() {

    const [ listado, setListado ] = React.useState([])
    
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
        
        const ListaCategorias = () => {
            return (
                listado.map(item => {
                    return <li key={item.ID} className="item">{item.genero} <BorrarCategoria /></li>
                })
            )
        }
            return (
                <div className="list-container">
                    <h3>Géneros</h3>
                    <div className="list">
                        <ListaCategorias /> 
                    </div>
                </div>
    
        )
    }