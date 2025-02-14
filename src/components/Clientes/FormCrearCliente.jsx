import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCliente } from "../../services/validaciones";
import ServiciosCliente from "../../services/Clientes/clienteServicios";
import { Alert } from "@mui/material";


// eslint-disable-next-line react/prop-types
export default function FormCrearCliente({ campos = [] }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemaCliente)
    })

    const { CrearCliente, isMoved } = ServiciosCliente(reset)
    const handleSubmitAll = async (cliente) => {
        await CrearCliente(cliente)
    }

    return (
        <div className="flex items-center justify-center  w-full ">
            <div className=" w-full">


                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800 relative w-full"
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center mb-10">Crear nuevo cliente</h2>
                    {Array.isArray(campos) && campos.map(campo => (

                        <div className="mb-5" key={campo.id}>
                            <label htmlFor={campo.id} className="text-sm uppercase font-bold">
                                {campo.titulo}
                            </label>
                            <input
                                {...register(campo.id)}
                                id={campo.id}
                                className="w-full p-3 border border-gray-100"
                                type={campo.type}
                                name={campo.id}
                                placeholder={campo.placeholder}
                            />
                            {errors[campo.id] && <p className="text-red-500">{errors[campo.id].message}</p>}
                        </div>
                    ))}
                    <button
                        //  type="submit"
                        className="bg-fuchsia-950 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors"
                    >
                        CREAR CLIENTE
                    </button>
                </form>

                <Alert
                    variant="filled"
                    severity="success"
                    className={`transition-all duration-500 ease-linear w-64  right-5
                   ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                   fixed bottom-5 mt-10  h-16 flex justify-center items-center  `}
                >
                    <p>Cliente creado con exito</p>
                </Alert>
            </div>
        </div>
    );
}
