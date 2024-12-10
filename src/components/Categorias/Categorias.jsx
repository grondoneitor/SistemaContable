// import { Link, NavLink } from "react-router-dom";
// import SearchCategorias from "./SearchCategorias";
// import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";
// import { ServiciosCrearCategoria } from "../../services/serviciosCrearCategoria";
// import { useContext, useEffect, } from "react";
// import { CategoriaContext } from "../../context/categorias";
// import { useMapeandoCategorias } from "../../hooks/useMapeandoCategorias";
// import { useMapeandoCategoriasPorNombre } from "../../hooks/useMapeandoCategoriaPorNombre";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";


// const schemaCat = yup.object({
//     categoria: yup.string()
//         .required('La categoria es obligatoria')
//         .min(3, 'La categoria debe tener al menos 3 letras')
//         .max(70, 'La categoria no puede tener más de 70 letras')
// }).required();



// export default function Categorias() {


//     const { handleSubmitBuscador, handleVolverBuscador } = ServiciosCrearCategoria()

//     const { register, handleSubmit, formState: { errors }, reset } = useForm({
//         resolver: yupResolver(schemaCat)
//     });

//     const { handleSubmitCrear, handleOnClick, handleVolver, activo, categ, handleModificar, handleDelete } = ServiciosCrearCategoria(reset)

//     useMapeandoCategorias()
//     useMapeandoCategoriasPorNombre()

//     const { state } = useContext(CategoriaContext)
//     const categoriasMostrar = state.nombreCategoriaBuscado !== "" ? state.categoriasBuscados : state.categorias

//     useEffect(() => {
//        if(categ){
//             reset({
//                 categoria: categ.categoria
//             });}

//     }, [categ, reset]);



//     return (
//         <div className="flex flex-col items-center">
//             <SearchCategorias handleSubmitBuscador={handleSubmitBuscador} handleVolverBuscador={handleVolverBuscador} />
//             <div className="flex w-3/4 mt-16 h-full gap-6 justify-center">

//                 <main className="w-full ml-4">
//                     {/* <h1 className="font-black text-3xl text-slate-800 text-center mb-14">Categorias</h1> */}
//                     <div >
//                         {categoriasMostrar.length <= 0 ?
//                             <p className="text-red-400"> No se encontro {state.nombreCategoriaBuscado} </p>
//                             :
//                             <ul className="grid grid-cols-4 mx-5 gap-8 " >
//                                 {categoriasMostrar.map((categoria) => (
//                                     <li key={categoria.id_Categoria} >
//                                         <button onClick={() => handleOnClick(categoria)}><h1>{capitalizeFirstLetter(categoria.categoria)}</h1></button>
//                                     </li>
//                                 ))}
//                             </ul>}
//                     </div>
//                 </main>
//                 {!activo ?
//                     <form onSubmit={handleSubmit(handleSubmitCrear)} className=" bg-white text-center w-2/5">
//                         <>
//                             <h1 className="font-black p-2 text-xl">Crear categoria</h1>
//                             <label htmlFor="categoria"></label>
//                             <input
//                                 className="p-3 mb-3 border border-s-4 border-green-600"
//                                 type="text"
//                                 id="categoria"
//                                 name="categoria"
//                                 placeholder="categoria"
//                                 {...register("categoria")}
//                             />
//                             {errors.categoria && <p className="text-red-500 mb-3">{errors.categoria.message}</p>}
//                             <button type="submit" className="bg-indigo-900 p-3 rounded-xl text-slate-100 font-semibold">Crear categoria</button>
//                         </>
//                     </form>
//                     :
//                     <form onSubmit={handleSubmit(handleModificar)} action="">

//                         <div className="flex gap-2 items-center p-2 justify-center">
//                             <button onClick={handleVolver} className='flex' type="button">
//                                 <svg className='text-slate-800 size-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
//                                 </svg>
//                             </button>
//                             <h1 className="font-black text-xl">Opciones categoria</h1>
//                         </div>


//                         <label htmlFor="categoria"></label>
//                         <input
//                             className="p-3 m-6 border border-s-4 border-blue-600"
//                             type="text"
//                             id="categoria"
//                             name="categoria"
//                             placeholder="categoria"
//                             {...register("categoria")}
//                         />
//                         {errors.categoria && <p className="text-red-500 mb-3">{errors.categoria.message}</p>}

//                         <div className="flex gap-2 p-2">
//                             <button type="submit" className="bg-blue-900 p-3 rounded-xl text-slate-100 font-semibold">Modificar categoria</button>
//                             <button className="bg-red-900 p-3 rounded-xl text-slate-100 font-semibold" onClick={handleDelete}>Eliminar categoria</button>
//                         </div>
//                     </form>

//                 }
//             </div>

//         </div>
//     )
// }
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip } from "@mui/material";
import { capitalizeFirstLetter } from "../../services/mayusculaPrimeraLetra";
import { EditNotificationsTwoTone } from "@mui/icons-material";
import { useContext, useState } from "react";
import { CategoriaContext } from "../../context/categorias";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const columns = [
    { id: 'categoria', label: 'Categoria', minWidth: 170 },

];
export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedCategories, setSelectedCategories] = useState([]); // Array para manejar múltiples selecciones
    const { state } = useContext(CategoriaContext);

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
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Toolbar>
                <Link to="/productos" className="font-semibold">
                    <Tooltip>
                        <IconButton>
                           <ArrowBackIosNewIcon/>
                        </IconButton>
                    </Tooltip>
                </Link>

                {selectedCategories.length > 0 && (
                    <Tooltip>
                        <IconButton color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
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
                                    className={`cursor-pointer hover:bg-gray-100 ${
                                        selectedCategories.includes(categoria.id_Categoria) ? "bg-gray-200" : ""
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
    );
}
