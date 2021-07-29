//Buscar genero

import React,{useEffect, useState} from "react";
import { useSelector,useDispatch} from "react-redux";

import axios from "axios";

function Genero(props){
  const genero_id = props.genero_id
  const generos = useSelector(state=>state.generos)
  const genero =generos.find(element=>element.ID == parseInt(genero_id))
  const dispatch= useDispatch()
//  const [genero,setGenero] = useState("");
  const generoUrl = "http://localhost:4200/categoria"

  useEffect(async ()=>{
    if(generos.length==0){
      try{
        const response = await  axios.get(generoUrl)
        if(response.status==200){
          dispatch({type:"SET_GENEROS",generos:response.data.respuesta})
      }
      }catch(error){
          //Manejo de error
          alert("Error inesperado")
          console.error(error)
     }
    }
  },[])

    return(<div>{genero.genero}</div>)
}
export default Genero