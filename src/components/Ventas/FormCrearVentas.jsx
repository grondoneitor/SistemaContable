

import { Controller, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ProductoContext } from "../../context/productos";
import { ClienteContext } from "../../context/cliente";
import { schemaVentas } from "../../services/validaciones";
import { yupResolver } from "@hookform/resolvers/yup";
import VentasServicios from "../../services/Ventas/ventasServicios";
import { SuccessOrError } from "../Messages/SuccessOrError";
import { VentasContext } from "../../context/ventas";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";
import { camposClientes } from '../Clientes/constantesClientes'
import FormCrearCliente from "../Clientes/FormCrearCliente";
import ActivoOrNuevo from "../ActivoOrNuevo";

// eslint-disable-next-line react/prop-types
export default function FormCrearVentas({ campos = [] }) {

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: yupResolver(schemaVentas)
    });
    const { crearVenta, isMoved, isMistake } = VentasServicios(reset);
    const { state: stateVentas } = useContext(VentasContext)
    const { state } = useContext(ProductoContext);
    const { state: stateClientes } = useContext(ClienteContext)


    const [clienteActual, setClienteActual] = useState(null)
    const [creado, setCreado] = useState(false)

    const handleSubmitAll = async (venta) => {
        reset()
        setCreado(false);
        // setOpen(false)
        venta.cliente = JSON.parse(venta.cliente);
        venta.producto = JSON.parse(venta.producto);
        venta.precioTotal = Number(venta.precioTotal);
        venta.cantidad = Number(venta.cantidad);
        venta.tipoTransaccion = "Venta";


        const clienteEncontrado = stateClientes.clientes.find(cliente => cliente.id === venta.cliente);
        if (clienteEncontrado) {
            venta.cliente = clienteEncontrado;
            venta.cliente.user = null;
        }

        if (venta.producto) {
            venta.producto.user = null;
            venta.producto.categoria.user = null;
        }
        console.log("ventaa ",venta)

        await crearVenta(venta);
    };




    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full">
                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg  px-5 "
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center ">
                        Crear nueva venta
                    </h2>

                    {Array.isArray(campos) && campos.map(campo => (
                        <div className="mb-3" key={campo.id}>
                            <label htmlFor={campo.id} className="text-sm uppercase font-bold">
                                {campo.titulo}
                            </label>
                            {campo.id === "cliente" && !creado ? (

                                <>
                                    <ActivoOrNuevo
                                        reset={reset}
                                        setCreado={setCreado}
                                        setActual={setClienteActual}
                                        campos={camposClientes}
                                        Componente={FormCrearCliente}
                                    />
                                </>

                            ) : (creado && campo.id === "cliente" ?
                                (<>
                                    {creado && campo.id === "cliente" && (

                                        <Controller
                                            control={control}
                                            name={campo.id}
                                            defaultValue={clienteActual ? clienteActual.id : ""}
                                            render={({ field: { value, onChange, ref } }) => (
                                                <select
                                                    id={campo.id}
                                                    className="w-full p-3 border border-gray-100"
                                                    value={value}
                                                    onChange={onChange}
                                                    ref={ref}
                                                >
                                                    <option value="">Seleccione un cliente</option>
                                                    {stateClientes.clientes.map(cliente => (
                                                        <option key={cliente.id} value={JSON.stringify(cliente.id)}>
                                                            {capitalizeFirstLetter(cliente.nombre_Completo)}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        />

                                    )}

                                </>)
                                : (campo.id === "producto" ? (
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
                                ) : (campo.id === "pendiente" ?
                                    <>
                                        <select
                                            {...register(campo.id)}
                                            id={campo.id}
                                            className="w-full p-3 border border-gray-100"
                                        >

                                            <option value={true}>
                                                Si
                                            </option>
                                            <option value={false}>
                                                No
                                            </option>
                                        </select>
                                    </>
                                    :

                                    ((
                                        <input
                                            {...register(campo.id)}
                                            id={campo.id}
                                            className="w-full p-3 border border-gray-100"
                                            type={campo.type}
                                            name={campo.id}
                                            placeholder={campo.placeholder}
                                        />
                                    ))

                                )

                                ))}

                            {errors[campo.id] && <p className="text-red-500">{errors[campo.id].message}</p>}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="bg-fuchsia-950 w-full p-3 mb-2 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors"
                    >
                        CREAR VENTA
                    </button>
                </form>

                {
                    stateVentas.mensajeError ?
                        <SuccessOrError message={stateVentas.mensajeError} severity={"error"} moved={isMistake} />
                        :
                        <SuccessOrError message={stateVentas.mensajeExito} severity={"success"} moved={isMoved} />
                }
            </div>
        </div>
    );
}
