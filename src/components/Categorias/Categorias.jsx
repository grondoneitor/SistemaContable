import { useContext, useMemo, useState } from "react";
import { CategoriaContext } from "../../context/categorias";
import { DataGrid } from "@mui/x-data-grid";
import {  Box, Modal, Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormCrearCategoria from './FormCrearCategoria.jsx'
import FormEditarCategoria from './FormEditarCategoria.jsx'
import { ServiciosCategoria } from "../../services/Categorias/serviciosCategoria.js";
import { SuccessOrError } from "../Messages/SuccessOrError.jsx";

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

const paginationModel = { page: 0, pageSize: 5 };




export default function FormCategorias() {

    const { state } = useContext(CategoriaContext);
    const [open, setOpen] = useState(false);
    const [valores, setValores] = useState({})
    const varOpen = useMemo(() => open, [open]);
    const [openEdit, setOpenEdit] = useState(false)

    const closeModal = () => {
        setOpen(false);
        setRowSelectionModel([])
    };

    const modalCrearOpen = useMemo(() => open, [open]);

    const funcionParaSeleccionar = (newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
        if (newRowSelectionModel.length > 0) {
            const selectedRow = state.categorias.find(
                (categoria) => categoria.id_Categoria === newRowSelectionModel[0]
            );
            setValores(selectedRow || {});
        } else {
            setValores({});
        }
    }

    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    return (
        <>
            <h1 className="text-4xl m-7 font-bold">Categorias</h1>
            <Paper sx={{ borderRadius: "24px", width: "30%" }}>
                <EnhancedTableToolbar
                    setOpen={setOpen}
                    rowSelectionModel={rowSelectionModel}
                    valores={valores}
                    modalCrearOpen={modalCrearOpen}
                    setRowSelectionModel={setRowSelectionModel}
                    setValores={setValores}
                    setOpenEdit={setOpenEdit}
                    openEdit={openEdit}
                />
                <DataGrid
                    rows={state.categorias}
                    columns={columns}
                    className="w-auto display inline-block"
                    pageSize={paginationModel.pageSize}
                    getRowId={(row) => row.id_Categoria}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        funcionParaSeleccionar(newRowSelectionModel);
                    }}
                    sx={{
                        boxShadow: 2,
                        border: "none",
                        width: "100%",
                        justifyItems: "space-between",
                        borderRadius: "0px 0px 24px 24px",
                        "& .MuiDataGrid-footerContainer": { // Contenedor de paginación en DataGrid
                            borderBottomLeftRadius: "24px",
                            borderBottomRightRadius: "24px",
                            overflow: "hidden",
                        },
                        "& .MuiTablePagination-root": { // Estilos de la paginación
                            backgroundColor: "#f0f0f0",
                            color: "black",
                            borderBottomLeftRadius: "24px",
                            borderBottomRightRadius: "24px",
                        },
                        "& .MuiTablePagination-actions button": {
                            color: "black",
                        },
                    }}
                    rowSelectionModel={rowSelectionModel}
                    disableColumnResize
                    disableColumnReorder
                    disableColumnMenu
                />
            </Paper>


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
    );
}

// eslint-disable-next-line react/prop-types
function EnhancedTableToolbar({ setOpen, rowSelectionModel: rows = [], valores, setRowSelectionModel, setValores, setOpenEdit, openEdit }) {
    const { borrarCategoriaServ, isMoved, isMistake } = ServiciosCategoria()
    const {state} = useContext(CategoriaContext)
    //   const [openEdit, setOpenEdit] = useState(false)

    const varOpenEdit = useMemo(() => openEdit, [openEdit])


    const closeModalEdit = () => {
        setOpenEdit(false);
        setTimeout(() => {
            setRowSelectionModel([]);
            setValores({})
        }, 0);
    };
    const abriendo = () => {
        setOpen(true);

    };

    const borrar = async () => {
        await borrarCategoriaServ(rows)
    }

    const editar = () => {
        setOpenEdit(true);

    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            className='bg-fuchsia-950 text-white rounded-t-3xl'
        >
            <Tooltip
                className='flex gap-4'
            >

                <FontAwesomeIcon
                    onClick={abriendo}
                    className='hover:cursor-pointer text-2xl'
                    icon={faPlus} />

                {rows.length > 0 && <FontAwesomeIcon
                    onClick={borrar}
                    className='hover:cursor-pointer text-2xl'
                    icon={faTrash}
                />}

                {rows.length === 1 && <FontAwesomeIcon
                    onClick={editar}
                    className='hover:cursor-pointer text-2xl'
                    icon={faPen}
                />}

            </Tooltip>

            <Typography variant="subtitle1" sx={{ ml: 2 }}>
                {rows.length > 0
                    ? `${rows.length}`
                    : '-'}
            </Typography>

            <Modal
                open={varOpenEdit}
                onClose={closeModalEdit}
                className="flex items-center justify-center"
            >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    className="relative  w-full max-w-xl rounded-lg overflow-hidden shadow-lg border-fuchsia-950 border-4"
                >
                    <FormEditarCategoria valores={valores} />
                </Box>
            </Modal>

                {
                    state.mensajeError ? 
                    <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                    :
                    <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
                }
        </Toolbar>
    );
}
