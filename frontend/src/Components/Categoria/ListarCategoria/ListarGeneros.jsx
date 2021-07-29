import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from "react-redux"
import axios from 'axios';
import './style.css';

export default function ListarGeneros() {

    const generos = useSelector(state=>state.generos)
    const libros = useSelector(state=>state.libros)
    const dispatch = useDispatch()

    const url = 'http://localhost:4200/categoria/';

    useEffect(() => {

        if(libros.length == 0){
            try{
                const fetchLibros = async()=>{
                const todosLosLibros = await axios.get('http://localhost:4200/libro/');
                if(todosLosLibros.status === 200){
                    dispatch({type:"SET_LIBROS",libros:todosLosLibros.data.response})
                    }
                }
             fetchLibros()
            }
            catch(error){
                console.log(error)
            }
        }

        if(generos.length== 0){
            try{
                const fetchGeneros=async()=>{
                const consulta = await axios.get(url);
                if (consulta.status == 200){
                    dispatch({type:"SET_GENEROS",generos:consulta.data.respuesta})
                    }
                }
                fetchGeneros()
            }
            catch(error){
               console.log(error)
                }
            }
        }, [])

    const handleDelete = async (e) =>{
        const genero_id = e.target.attributes[0].value;
         try{
             const borrarGenero = await axios.delete(url + genero_id)
             if(borrarGenero.status === 200){
                //borrar genero en store
                dispatch({type:"SET_GENEROS",generos:generos.filter(el=>el.ID !== parseInt(genero_id))})
                alert("Se borro el género")
             }     
        }
        catch(error){
            console.log(error.response.data.Error)
            alert("No se pudo borrar el género por tener libros asociados")
        }
    };
    
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
                {generos.map((item) =>(
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