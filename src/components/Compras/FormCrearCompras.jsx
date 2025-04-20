import { Controller, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ProductoContext } from "../../context/productos";
import { schemaCompras } from "../../services/validaciones";
import { yupResolver } from "@hookform/resolvers/yup";
import ComprasServicios from "../../services/Compras/ComprasServicios";
import { SuccessOrError } from "../Messages/SuccessOrError";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";
import FormCrearProveedor from "../Proveedores/FormCrearProveedor";
import { ProveedoresContext } from "../../context/proveedores";
import { ComprasContext } from "../../context/compras";
import ActivoOrNuevo from "../ActivoOrNuevo";
import { camposProveedores } from "../Proveedores/constantesProveedores.js"

// eslint-disable-next-line react/prop-types
export default function FormCrearCompras({ campos = [] }) {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: yupResolver(schemaCompras)
    });
    const { crearCompra, isMoved, isMistake } = ComprasServicios(reset);
    const { state: stateCompras } = useContext(ComprasContext)
    const { state } = useContext(ProductoContext)
    const { state: stateProveedores = [] } = useContext(ProveedoresContext)

    const [proveedorActual, setProveedorActual] = useState(null)
    const [creado, setCreado] = useState(false)

    const handleSubmitAll = async (compra) => {
        reset()
        setCreado(false);
        compra.proveedores = JSON.parse(compra.proveedores);
        compra.producto = JSON.parse(compra.producto);
        compra.costoEnvio = Number(compra.costoEnvio);
        compra.costoTotal = Number(compra.costoTotal);
        compra.cantidad = Number(compra.cantidad);
        compra.tipoTransaccion = "Compra";

        if (compra.proveedores) {
            compra.proveedores.user = null;
        }

        if (compra.producto) {
            compra.producto.user = null;
            compra.producto.categoria.user = null;
        }
        console.log(compra)

        await crearCompra(compra);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full">
                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg px-5 grid grid-cols-2 gap-4"
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center col-span-2">
                        Crear nueva compra
                    </h2>

                    {Array.isArray(campos) && campos.map((campo) => (
                        <div
                            key={campo.id}
                            className={campo.id === "proveedores" || campo.id === "producto" ? "col-span-2 mb-3" : "mb-3"}
                        >
                            <label htmlFor={campo.id} className="text-sm uppercase font-bold">
                                {campo.titulo}
                            </label>
                            {campo.id === "proveedores" && !creado ? (
                                <ActivoOrNuevo
                                    reset={reset}
                                    setCreado={setCreado}
                                    setActual={setProveedorActual}
                                    campos={camposProveedores}
                                    Componente={FormCrearProveedor}
                                />
                            ) : (creado && campo.id === "proveedores" ? (
                                <Controller
                                    control={control}
                                    name={campo.id}
                                    defaultValue={proveedorActual ? JSON.stringify(proveedorActual) : ""}
                                    render={({ field: { value, onChange, ref } }) => (
                                        <select
                                            id={campo.id}
                                            className="w-full p-3 border border-gray-100"
                                            value={value}
                                            onChange={onChange}
                                            ref={ref}
                                        >
                                            <option value="">Seleccione un proveedor</option>
                                            {stateProveedores.proveedores.map(proveedor => (
                                                <option key={proveedor.id} value={JSON.stringify(proveedor)}>
                                                    {capitalizeFirstLetter(proveedor.nombre)}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            ) : campo.id === "producto" ? (
                                <select
                                    {...register(campo.id)}
                                    id={campo.id}
                                    className="w-full p-3 border border-gray-100"
                                >
                                    <option value="">Seleccione un producto</option>
                                    {state.productos.map(pro => (
                                        <option key={pro.id} value={JSON.stringify(pro)}>
                                            {capitalizeFirstLetter(pro.producto)}
                                        </option>
                                    ))}
                                </select>
                            ) : campo.id === "pendiente" ? (
                                <select
                                    {...register(campo.id)}
                                    id={campo.id}
                                    className="w-full p-3 border border-gray-100"
                                >
                                    <option value={true}>Si</option>
                                    <option value={false}>No</option>
                                </select>
                            ) : (
                                <div className="grid  ">
                                    <input
                                        {...register(campo.id)}
                                        id={campo.id}
                                        className="w-full p-3 border border-gray-100"
                                        type={campo.type}
                                        name={campo.id}
                                        placeholder={campo.placeholder}
                                    />
                                </div>
                            ))}

                            {errors[campo.id] && <p className="text-red-500">{errors[campo.id].message}</p>}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="bg-fuchsia-950 w-full p-3 mb-2 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors col-span-2"
                    >
                        CREAR COMPRA
                    </button>
                </form>

                {
                    stateCompras.mensajeError ?
                        <SuccessOrError message={stateCompras.mensajeError} severity={"error"} moved={isMistake} />
                        :
                        <SuccessOrError message={stateCompras.mensajeExito} severity={"success"} moved={isMoved} />
                }
            </div>
        </div>
    );
}