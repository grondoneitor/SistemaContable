import { Box, Modal } from "@mui/material"
import { useMemo } from "react"
import FormEditarCliente from "./FormEditarClient"


// eslint-disable-next-line react/prop-types
export default function ModalEditarCliente({openEdit, setOpenEdit, setRowSelectionModel, valores}){

    const varOpenEdit = useMemo(() => openEdit, [openEdit])

    const closeModalEdit = () => {
        setOpenEdit(false)
        setRowSelectionModel([])
    }
    return(
        <Modal
        open={varOpenEdit}
        onClose={closeModalEdit}
        className="flex items-center justify-center"
    >
        <Box
            onClick={(e) => e.stopPropagation()}
            className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"
        >
            <FormEditarCliente valores={valores} />
        </Box>
    </Modal>
    )
}