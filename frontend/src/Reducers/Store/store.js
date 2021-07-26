import {createStore} from "redux"

//Actions
//Cambiar libro splice en array de libros con index y datos en action
//SetLibros datos de libros en action 


const initialState={
 libros:[],
}

function reducer(state =initialState,action){
    switch(action.type){

      default:{return state}
    }
}

export default createStore(reducer)