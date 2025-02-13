import { useContext, useMemo, useState } from "react";
import { CategoriaContext } from "../../context/categorias";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Modal, Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormCrearCategoria from './FormCrearCategoria.jsx'
import FormEditarCategoria from './FormEditarCategoria.jsx'
import { ServiciosCategoria } from "../../services/Categorias/serviciosCategoria.js";

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
            <Paper sx={{ maxWidth: 300, width: "25%", display: "inline-block", padding: 2 }}>
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
                    className="relative p-4 w-full max-w-xl rounded-lg"
                >
                    <FormCrearCategoria campos={campos} />
                </Box>
            </Modal>

        </>
    );
}

// eslint-disable-next-line react/prop-types
function EnhancedTableToolbar({ setOpen, rowSelectionModel: rows = [], valores, setRowSelectionModel, setValores, setOpenEdit, openEdit }) {
     const { borrarCategoriaServ, isMoved } = ServiciosCategoria()

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

    const editar =  () => {
        setOpenEdit(true);

    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                display: "flex",
                text: 24,
                justifyContent: 'space-between',
                // alignItems: 'center',
                width: "auto",
                padding: 2
            }}
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
                    className="relative p-4 w-full max-w-xl rounded-lg"
                >
                    <FormEditarCategoria valores={valores} />
                </Box>
            </Modal>
            
      <div
        className={`transition-all duration-500 ease-linear  right-5
                     ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                     fixed bottom-5 mt-10 w-60 h-16 flex justify-center items-center bg-green-600 text-white shadow-lg rounded-lg`}
      >
        <p>Categoria/s borradas con exito</p>
      </div> 
        </Toolbar>
    );
}
