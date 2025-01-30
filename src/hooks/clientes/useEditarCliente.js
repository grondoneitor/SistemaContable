
export const useEditarCliente = () => {


    const EditarClienteReal = async (cliente) => {
        console.log(cliente)
        try {
            if (cliente !== null) {
                const response = await fetch(`http://localhost:8092/api/v1/cliente/${cliente.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "direccion": cliente.direccion,
                        "dni": cliente.dni,
                        "mail": cliente.mail,
                        "nombre_Completo": cliente.nombre_Completo,
                        "telefono": cliente.telefono
                    })
                })
                return response

            }
        } catch (err) {
            throw new Error(err)
        }
    }

    return { EditarClienteReal }
}