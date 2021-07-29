import {createStore} from "redux"

const initialState={
 libros:[],
 personas:[]
}

function reducer(state =initialState,action){
    switch(action.type){
      case "SET_LIBROS":{
        return{
          libros:action.libros
        }
      }

      case "SET_PERSONAS":{
          return {
              personas:action.personas
          }
      }
      
      default:
        return state
      
    }
}

export default createStore(reducer)