import { useContext, useMemo, useState } from "react";
import { CategoriaContext } from "../../context/categorias";
import { Paper } from "@mui/material";
import EncabezadoTabla from "./EncabezadoTabla.jsx";
import ModalCrearCategoria from "./ModalCrearCategoria.jsx";
import TableCategorias from "./TableCategorias.jsx";
// import ModalCrearCategoria from "./ModalCrearCategoria.jsx";



export default function FormCategorias() {
    const { state } = useContext(CategoriaContext);
    const [open, setOpen] = useState(false);
    const [valores, setValores] = useState({})
    const varOpen = useMemo(() => open, [open]);
    const [openEdit, setOpenEdit] = useState(false)
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const closeModal = () => {
        setOpen(false);
        setRowSelectionModel([])
    };

    return (
        <div className="bg-white rounded-2xl p-6 w-full flex justify-center">
            <div className="w-auto min-w-[33%] max-w-lg">
                <h1 className="text-4xl m-7 font-bold">Categorías</h1>
                <Paper sx={{ borderRadius: "24px", width: "100%" }}>
                    <EncabezadoTabla
                        setOpen={setOpen}
                        rowSelectionModel={rowSelectionModel}
                        valores={valores}
                        setRowSelectionModel={setRowSelectionModel}
                        setValores={setValores}
                        setOpenEdit={setOpenEdit}
                        openEdit={openEdit}
                    />
                    <TableCategorias
                        categorias={state.categorias}
                        rowSelectionModel={rowSelectionModel}
                        setRowSelectionModel={setRowSelectionModel}
                        setValores={setValores}
                    />
                </Paper>

                <ModalCrearCategoria varOpen={varOpen} closeModal={closeModal} />
            </div>
        </div>
    );
}


