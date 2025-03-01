import { useContext,  useState } from "react";
import { CategoriaContext } from "../../context/categorias";
import {Paper } from "@mui/material";
import EncabezadoTabla from "./EncabezadoTabla.jsx";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra.js";
import Table from "../Table.jsx";
import FormEditarCategoria from "./FormEditarCategoria.jsx";
import ModalAll from "../Modal.jsx";
import FormCrearCategoria from "./FormCrearCategoria.jsx";
// import ModalCrearCategoria from "./ModalCrearCategoria.jsx";

const columns = [
    { field: 'categoria', headerName: 'Categoria', flex: 1 }
];
const campos = [{
    titulo: "Categoria",
    id: "categoria",
    placeholder: "Categoria...",
    type: "text"
}
]

export default function FormCategorias() {
    const { state } = useContext(CategoriaContext);
    const [open, setOpen] = useState(false);
    const [valores, setValores] = useState({})
    const [openEdit, setOpenEdit] = useState(false)
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const categoriasFinales = state.categorias.map(categoria => ({
        ...categoria,
        categoria: capitalizeFirstLetter(categoria.categoria),
    }))

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
                     <Table
                        seleccionar={state.categorias}
                        rowSelectionModel={rowSelectionModel}
                        setRowSelectionModel={setRowSelectionModel}
                        setValores={setValores}
                        rows={categoriasFinales}
                        columns={columns}
                    /> 
    
                </Paper>
                <ModalAll open={openEdit} setOpen={setOpenEdit} setRowSelectionModel={setRowSelectionModel} Componente={<FormEditarCategoria valores={valores} />} />
                <ModalAll open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} Componente={  <FormCrearCategoria campos={campos} />} />

            </div>
        </div>
    );
}


