import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Toolbar, Tooltip, Typography } from "@mui/material"
import { SuccessOrError } from "../Messages/SuccessOrError"
import ServiciosCliente from "../../services/Clientes/clienteServicios"
import { useContext, useState } from "react"
import { ClienteContext } from "../../context/cliente"
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import ModalEditarCliente from "./ModalEditarCliente"


// eslint-disable-next-line react/prop-types
export default function EncabezadoTablaClientes({ setOpen, rowSelectionModel: rows = [], valores, setRowSelectionModel }) {
    const { BorrarCliente, isMoved, isMistake } = ServiciosCliente()
    const { state } = useContext(ClienteContext)
    const [openEdit, setOpenEdit] = useState(false)


    const abriendo = () => {
        setOpen(true);
    };

    const borrar = async () => {
        await BorrarCliente(rows)
    }

    const editar = async () => {
        setOpenEdit(true);
    };

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
                <FontAwesomeIcon onClick={abriendo} className='hover:cursor-pointer text-2xl text-white' icon={faPlus} />
                {rows.length > 0 && <FontAwesomeIcon onClick={borrar} className='hover:cursor-pointer text-2xl text-white' icon={faTrash} />}
                {rows.length === 1 && <FontAwesomeIcon onClick={editar} className='hover:cursor-pointer text-2xl text-white' icon={faPen} />}
            </Tooltip>

            <Typography sx={{ ml: 2, fontSize: "18px", marginRight: "5px" }} >
                {rows.length > 0 ? `${rows.length}` : '-'}
            </Typography>
            <ModalEditarCliente openEdit={openEdit} setOpenEdit={setOpenEdit} setRowSelectionModel={setRowSelectionModel} valores={valores} />

            {
                state.errorsMessage ?
                    <SuccessOrError message={state.errorsMessage} severity={"error"} moved={isMistake} />
                    :
                    <SuccessOrError message={state.successMessage} severity={"success"} moved={isMoved} />

            }
        </Toolbar>
    );
}
