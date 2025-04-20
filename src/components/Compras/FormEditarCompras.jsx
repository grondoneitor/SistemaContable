/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductoContext } from "../../context/productos";
import { ProveedoresContext } from "../../context/proveedores";
import ComprasServicios from "../../services/Compras/ComprasServicios";
import { ComprasContext } from "../../context/compras";
import { SuccessOrError } from "../Messages/SuccessOrError";
import { schemaCompras } from "../../services/validaciones";

export default function FormEditarCompra({ valores }) {
    const { register, setValue, reset, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schemaCompras),
        defaultValues: valores
    });
    console.log(valores)
    const valoresVerdaderos = {
        producto: valores.producto.producto,
        proveedores: valores.proveedores.nombre,
        cantidad: valores.cantidad,
        precioUnidad: valores.precioUnidad,
        costoEnvio: valores.costoEnvio,
        fecha: (valores.fecha).split("T")[0],
        costoTotal: valores.costoTotal,
        pendiente: valores.pendiente,
    };
    const { isMoved, isMistake, modificarCompraservicio } = ComprasServicios();

    const handleSubmitAll = async (compra) => {
        compra.id = valores.id;
        compra.proveedores = JSON.parse(compra.proveedores);
        compra.producto = JSON.parse(compra.producto);
        compra.costoTotal = Number(compra.costoTotal);
        compra.cantidad = Number(compra.cantidad);
        compra.fecha = (compra.fecha).split("T")[0];
        compra.tipoTransaccion = valores.tipoTransaccion;
        if (compra.proveedores) {
            compra.proveedores.user = null;
        }

        if (compra.producto) {
            compra.producto.user = null;
            compra.producto.categoria.user = null;
        }
        console.log(compra)
        await modificarCompraservicio(compra);
    };

    const { state } = useContext(ComprasContext);
    const { state: stateProveedores } = useContext(ProveedoresContext);
    const { state: stateProductos } = useContext(ProductoContext);

    useEffect(() => {
        reset(valoresVerdaderos);
        if (valores.producto) setValue('producto', JSON.stringify(valores.producto));
        if (valores.cliente) setValue('proveedores', JSON.stringify(valores.proveedores));
    }, [valores, reset, setValue]);

    return (
        <form
            onSubmit={handleSubmit(handleSubmitAll)}
            className="bg-white shadow-md rounded-lg px-5 grid grid-cols-2 gap-4"
            noValidate
        >
            <h2 className="font-black text-3xl text-slate-800 text-center col-span-2">
                Editar Compra
            </h2>

            {Object.entries(valoresVerdaderos).map(([key, value]) => (
                <div key={key} className={key === "proveedores" || key === "producto" ? "col-span-2 mb-3" : "mb-3"}>
                    <label htmlFor={key} className="text-sm uppercase font-bold">
                        {key}
                    </label>
                    {key === "proveedores" ? (
                        <Controller
                            control={control}
                            name={key}
                            defaultValue={JSON.stringify(valores.proveedores)}
                            render={({ field: { value, onChange, ref } }) => (
                                <select
                                    id={key}
                                    className="w-full p-3 border border-gray-100"
                                    value={value}
                                    onChange={onChange}
                                    ref={ref}
                                >
                                    <option value="">Seleccione un proveedor</option>
                                    {stateProveedores.proveedores.map(proveedor => (
                                        <option key={proveedor.id} value={JSON.stringify(proveedor)}>
                                            {proveedor.nombre}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    ) : key === "producto" ? (
                        <select {...register(key)} id={key} className="w-full p-3 border border-gray-100">
                            <option value="">Seleccione un producto</option>
                            {stateProductos.productos.map(producto => (
                                <option key={producto.id} value={JSON.stringify(producto)}>
                                    {producto.producto}
                                </option>
                            ))}
                        </select>
                    ) : key === "pendiente" ? (
                        <select {...register(key)} id={key} className="w-full p-3 border border-gray-100">
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                    ) : (
                        <input
                            {...register(key)}
                            id={key}
                            className="w-full p-3 border border-gray-100"
                            type={key === "fecha" ? "date" : typeof value === "number" ? "number" : "text"}
                            placeholder={key}
                        />
                    )}
                    {errors[key] && <p className="text-red-500">{errors[key].message}</p>}
                </div>
            ))}

            <button
                type="submit"
                className="bg-fuchsia-950 w-full p-3 mb-2 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors col-span-2"
            >
                EDITAR COMPRA
            </button>

            {state.mensajeError ? (
                <SuccessOrError message={state.mensajeError} severity="error" moved={isMistake} />
            ) : (
                <SuccessOrError message={state.mensajeExito} severity="success" moved={isMoved} />
            )}
        </form>
    );
}
