/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCliente } from "../../services/validaciones";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function FormEditarCliente({ valores }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemaCliente),
        defaultValues: valores
    });

    // 🔹 Actualiza valores cuando cambian
    useEffect(() => {
        reset(valores);
    }, [valores, reset]);

    const handleSubmitAll = (cliente) => {
        console.log("Datos enviados:", cliente);
    };

    const verdaderosValores = {
        id: valores.id,
        nombre:valores.nombre_Completo,
        direccion:valores.direcion,
        dni :valores.dni,
        mail: valores.mail,
        telefono:valores.telefono
    }

    console.log(verdaderosValores); // Debug para ver errores

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full">
                <form
                    onSubmit={handleSubmit(handleSubmitAll)} // Corrección
                    className="bg-white shadow-md rounded-lg py-4 px-5 border border-indigo-800 relative w-full"
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center mb-10">
                        Actualizar cliente
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
                        EDITAR CLIENTE
                    </button>
                </form>
            </div>
        </div>
    );
}
