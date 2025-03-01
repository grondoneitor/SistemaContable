import { Box, Toolbar, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import VentasServicios from "../../services/Ventas/ventasServicios";
import { SuccessOrError } from "../Messages/SuccessOrError";
import { useContext } from "react";
import { VentasContext } from "../../context/ventas";

// eslint-disable-next-line react/prop-types
export default function EncabezadoTablaVentas({ rowSelectionModel = [], setRowSelectionModel, setOpenEdit, setOpen }) {
    const { isMoved, isMistake, eliminarVentaServicio } = VentasServicios()
    const { state } = useContext(VentasContext)

    const borrar = async () => {
        await eliminarVentaServicio(rowSelectionModel)
        setRowSelectionModel([]);
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            className='bg-fuchsia-950 text-white rounded-t-3xl'
        >
            <Tooltip
                className='flex gap-4 text-white'
            >
                <div>
                    <FontAwesomeIcon onClick={() => setOpen(true)} className='hover:cursor-pointer text-2xl' icon={faPlus} />

                    {rowSelectionModel.length > 0 && <FontAwesomeIcon onClick={borrar} className='hover:cursor-pointer text-2xl' icon={faTrash} />}

                    {rowSelectionModel.length === 1 && <FontAwesomeIcon onClick={() => setOpenEdit(true)} className='hover:cursor-pointer text-2xl' icon={faPen} />}

                </div>
            </Tooltip>
            <Box
                className="flex gap-2"
            >
                <Typography variant="subtitle1" sx={{ ml: 2 }} className='text-2xl'>
                    {rowSelectionModel.length > 0
                        ? `${rowSelectionModel.length} `
                        : '-'}
                </Typography>
            </Box>

            {
                state.mensajeError ?
                    <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                    :
                    <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
            }
        </Toolbar>
    );

}