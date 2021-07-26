const Respuesta = ({data}) =>{
    const dataRes = {
        categoria: data.categoria,
        id: data.id
    };
    const dataError = {
        Error: data.Error
    }
    if(dataRes.id > 0) {
        return(
        <p className='p-form-res'>Se ha cargado la categoría {dataRes.categoria} y  su ID es : {dataRes.id}</p>
        )
    }
    else {
        return(
           <p> {dataError.Error} </p>
        )
    }

}

export default Respuesta;