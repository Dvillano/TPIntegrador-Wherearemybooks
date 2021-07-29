import React, {useState,useEffect} from "react";
import  Titulo  from "./ComponentsForm/Titulo";
import RespuestaForm from "./ComponentsForm/RespuestaForm";
import FormAdd from "./FormAdd"
import './formCss.css'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";


export default function CategoriaForm () {
    const [categoria, setCategoria] = useState('');
    const [data, setData] = useState('');
    const generos = useSelector(state=>state.generos)
    const categoria_url = "http://localhost:4200/categoria"
    const dispatch = useDispatch()
    
    useEffect(()=>{
      if(generos.length == 0){
        try {
            const fetchData=async()=>{
                const response =await axios.get(categoria_url)
                if(response.status == 200){
                    dispatch({type:"SET_GENEROS",generos:response.data.respuesta})
                }
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
      }
    },[])

    return (
        <div className='form-container'>
            <Titulo />
            <FormAdd  setData={setData} categoria={categoria} setCategoria={setCategoria} />
            <RespuestaForm value={data} data={data}/>
        </div>
    )
}
