import { Box, Modal } from "@mui/material";
import FormCrearCategoria from "./FormCrearCategoria";

const campos = [{
    titulo: "Categoria",
    id: "categoria",
    placeholder: "Categoria...",
    type: "text"
}
]
// eslint-disable-next-line react/prop-types
export default function ModalCrearCategoria({ varOpen, closeModal }) {


    return (
        <>
            <Modal
                open={varOpen}
                onClose={closeModal}
                className="flex items-center justify-center"
            >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"

                >
                    <FormCrearCategoria campos={campos} />
                </Box>
            </Modal>
        </>
    )
}