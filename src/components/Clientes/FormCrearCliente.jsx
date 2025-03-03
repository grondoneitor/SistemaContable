import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCliente } from "../../services/validaciones";
import ServiciosCliente from "../../services/Clientes/clienteServicios";
import { SuccessOrError } from "../Messages/SuccessOrError";
import { useContext } from "react";
import { ClienteContext } from "../../context/cliente";


// eslint-disable-next-line react/prop-types
export default function FormCrearCliente({ campos = [], nuevoCliente }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemaCliente)
    })
    const { state } = useContext(ClienteContext)
    const { CrearCliente, isMoved, isMistake } = ServiciosCliente(reset)
    const handleSubmitAll = async (cliente) => {
       const respuesta = await CrearCliente(cliente)
       if(respuesta) nuevoCliente(respuesta);
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
                        type="submit"
                        className="bg-fuchsia-950 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors"
                    >
                        CREAR CLIENTE
                    </button>
                </form>
                {
                    state.mensajeError ?
                        <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                        :
                        <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
                }
            </div>
        </div>
    );
}
