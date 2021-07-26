import React, { useState } from 'react';
import AceptarBtn from '../EditarLibro/AceptarBtn';

function NuevoLibro () {
    const apiUrl = 'http://localhost:4200/libro'
    return(
    <div>
        <h3>Ingresar nuevo libro</h3>
        <form>
            <label>Nombre</label>
            <input type="text" id="Nombre" name="Nombre" />
        
            <label>Descripcion</label>
            <input type="text" id="Descripcion" name="Descripcion" />
            
            <label>Categoria</label>
           <input type="text" id="Categoria" name="Categoria" />
           <AceptarBtn/>
        </form>
        </div>
        )

}

export default NuevoLibro
