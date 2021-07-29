import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css';

export default function ListarGeneros() {

    const [ genero, setGenero ] = useState([])
    const [ libros, setLibros ] = useState([])
    const [ borrado, setBorrado ] = useState(false)

    const url = 'http://localhost:4200/categoria/';

    useEffect( async () => {

        if(genero.length=== 0 || borrado===true){

            try{
                const consulta = await axios.get(url);
                if (consulta.status === 200){
                    setGenero(consulta.data.respuesta)
                }
            }
            catch(error){
               console.log(error)
                }
            }
        }, [borrado])

    const handleDelete = async (e) =>{
        const genero_id = e.target.attributes[0].value;
        
         try{
             const borrarGenero = await axios.delete(url + genero_id)
             if(borrarGenero.status === 200){
                setBorrado(true)
                alert("Se borro el género")
             }     
        }
        catch(error){
            console.log(error.response.data.Error)
            alert("No se pudo borrar el género por tener libros asociados")
        }
    };

    useEffect( async () =>{
        try{
            const todosLosLibros = await axios.get('http://localhost:4200/libro/');
            if(todosLosLibros.status === 200){
                setLibros(todosLosLibros.data.response)
            }
        }
        catch(error){
            console.log(error)
        }
    }, [])
    
    const ListaLibros = ({genero_id}) => {
        const librosFiltrados = libros.filter((books) => books.genero_id == genero_id)
        
        if(librosFiltrados.length == 0){
            return(
                <p>Esta categoría no tiene libros asociados</p>
            )
        }
        else{
            return(
                librosFiltrados.map((book) =>(
                    <li key={book.ID} className='book-list'>
                       <p>Título: {book.titulo}</p>
                    </li>
                )) 
            )
        }
    } 
    
    return(
        <div className='lista-container'>
            <ul className='ul-list'>
                {genero.map((item) =>(
                        <li key={item.ID} value={item.id} className='item-lista'>
                                {item.genero}
                            <button genero_id={item.ID} value={item.ID} onClick={handleDelete} className='btn-borrar'>
                                Borrar
                            </button>
                            <ul>
                                <ListaLibros genero_id={item.ID}/>
                            </ul>
                        </li> 
                    ))
                }   
            </ul>
        </div>
    )
}