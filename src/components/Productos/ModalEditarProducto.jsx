import { Box, Modal } from "@mui/material";
import FormEditarProducto from "./FormEditarProducto";

// eslint-disable-next-line react/prop-types
export default function ModalEditarProducto({varOpenEdit, closeModalEdit, valores}){

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
            <FormEditarProducto valores={valores} />
        </Box>
    </Modal>
    )
}