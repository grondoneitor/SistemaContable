// import { useContext, useEffect } from "react"
// import { ClienteContext } from "../../context/cliente"

// export const useClientes = ()=> {
//     const {state,guardarClientes} = useContext(ClienteContext)
//     useEffect(()=>{
//         fetch("http://localhost:8092/api/v1/clientes")
//           .then(response =>{
//              return response.json()
//           })
//           .then(data => guardarClientes(data.object))
//           .catch(error => console.error(error))
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[state.clienteCreadoNuevo, state.clientesBorrados, state.clienteParaEditar])
// }
import { useContext, useEffect } from "react";
import { ClienteContext } from "../../context/cliente";

export const useClientes = () => {
  const { state, guardarClientes } = useContext(ClienteContext);
  // const { state: stateAuth} = useContext(AuthContext)
  useEffect(() => {

   const storage = localStorage.getItem("tokenLogin")


    fetch("http://localhost:8092/api/v1/clientes", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${storage}`, // 🔥 Agrega el token al header
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(!response.ok) throw response.json()
        return response.json();
      })
      .then((data) =>{
        guardarClientes(data.object)}
      )
      .catch((error) => console.error("Error:", error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.clienteCreadoNuevo, state.clientesBorrados, state.clienteParaEditar]);
};
