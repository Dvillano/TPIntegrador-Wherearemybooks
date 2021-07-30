//Buscar genero

import React,{useEffect,useState} from "react";
import { useSelector,useDispatch} from "react-redux";

import axios from "axios";

function Genero(props){
  const genero_id = props.genero_id
  const generos = useSelector(state=>state.generos)
  const [genero,setGenero] =useState({})
  const dispatch= useDispatch()
  const generoUrl = "http://localhost:4200/categoria"

  useEffect(async ()=>{
    if(generos.length==0){
      try{
        const response = await  axios.get(generoUrl)
        if(response.status==200){
          dispatch({type:"SET_GENEROS",generos:response.data.respuesta})
      }
      }
      catch(error){
          alert("Error inesperado")
          console.error(error)
     }
    }
    setGenero(generos.find(element=>element.ID == parseInt(genero_id)))   
  },[])

    return(<div>{genero.genero}</div>)
}
export default Genero