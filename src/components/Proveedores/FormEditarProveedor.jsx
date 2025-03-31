/* eslint-disable react/prop-types */

import { useContext, useEffect } from "react";
import { ProveedoresContext } from "../../context/proveedores";
import { ServiciosProveedores } from "../../services/Proveedor/proveedorServicios";
import { SuccessOrError } from "../Messages/SuccessOrError";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProveedor } from "../../services/validaciones";
import { useForm } from "react-hook-form";

export default function FormEditarProveedor({ valores }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemaProveedor),
        defaultValues: valores
    });

    const { state } = useContext(ProveedoresContext);
    const { editarProveedorServ, isMoved, isMistake } = ServiciosProveedores();

    useEffect(() => {
        reset(valores);
    }, [valores, reset]);

    const handleSubmitAll = async (proveedor) => {
        await editarProveedorServ(proveedor);
    };

    const verdaderosValores = {
        id: valores.id,
        nombre: valores.nombre,
        contacto: valores.contacto,
        rubro: valores.rubro
    }


    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full">
                <form
                    onSubmit={handleSubmit(handleSubmitAll)} 
                    className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800 relative w-full"
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center mb-10">
                        Actualizar proveedor
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
                        className="bg-fuchsia-950 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors"
                    >
                        EDITAR PROVEEDOR
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








