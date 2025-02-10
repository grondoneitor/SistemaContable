/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../services/validaciones";
import { useEffect } from "react";
import { ServiciosProducto } from "../../services/Productos/productoServicios";


export default function FormEditarProducto({ valores}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: valores
    });

    const { editarProductoServ, isMoved } = ServiciosProducto()
    useEffect(() => {
        reset(valores);
    }, [valores, reset]);

    const verdaderosValores = {
        id: valores.id,
        producto: valores.producto,
        descripcion: valores.descripcion,
        precio: valores.precio,
        stock: valores.stock,
        stock_Min: valores.stock_Min
    }

    const handleSubmitAll = async (producto) => {
        await editarProductoServ(producto)
        console.log(producto, " nuevooo")
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full">
                <form
                    onSubmit={handleSubmit(handleSubmitAll)} // Corrección
                    className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800 relative w-full"
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center mb-10">
                        Actualizar producto
                    </h2>

                    {Object.entries(verdaderosValores)
                        .filter(([clave]) => clave !== "id")
                        .map(([clave, valor]) => (

                            <div className="mb-5" key={clave}>
                                <label htmlFor={clave} className="text-sm uppercase font-bold">
                                    {clave}
                                </label>
                                <input
                                    {...register(clave)}
                                    id={clave}
                                    className="w-full p-3 border border-gray-100"
                                    type="text"
                                    placeholder={`Ingrese ${clave}`}
                                    defaultValue={valor ?? ""}
                                />
                                {errors[clave] && <p className="text-red-500">{errors[clave].message}</p>}
                            </div>
                        ))}

                    <button
                        type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    >
                        EDITAR PRODUCTO
                    </button>
                </form>

                <div
                    className={`transition-all duration-500 ease-linear  right-5
                     ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                     fixed bottom-5 mt-10 w-60 h-16 flex justify-center items-center bg-green-600 text-white shadow-lg rounded-lg`}
                >
                    <p>Producto actualizado con exito</p>
                </div>

            </div>
        </div>
    );
}
