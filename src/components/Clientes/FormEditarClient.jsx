import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCliente } from "../../services/validaciones";


// eslint-disable-next-line react/prop-types
export default function FormEditarCliente({ valores }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemaCliente)
    })

    // const { CrearCliente, isMoved } = ServiciosCrearCliente(reset)
    // const handleSubmitAll = async (cliente) => {
    //     await CrearCliente(cliente)
    // }
        return(
            <div className="flex items-center justify-center  w-full ">
                <div className=" w-full">


                    <form
                        // onSubmit={handleSubmit(handleSubmitAll)}
                        className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800 relative w-full"
                        noValidate
                    >
                        <h2 className="font-black text-3xl text-slate-800 text-center mb-10">Actualizar cliente</h2>
                        {
                       
                            Object.entries(valores).map(([clave, valor]) =>(
                                <div className="mb-5" key={clave}>
                                <label htmlFor={clave} className="text-sm uppercase font-bold">
                                    {clave}
                                </label>
                                <input
                                    id={clave}
                                    className="w-full p-3 border border-gray-100"
                                    type="text"  // Ajusta el tipo según necesites
                                    name={clave}
                                    defaultValue={valor}
                                    // {...(clave == valores.id ? console.log(clave + " asda") : {})} // Falta poder registrar en useForm el input
                                    placeholder={`Ingrese ${clave}`}
                                />
                            </div>
                            ))}
                        <button
                            //  type="submit"
                            type="button"
                            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                        >
                            EDITAR CLIENTE
                        </button>
                    </form>
                    {/* 
                <div
                    className={`transition-all duration-500 ease-linear  right-5
                     ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                     fixed bottom-5 mt-10 w-60 h-16 flex justify-center items-center bg-green-600 text-white shadow-lg rounded-lg`}
                >
                    <p>Cliente creado con exito</p>
                </div> */}
                </div>
            </div>
        );
}
