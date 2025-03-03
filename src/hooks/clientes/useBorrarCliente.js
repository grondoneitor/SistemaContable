import { useContext} from "react";
import { ClienteContext } from "../../context/cliente";

export const useBorrarCliente = () => {
  const {mensajeError, mensajeExito} = useContext(ClienteContext)
  const borrarClienteReal = async (ids) => {
    mensajeError("")
    mensajeExito("")
    const token = localStorage.getItem("tokenLogin")
    console.log("aaca??")

    try {
      const response = await fetch('http://localhost:8092/api/v1/cliente', {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids)
      });

      const data = await response.json()
      if (!response.ok) {
        throw data
      }
      console.log(data)
      mensajeExito(data.mensaje)
     return response
    } catch (err) {
      mensajeError(err.message);
    }
  };

  return { borrarClienteReal};
};
