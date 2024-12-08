import { Link } from "react-router-dom";
import { ServiciosCrear } from "../../services/serviciosCrear";
import { useContext, useEffect, useState } from "react";
import { CategoriaContext } from "../../context/categorias";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "../../services/validaciones";
import { useMapeandoCategorias } from "../../hooks/useMapeandoCategorias";
import { ModalContext } from "../../context/modal";

export default function FormCrearProducto() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const { state: stateModal, openModal, closeModalCreate } = useContext(ModalContext)
    const { onSubmit,respons} = ServiciosCrear(reset)
    const { state } = useContext(CategoriaContext)
    const [isMoved, setIsMoved] = useState(respons)
    useMapeandoCategorias()


     const functionMoved = () => {
         if (respons ) {
             setIsMoved(respons)
             setTimeout(() => {
                 setIsMoved(false)
             }, 2000)
         }
     }
   
     useEffect(()=>{
        functionMoved() 
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[respons])
   
    const handleSubmitAll = async(data)=>{
       await onSubmit(data)
       functionMoved()
    }

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="md:w-1/2 lg:w-2/5 mx-5 w-full">
                <h2 className="font-black text-3xl text-slate-800 text-center mb-10">Crear nuevo producto</h2>

                {/* <p className="text-lg mt-5 text-center mb-10 text-slate-800 font-semibold">
                    Añade Productos y {''}
                    <span className="text-indigo-600 font-bold">Administralos</span>
                </p> */}

                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg py-4 px-5 mb-10 border border-indigo-800 relative"
                    noValidate

                >
                    <button onClick={closeModalCreate} className='flex items-center mb-6' type="button"  >
                        <Link  >
                            <svg className=' size-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </Link>
                    </button>
                    <div className="mb-5">
                        <label htmlFor="producto" className="text-sm uppercase font-bold">
                            Producto
                        </label>
                        <input
                            {...register("producto")}
                            id="producto"
                            className="w-full p-3 border border-gray-100"
                            type="text"
                            name="producto"
                            placeholder="Nombre del producto"
                        />
                        {errors.producto && <p className="text-red-500">{errors.producto.message}</p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="precio" className="text-sm uppercase font-bold">
                            Precio
                        </label>
                        <input
                            {...register("precio")}
                            id="precio"
                            className="w-full p-3 border border-gray-100"
                            name="precio"
                            type="number"
                            placeholder="Precio del producto"
                        />
                        {errors.precio && <p className="text-red-500">{errors.precio.message}</p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="categoria" className="text-sm uppercase font-bold">
                            Categoria
                        </label>
                        <select name="categoria" id="categoria"  {...register("categoria")}>
                            <option value="">Selecciona una categoría</option>
                            {state.categorias.map(cat => (
                                <option key={cat.id_Categoria} value={cat.id_Categoria}>
                                    {cat.categoria}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="descripcion" className="text-sm uppercase font-bold">
                            Descripcion
                        </label>
                        <textarea
                            id="descripcion"
                            className="w-full p-3 border border-gray-100"
                            name="descripcion"
                            placeholder="Descripcion del producto"
                            {...register("descripcion")}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="stock" className="text-sm uppercase font-bold">
                            Stock Actual
                        </label>
                        <input
                            {...register("stock")}
                            id="stock"
                            className="w-full p-3 border border-gray-100"
                            name="stock"
                            placeholder="Stock actual de este producto"
                            type="number"

                        />
                        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="stock_Min" className="text-sm uppercase font-bold">
                            Stock minimo
                        </label>
                        <input
                            id="stock_Min"
                            type="number"
                            className="w-full p-3 border border-gray-100"
                            name="stock_Min"
                            placeholder="Stock minimo de este producto"
                            {...register("stock_Min")}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                        >
                        Guardar Producto
                    </button>
                </form>

                <div
                     className={`transition-all duration-500 ease-linear  right-5 
                        ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"} 
                        fixed bottom-5 mt-10 w-60 h-16 flex justify-center items-center bg-green-600 text-white shadow-lg rounded-lg`}
                >
                    <p>Producto creado con exito</p>
                </div>
            </div>
        </div>
    );
}
