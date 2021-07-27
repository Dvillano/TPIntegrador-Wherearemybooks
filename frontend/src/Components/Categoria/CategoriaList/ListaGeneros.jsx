import React, {useState, useEffect} from "react";
import axios from 'axios';

const ListaDeGeneros = () =>{

    const [ genero, setGenero ] = useState([])
    const [ libros, setLibros ] = useState([])

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
        const genero_id = e.target.attributes[0].value;
         try{
             const borrarGenero = await axios.delete(url + genero_id)
             if(borrarGenero.status === 200){
                console.log(borrarGenero)
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


    const Bookslist = ({generoid}) => {
        const booksFiltered = libros.filter((books) => books.genero_id == generoid)

        if(booksFiltered.length == 0){
            return(
                <p>Esta categoría no tiene libros asociados</p>
            )
        }
        else{
            return(
                libros.map((book) =>(
                    <li key={book.ID} className='book-list'>
                        Título: {book.titulo} ID:{book.ID}
                    </li>
                )) 
            )
        }
    }


    const GeneroList = () => genero.map((item) =>(
        <li key={item.ID} value={item.id} className='li-list'>
                {item.genero}
            <button generoid={item.ID} onClick={handleDelete} className='btn-borrar'>
                Borrar
            </button>
            <ul>
            <Bookslist generoid={item.ID} value={item.ID}/>
            </ul>
        </li> 
    ))
    
    return(
        <div className='conteinerList'>
            <ul className='ul-list'>
                <GeneroList />
            </ul>
        </div>
    )
}

export default ListaDeGeneros;
