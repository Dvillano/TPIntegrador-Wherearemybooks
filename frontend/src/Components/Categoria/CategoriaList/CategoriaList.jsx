import React from 'react';
import GenerosTitulo from './Titulo';
import ListaDeGeneros from './ListaGeneros';
import './list.css';

export default function CategoriaList() {
        
    return (
        <div className="list-container">
            <GenerosTitulo />
            <div className="list">
                <ListaDeGeneros />    
            </div>
        </div>
    
    )
}
