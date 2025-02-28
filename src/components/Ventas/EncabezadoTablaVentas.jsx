import { Box, Toolbar, Tooltip} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function EncabezadoTablaVentas(
    { setOpen, rowSelectionModel: rows = [], valores, setRowSelectionModel, setOpenEdit, openEdit }
) {
    // const { borrarProductoServ, buscandoProductoServ, isMoved, isMistake } = ServiciosProducto()
    // const { state } = useContext(ProductoContext)
    // const varOpenEdit = useMemo(() => openEdit, [openEdit])

    // const closeModalEdit = () => {
    //     setOpenEdit(false);
    //     setTimeout(() => {
    //         setRowSelectionModel([]);
    //     }, 0);
    // };

     const borrar = async () => {
        console.log("borrar")
        //  await borrarProductoServ(rows)
         setRowSelectionModel([]);
     }

    // const handleChange = (event) => {
    //     buscandoProductoServ(event.target.value)
    // }

    return (

        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            className='bg-fuchsia-950 text-white rounded-t-3xl'
        >
            <Tooltip
                className='flex gap-4 text-white'
            >
                <div>
                    <FontAwesomeIcon onClick={() => setOpen(true)} className='hover:cursor-pointer text-2xl' icon={faPlus} />

                    {rows.length > 0 && <FontAwesomeIcon onClick={borrar} className='hover:cursor-pointer text-2xl' icon={faTrash} />}

                    {rows.length === 1 && <FontAwesomeIcon onClick={() => setOpenEdit(true)} className='hover:cursor-pointer text-2xl' icon={faPen} />}

                </div> 
            </Tooltip>


            <Box
                className="flex gap-2"
            >
                <Link to={"categorias"}>
                    <FontAwesomeIcon className='text-2xl' icon={faFontAwesome} />
                </Link>
                {/* <Typography variant="subtitle1" sx={{ ml: 2 }} className='text-2xl'>
                    {rows.length > 0
                        ? `${rows.length} `
                        : '-'}
                </Typography> */}
            </Box>

            {/* <ModalEditarProducto varOpenEdit={varOpenEdit} closeModalEdit={closeModalEdit} valores={valores} /> */}
            {/* {
                state.mensajeError ?
                    <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                    :
                    <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
            } */}
        </Toolbar>



    );

}