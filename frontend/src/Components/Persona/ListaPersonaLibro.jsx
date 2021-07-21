import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const apiUrl = 'http://localhost:4200/persona/'

export default function ListaPersonaLibro() {

    return(
        <>
            <h1>Nombre: </h1>
            <ul>
                <li>
                    <p>Titulo: </p>
                </li>
            </ul>
            
        </>
    )
}
