import { Box, Modal } from "@mui/material";
import FormCrearCliente from "./FormCrearCliente";
import { useMemo } from "react";

const campos = [{
    titulo: "Nombre",
    id: "nombre",
    placeholder: "Nombre del cliente",
    type: "text"
},
{
    titulo: "Mail",
    id: "mail",
    placeholder: "Mail del cliente",
    type: "text"
},
{
    titulo: "Telefono",
    id: "telefono",
    placeholder: "Telefono del cliente",
    type: "text"
},
{
    titulo: "Direccion",
    id: "direccion",
    placeholder: "Direccion del cliente",
    type: "text"
},
{
    titulo: "DNI",
    id: "dni",
    placeholder: "DNI del cliente",
    type: "text"
}
]

// eslint-disable-next-line react/prop-types
export default function ModalCrearCliente({ open, setOpen, setRowSelectionModel }) {
    const varOpen = useMemo(() => open, [open]);

    const closeModal = () => {
        setOpen(false);
        setRowSelectionModel([])
    };

    return (
        <Modal
            open={varOpen}
            onClose={closeModal}
            className="flex items-center justify-center "
        >
            <Box
                onClick={(e) => e.stopPropagation()}
                className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"
            >
                <FormCrearCliente campos={campos} />
            </Box>
        </Modal>
    )
}