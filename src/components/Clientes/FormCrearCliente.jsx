import { Link } from "react-router-dom";
import { ServiciosCrear } from "../../services/serviciosCrear";
import { useContext, useEffect, useState } from "react";
import { CategoriaContext } from "../../context/categorias";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, schemaCliente } from "../../services/validaciones";
import { ModalContext } from "../../context/modal";
import  ServiciosCrearCliente  from "../../services/Clientes/crearCliente";

export default function FormCrearCliente() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemaCliente)
    })
    // // const { state: stateModal, openModal, closeModalCreate } = useContext(ModalContext)
    // const { onSubmit,respons} = ServiciosCrear(reset)
    // const { state } = useContext(CategoriaContext)
    // const [isMoved, setIsMoved] = useState(respons)


    //  const functionMoved = () => {
    //      if (respons ) {
    //          setIsMoved(respons)
    //          setTimeout(() => {
    //              setIsMoved(false)
    //          }, 2000)
    //      }
    //  }

    //  useEffect(()=>{
    //     functionMoved() 
    //  // eslint-disable-next-line react-hooks/exhaustive-deps
    //  },[respons])
    const {CrearCliente} = ServiciosCrearCliente()
    const handleSubmitAll = (data) => {
        CrearCliente(data)
    }

    return (
        <div className="flex items-center justify-center  w-full ">
            <div className=" w-full">



                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800 relative w-full"
                    noValidate

                >
                    <div className="flex space-x-16">
                        <button
                            //  onClick={closeModalCreate} 
                            className='flex items-center mb-6' type="button"  >
                            <Link  >
                                <svg className=' size-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                            </Link>
                        </button>
                        <h2 className="font-black text-3xl text-slate-800 text-center mb-10">Crear nuevo nombre</h2>

                    </div>
                    <div className="mb-5">
                        <label htmlFor="nombre" className="text-sm uppercase font-bold">
                            Nombre
                        </label>
                        <input
                            {...register("nombre")}
                            id="nombre"
                            className="w-full p-3 border border-gray-100"
                            type="text"
                            name="nombre"
                            placeholder="Nombre del cliente"
                        />
                        {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="mail" className="text-sm uppercase font-bold">
                            Mail
                        </label>
                        <input
                            {...register("mail")}
                            id="mail"
                            className="w-full p-3 border border-gray-100"
                            name="mail"
                            type="email"
                            placeholder="Mail del cliente"
                        />
                        {errors.mail && <p className="text-red-500">{errors.mail.message}</p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="telefono" className="text-sm uppercase font-bold">
                            Telefono
                        </label>
                        <input
                            name="telefono"
                            id="telefono"
                            type="text"
                            className="w-full p-3 border border-gray-100"
                            placeholder="Telefono del cliente"
                            {...register("telefono")}
                        >
                        </input>
                        {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}

                    </div>

                    <div className="mb-5">
                        <label htmlFor="direccion" className="text-sm uppercase font-bold">
                            Direccion
                        </label>
                        <input
                            id="direccion"
                            className="w-full p-3 border border-gray-100"
                            name="direccion"
                            placeholder="Direccion del cliente"
                            type="text"
                            {...register("direccion")}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="dni" className="text-sm uppercase font-bold">
                            DNI
                        </label>
                        <input
                            {...register("dni")}
                            id="dni"
                            className="w-full p-3 border border-gray-100"
                            name="dni"
                            placeholder="DNI del cliente"
                            type="text"

                        />
                        {errors.dni && <p className="text-red-500">{errors.dni.message}</p>}
                    </div>

                    <button
                        //  type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    >
                        CREAR CLIENTE
                    </button>
                </form>

                <div
                //  className={`transition-all duration-500 ease-linear  right-5 
                //     ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"} 
                //     fixed bottom-5 mt-10 w-60 h-16 flex justify-center items-center bg-green-600 text-white shadow-lg rounded-lg`}
                >
                    <p>Producto creado con exito</p>
                </div>
            </div>
        </div>
    );
}
