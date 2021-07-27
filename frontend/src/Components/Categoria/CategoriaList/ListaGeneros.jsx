import React, {useState, useEffect} from "react";
import axios from 'axios';

const ListaDeGeneros = () =>{

    const [ genero, setGenero ] = useState([])
    const [ libros, setLibros ] = useState([])
    const [ librosfiltrado, setLibrosFiltrados ] = useState([])
    const urlLibros = 'http://localhost:4200/libro/';
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
        console.log(genero)
         try{
             const borrarGenero = await axios.delete(url + generoid)
             if(borrarGenero.status === 200){
             }     
        }
        catch(error){
            console.log(error.response.data.Error)
            alert(error.response.data.Error)
        }
    };

    useEffect( async () =>{
        try{
            const getAllBooks = await axios.get(urlLibros);
            if(getAllBooks.status === 200){
                setLibros(getAllBooks.data.response)
            }
        }
        catch(error){
            console.log(error)
        }
    }, [])

    const bookslist = libros.map((book) =>(
        <li className='book-list'>
               Título: {book.titulo} ID:{book.ID}
        </li>
    ))

    

    const generoList = genero.map((item) =>(
        <li key={item.genero} value={item.id} className='li-list'>
                {item.genero}
            <button generoid={item.ID} onClick={handleDelete} className='btn-borrar'>
                Borrar
            </button>
            <ul>
            {bookslist}
            </ul>
        </li> 
    ))
    
    return(
        <div className='conteinerList'>
            <ul className='ul-list'>
                {generoList}
            </ul>
            
        </div>
    )
}

export default ListaDeGeneros;
