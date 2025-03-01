import { Box, Modal } from "@mui/material";
import { useMemo } from "react";

// eslint-disable-next-line react/prop-types
export default function ModalAll({open, setOpen,  setRowSelectionModel, Componente}){
    const varOpenEdit = useMemo(() => open, [open])
  
    const closeModalEdit = () => {
        setOpen(false);
        setTimeout(() => {
            setRowSelectionModel([]);
        });
    };
    
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
            {Componente }
        </Box>
    </Modal>
    )
}