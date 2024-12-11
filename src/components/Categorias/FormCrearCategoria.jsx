import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { schemaCategoria } from "../../services/validaciones"
import { Link } from "react-router-dom"
import { IconButton, Tooltip } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {ServiciosCrearCategoria} from '../../services/serviciosCrearCategoria'

export default function FormCrearCategoria() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemaCategoria)
    })

    const {handleSubmitCrear} = ServiciosCrearCategoria(reset)
    const handleSubmitAll = (data) => {
        handleSubmitCrear(data)
    }
    console.log(errors)

    return (
        <div className="flex items-center mb-3 ml-20">
            <Link to="/productos/categorias" className="font-semibold mr-2 bg-slate-300 rounded-full">
                <Tooltip>
                    <IconButton color="primary">
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Tooltip>
            </Link>
            <form action="" onSubmit={handleSubmit(handleSubmitAll)}>
                <input
                    type="text"
                    className={`form-control w-96 p-4 rounded-l-xl border-2 ${errors.categoria ? "border-red-500" : " border-gray-500"}`}
                    placeholder="Categoria"
                    aria-describedby="button-addon2"
                    {...register("categoria")}
                />
                <button
                    className="relative p-4 rounded-r-full border-2 border-black bg-black z-20 text-white"
                    type="submit"
                >
                    Button
                </button>
                {errors.categoria && <p className="ml-2 mt-1 text-red-500 font-medium">{errors.categoria.message}</p>}
            </form>
        </div>

    )
}