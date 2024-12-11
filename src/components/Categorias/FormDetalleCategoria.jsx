import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCategoria } from "../../services/validaciones";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { CategoriaContext } from "../../context/categorias";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";

export default function FormDetalleCategoria() {
    const { register, handleSubmit, setValue} = useForm({
        resolver: yupResolver(schemaCategoria),
    });
    const { state } = useContext(CategoriaContext);
    // Actualizar el valor inicial del input cuando cambia la categoría seleccionada
    useEffect(() => {
        if (state.categoriaSeleccionada) {
            const nombreCategoria = capitalizeFirstLetter(state.categoriaSeleccionada.categoria);
            setValue("categoria", nombreCategoria); // Sincronizar con react-hook-form
        }
    }, [state.categoriaSeleccionada, setValue]);
     
    return (
        <div className="flex items-center mb-3 ml-20">
            <Link to="/productos/categorias" className="font-semibold mr-2 -ml-12 -mt-16 absolute bg-slate-300 rounded-full">
                <Tooltip>
                    <IconButton color="primary">
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Tooltip>
            </Link>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <input
                    type="text"
                    className="form-control w-96 p-4 rounded-xl border-2 border-gray-500"
                    placeholder="Categoria"
                    defaultValue={state.categoriaSeleccionada?.categoria} // Permite edición inicial
                    {...register("categoria")} // Sincronizado con react-hook-form
                />
                <div className="w-full flex mt-3 gap-1">
                    <button
                        className="relative p-4 border-2 w-1/2 rounded-xl border-white bg-slate-400 z-20 font-semibold text-black"
                        type="submit"
                    >
                        Editar
                    </button>
                <button
                        className="relative p-4 w-1/2 border-2 rounded-xl border-white bg-slate-400 z-20 font-semibold text-black"
                        type="submit"
                    >
                        Borrar
                    </button>
                </div>
            </form>
        </div>
    );
}
