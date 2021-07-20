import { useState, useEffect } from 'react'

export default function CategoriaList() {

    const [categoria, categoriaList] = useState('');
        return (
            <div className='container'>
                <ul>
                    {categoria.map(item => (
                        <CategoriaList 
                        key={item.id}
                        categoria={item.nombre}
                        />
                    )
                    )
                    }
                </ul>
            </div>
        )

}