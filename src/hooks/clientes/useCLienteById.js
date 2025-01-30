import { useState } from "react";

export const useClienteById = () => {
  const [clientes, setClientes] = useState(null);

  const ClienteById = (id) => {
    return fetch(`http://localhost:8092/api/v1/cliente/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then((data) => {
        setClientes(data.object); // Actualizar el estado
        return data.object; // Retornar el cliente directamente si se necesita
      })
      .catch((err) => {
        console.error("Error al obtener el cliente:", err);
        throw err; // Propagar el error para manejarlo externamente
      });
  };

  return { ClienteById, clientes };
};
