//Buscar genero

import React,{useEffect, useState} from "react";

import axios from "axios";

function Genero(props){
  const genero_id = props.genero_id
  const [genero,setGenero] = useState("");
  const generoUrl = "http://localhost:4200/genero/"+genero_id

  useEffect(()=>{
    axios.get(generoUrl).then(response=>{
        if(response.status==200){
            setGenero(response.data.respuesta[0].genero)
        }
    }).catch(error=>{
        //Manejo de error
        console.error(error)
    })
  },[])

    return(<div>{genero}</div>)
}
export default Genero