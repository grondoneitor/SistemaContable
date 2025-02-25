import {  useContext, useEffect, useState } from "react";
import { CategoriaContext } from "../../context/categorias";

export const useMapeandoCategorias = () => {
  const [error, setError] = useState(null);
  const { state,mostrarCategorias} = useContext(CategoriaContext)
  const token = localStorage.getItem("tokenLogin")
  useEffect(() => {
        fetch("http://localhost:8092/api/v1/categorias",{
          method:"GET",
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
        .then(response =>{
            if(!response.ok){
              throw response.json();
            }
            return response.json();
          })
        .then(data =>  mostrarCategorias(data.object))
        .catch(error => {
          setError(error);
        })
  }, [state.categoriaCreada, state.categoriaEditada, state.categoriaEliminada])

  return { error };
};
