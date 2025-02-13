/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCategoria } from "../../services/validaciones";
import { useForm } from "react-hook-form";
import { ServiciosCategoria } from "../../services/Categorias/serviciosCategoria";

export default function FormEditarCategoria({valores = []}) {
    
   const verdaderosValores = {
    id_Categoria: valores.id_Categoria,
    categoria: valores.categoria
}
    const { register, handleSubmit,formState: { errors }, reset} = useForm({
        resolver: yupResolver(schemaCategoria),
        defaultValues: valores
    });
    
     const { modificarCategoriaServ, isMoved } = ServiciosCategoria(reset);

   const handleSubmitAll = async (categoria) => {
    console.log(categoria)
       await modificarCategoriaServ(categoria)
}

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
                    .filter(([clave]) => clave !== "id_Categoria")
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
                    EDITAR CATEGORIA
                </button>
            </form>

            <div
                className={`transition-all duration-500 ease-linear  right-5
                 ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                 fixed bottom-5 mt-10 w-60 h-16 flex justify-center items-center bg-green-600 text-white shadow-lg rounded-lg`}
            >
                <p>Categoria actualizado con exito</p>
            </div>

        </div>
    </div>
);
}
