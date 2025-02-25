/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../services/validaciones";
import { useContext, useEffect } from "react";
import { ServiciosProducto } from "../../services/Productos/productoServicios";
import { CategoriaContext } from "../../context/categorias";
import { ProductoContext } from "../../context/productos";
import { SuccessOrError } from "../Messages/SuccessOrError";

export default function FormEditarProducto({ valores }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: valores
    });

    const { state } = useContext(CategoriaContext);
    const { state: stateProductos } = useContext(ProductoContext)
    const { editarProductoServ, isMoved, isMistake } = ServiciosProducto();
    // const {state} = useContext(ClienteContext)


    useEffect(() => {
        reset(valores);
        if (valores.categoria) {
            setValue("categoria", JSON.stringify(valores.categoria));  // Seteamos la categoría de forma manual
        }

    }, [valores, reset, setValue]);
    const verdaderosValores = {
        id: valores.id,
        producto: valores.producto,
        descripcion: valores.descripcion,
        precio: valores.precio,
        stock: valores.stock,
        stock_Min: valores.stock_Min,
        categoria: valores.categoria
    }
    const handleSubmitAll = async (producto) => {
        if (producto.categoria) {
            producto.categoria = JSON.parse(producto.categoria);
            producto.categoria.user = null;
            producto.user = null;
            console.log(producto.user)

        }
        console.log("producto", producto)
        await editarProductoServ(producto);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full">
                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800 relative w-full"
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center mb-10">
                        Actualizar producto
                    </h2>

                    {Object.entries(verdaderosValores)
                        .filter(([clave]) => clave !== "id")
                        .map(([clave]) => {
                            return clave === "categoria" ? (
                                <div>
                                    <label htmlFor={clave} className="text-sm uppercase font-bold">
                                        {clave}
                                    </label>
                                    <select
                                        {...register(clave)}
                                        id="categoria"
                                        className="w-full p-3 border border-gray-100"
                                    >
                                        <option value={JSON.stringify(null)}>Sin categoria</option>
                                        {state.categorias.map(cat => (
                                            <option key={cat.id_Categoria} value={JSON.stringify(cat)}>
                                                {cat.categoria}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
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
                                    />
                                    {errors[clave] && <p className="text-red-500">{errors[clave].message}</p>}
                                </div>
                            );
                        })}

                    <button
                        type="submit"
                        className="bg-fuchsia-950 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors"
                    >
                        EDITAR PRODUCTO
                    </button>
                </form>

                {
                    stateProductos.mensajeError ?
                        <SuccessOrError message={stateProductos.mensajeError} severity={"error"} moved={isMistake} />
                        :
                        <SuccessOrError message={stateProductos.mensajeExito} severity={"success"} moved={isMoved} />
                }
            </div>
        </div>
    );
}
