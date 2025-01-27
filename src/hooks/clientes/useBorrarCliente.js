import { useState } from "react";

export const useBorrarCliente = () => {
  const [error, setError] = useState(null);

  const borrarClienteReal = async (ids) => {

    try {
      const response = await fetch('http://localhost:8092/api/v1/cliente', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids), // Asegúrate de que `ids` sea un array
      });

      if (!response.ok) {
        // Manejo de error para respuestas no exitosas
        const errorMessage = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${errorMessage}`
        );
      }
     return response
    } catch (err) {
      console.error("Error al eliminar clientes:", err.message);
      setError(err.message); // Guarda el mensaje del error
    }
  };

  return { borrarClienteReal, error };
};
