import React from 'react';
import axios from 'axios';


export default function CategoriaList() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
        const respuesta = await axios.get('http://localhost:3000/categoria');
            if (respuesta.status === 200) {
            console.log(respuesta.data);
            setData(respuesta.data.response);
        }
      };
        fetchData()
      }, []);


        const lista = data.map((item)=>{
            return (
                <div className="list" key={item.id}>
                    <div className="listGenero">{item.genero}</div> 
                </div>
            )
        })
            return (
                <div className = 'container'>
                  {lista}
                </div>
              )
        }
    