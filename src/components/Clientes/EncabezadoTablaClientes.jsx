import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Toolbar, Tooltip, Typography } from "@mui/material"
import { SuccessOrError } from "../Messages/SuccessOrError"
import ServiciosCliente from "../../services/Clientes/clienteServicios"
import { useContext } from "react"
import { ClienteContext } from "../../context/cliente"
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"


// eslint-disable-next-line react/prop-types
export default function EncabezadoTablaClientes({ setOpen, setOpenEdit, rowSelectionModel: rows = [] }) {
    const { BorrarCliente, isMoved, isMistake } = ServiciosCliente()
    const { state } = useContext(ClienteContext)

    const borrar = async () => {
        await BorrarCliente(rows)
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

            <Typography sx={{ ml: 2, fontSize: "18px", marginRight: "5px" }} >
                {rows.length > 0 ? `${rows.length}` : '-'}
            </Typography>
            {
                state.errorsMessage ?
                    <SuccessOrError message={state.errorsMessage} severity={"error"} moved={isMistake} />
                    :
                    <SuccessOrError message={state.successMessage} severity={"success"} moved={isMoved} />

            }
        </Toolbar>
    );
}
