import React from 'react';
import GenerosTitulo from './Titulo';
import ListarGeneros from './ListarGeneros';
import './style.css';

export default function Listado() {

    return (
        <div className="lista-container">
            <GenerosTitulo />
            <ListarGeneros />
        </div>
    )
}