import { Box, Modal } from "@mui/material";
import FormCrearProducto from "./FormCrearPro";
import { useMemo } from "react";

const campos = [{
    titulo: "Producto",
    id: "producto",
    placeholder: "Nombre del producto",
    type: "text"
  },
  {
    titulo: "Descripcion",
    id: "descripcion",
    placeholder: "Descripcion del producto",
    type: "text"
  },
  {
    titulo: "Precio",
    id: "precio",
    placeholder: "Precio del producto",
    type: "number"
  },
  {
    titulo: "Stock",
    id: "stock",
    placeholder: "Stock del producto",
    type: "number"
  },
  {
    titulo: "Stock Minimo",
    id: "stock_Min",
    placeholder: "Stock minimo del producto",
    type: "number"
  },
  {
    titulo: "Categoria",
    id: "categoria",
    placeholder: "Categoria del producto",
    type: "option"
  }
  ]

// eslint-disable-next-line react/prop-types
export default function ModalCrearProductos({open,setOpen, setRowSelectionModel}) {
    const modalCrearOpen = useMemo(() => open, [open]);
    const closeModalCrear = () => {
      setOpen(false);
      setRowSelectionModel([]);
    };
  
    return (
        <Modal
            open={modalCrearOpen}
            onClose={closeModalCrear}
            className="flex items-center justify-center"
        >
            <Box
                onClick={(e) => e.stopPropagation()}
                className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"
            >
                <FormCrearProducto campos={campos} />
            </Box>
        </Modal>
    )
}