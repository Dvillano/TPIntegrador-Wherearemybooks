import {createStore} from "redux"
import axios from "axios"

//Actions

//TODO:
//modificando estado directamente
const librosUrl = "http://localhost:4200/libro"

const initialState={
 libros:[],
}

function reducer(state =initialState,action){
    switch(action.type){
      case "SET_LIBROS":{
        return{
          libros:action.libros
        }
      }
      default:
        return state
      
    }
}

export default createStore(reducer)