import { useState, useEffect } from "react";

export default function CategoriaForm() {
    const [categoria, setCategoria] = useState('');

    function handleSubmit(event) {
        event.preventDefault()
        alert(`You entered ${categoria}`)
    }

    function handleChange(event){
        setCategoria(event.target.value)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="categoriaInput">Género nuevo</label>
                <input 
                    id="categoriaInput" 
                    type="text" 
                    onChange={handleChange}
                    value={categoría}
                />
            </div>
            <div className='btn-agregar'>
                <button type="submit">Agregar género</button>
            </div>
        </form>
    )
}

