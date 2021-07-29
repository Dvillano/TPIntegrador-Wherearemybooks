import React, {useState} from "react";
import  Titulo  from "./ComponentsForm/Titulo";
import RespuestaForm from "./ComponentsForm/RespuestaForm";
import FormAdd from "./FormAdd"
import './formCss.css'

export default function CategoriaForm () {
    const [categoria, setCategoria] = useState('');
    const [data, setData] = useState('');
    

    return (
        <div className='form-container'>
            <Titulo />
            <FormAdd  setData={setData} categoria={categoria} setCategoria={setCategoria} />
            <RespuestaForm value={data} data={data}/>
        </div>
    )
}
