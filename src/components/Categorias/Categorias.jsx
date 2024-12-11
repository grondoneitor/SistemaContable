
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip } from "@mui/material";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";
import { useContext, useState } from "react";
import { CategoriaContext } from "../../context/categorias";
import { Link, Outlet } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
const columns = [
    { id: 'categoria', label: 'Categoria', minWidth: 170 },

];
export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedCategories, setSelectedCategories] = useState([]); // Array para manejar múltiples selecciones
    const { state, categoriaSeleccionada } = useContext(CategoriaContext);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const clickIndividual = (categoria) => {
        const selectedId = categoria.id_Categoria;
        if (selectedCategories.includes(selectedId)) {
            // Si ya está seleccionado, eliminarlo
            setSelectedCategories(selectedCategories.filter((id) => id !== selectedId));
        } else {
            // Si no está seleccionado, agregarlo
            setSelectedCategories([...selectedCategories, selectedId]);
            categoriaSeleccionada(categoria)

        }
    };

    return (
        <section className="flex flex-col w-full ">
            <h1 className=" flex justify-center mb-9 text-3xl font-bold ">Categorias</h1>
            <main className="flex justify-around">
                <Paper sx={{ width: '33%', overflow: 'hidden' }} >
                    <Toolbar class="w-full p-3 flex bg-slate-300">
                        <Link to="/productos" className="font-semibold">
                            <Tooltip>
                                <IconButton color="primary">
                                    <ArrowBackIosNewIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <div className="ml-auto " >
                            {selectedCategories.length === 1 && (
                                <Link to="categorias-detalle">
                                    <Tooltip>
                                        <IconButton color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                            )}
                            <Link to="categorias-crear">
                                <Tooltip>
                                    <IconButton color="primary">
                                        <DataSaverOnIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </div>
                    </Toolbar>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontSize: "16px" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.categorias
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((categoria) => (
                                        <TableRow
                                            onClick={() => clickIndividual(categoria)}
                                            hover
                                            className={`cursor-pointer hover:bg-gray-100 ${selectedCategories.includes(categoria.id_Categoria) ? "bg-blue-100" : ""
                                                }`}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={categoria.id_Categoria}
                                        >
                                            {columns.map((column) => {
                                                const value = categoria[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {capitalizeFirstLetter(value)}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 25, 100]}
                        component="div"
                        count={state.categorias.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

                <section className=" ">
                    <Outlet/>
                </section>
            </main>
        </section>
    );
}
