import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "../../services/validaciones";
import { ServiciosProducto } from "../../services/Productos/productoServicios";
import { CategoriaContext } from "../../context/categorias";
import { useContext } from "react";
import { SuccessOrError } from "../Messages/SuccessOrError";
import { ProductoContext } from "../../context/productos";

// eslint-disable-next-line react/prop-types
export default function FormCrearProducto({ campos = [] }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const { crearProductoServ, isMoved, isMistake } = ServiciosProducto(reset);
    const { state } = useContext(CategoriaContext);
    const {state:stateProductos} = useContext(ProductoContext)
    const handleSubmitAll = async (producto) => {

        if (producto.categoria) {
            producto.categoria = JSON.parse(producto.categoria)
           
            producto.categoria.user  = null;
        }
        producto.stock_Min = Number(producto.stock_Min)
        await crearProductoServ(producto);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full">
                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg py-4 px-5 "
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center mb-10">
                        Crear nuevo producto
                    </h2>

                    {Array.isArray(campos) && campos.map(campo => (
                        <div className="mb-5" key={campo.id}>
                            <label htmlFor={campo.id} className="text-sm uppercase font-bold">
                                {campo.titulo}
                            </label>

                            {campo.id === "categoria" ? (
                                <select
                                    {...register(campo.id)}
                                    id={campo.id}
                                    className="w-full p-3 border border-gray-100"
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {state.categorias.map(cat => (
                                        <option key={cat.id} value={JSON.stringify(cat)}>
                                            {cat.categoria}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    {...register(campo.id)}
                                    id={campo.id}
                                    className="w-full p-3 border border-gray-100"
                                    type={campo.type}
                                    name={campo.id}
                                    placeholder={campo.placeholder}
                                />
                            )}

                            {errors[campo.id] && <p className="text-red-500">{errors[campo.id].message}</p>}
                        </div>
                    ))}

                    <button
                        className="bg-fuchsia-950 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors"
                    >
                        CREAR PRODUCTO
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
