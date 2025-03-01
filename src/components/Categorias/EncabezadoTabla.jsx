import {  Toolbar, Tooltip, Typography } from "@mui/material";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ServiciosCategoria } from "../../services/Categorias/serviciosCategoria.js";
import { SuccessOrError } from "../Messages/SuccessOrError.jsx";
import { useContext } from "react";
import { CategoriaContext } from "../../context/categorias.jsx";

// eslint-disable-next-line react/prop-types
export default function EncabezadoTabla({ setOpen, rowSelectionModel: rows = [], setOpenEdit }) {
    const { borrarCategoriaServ, isMoved, isMistake } = ServiciosCategoria()
    const { state } = useContext(CategoriaContext)


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            className='bg-fuchsia-950 text-white rounded-t-3xl'
        >
            <Tooltip
                className='flex gap-4'
            >
                <div>

                    <FontAwesomeIcon
                        onClick={() => setOpen(true)}
                        className='hover:cursor-pointer text-2xl'
                        icon={faPlus} />

                    {rows.length > 0 && <FontAwesomeIcon
                        onClick={async () => await borrarCategoriaServ(rows)}
                        className='hover:cursor-pointer text-2xl'
                        icon={faTrash}
                    />}

                    {rows.length === 1 && <FontAwesomeIcon
                        onClick={() => setOpenEdit(true)}
                        className='hover:cursor-pointer text-2xl'
                        icon={faPen}
                    />}
                </div>

            </Tooltip>

            <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {rows.length > 0
                    ? `${rows.length}`
                    : '-'}
            </Typography>



            {
                state.mensajeError ?
                    <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                    :
                    <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
            }
        </Toolbar>
    );
}