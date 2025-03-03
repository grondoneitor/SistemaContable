/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Toolbar, Tooltip, Typography } from "@mui/material"
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { SuccessOrError } from "./Messages/SuccessOrError"


export default function Encabezado({ setOpen, setOpenEdit, rowSelectionModel: rows = [],setRowSelectionModel,  Borrar, isMoved, isMistake,state=[], Componente  }) {

    const borrar = async () => {
        await Borrar(rows)
        setRowSelectionModel([])
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
            <Tooltip className='flex gap-4 text-white'>
                <FontAwesomeIcon onClick={() => setOpen(true)} className='hover:cursor-pointer text-2xl text-white' icon={faPlus} />
                {rows.length > 0 && <FontAwesomeIcon onClick={borrar} className='hover:cursor-pointer text-2xl text-white' icon={faTrash} />}
                {rows.length === 1 && <FontAwesomeIcon onClick={() => setOpenEdit(true)} className='hover:cursor-pointer text-2xl text-white' icon={faPen} />}
            </Tooltip>

            { Componente && Componente}

            <Typography sx={{ ml: 2, fontSize: "18px", marginRight: "5px" }} >
                {rows.length > 0 ? `${rows.length}` : '-'}
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