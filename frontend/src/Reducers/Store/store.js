import {createStore} from "redux"

const initialState={
 libros:[],
 personas:[],
 generos:[]
}

function reducer(state =initialState,action){
    switch(action.type){
      case "SET_LIBROS":{
        return{
          libros:action.libros,
          personas:state.personas,
          generos:state.generos
        }
      }

      case "SET_PERSONAS":{
          return {
              personas:action.personas,
              libros:state.libros,
              generos:state.generos
          }
      }

      case "SET_GENEROS":{
        return{
          personas:state.personas,
          libros:state.libros,
          generos:action.generos
        }
      }
      
      default:
        return state
      
    }
}

export default createStore(reducer)