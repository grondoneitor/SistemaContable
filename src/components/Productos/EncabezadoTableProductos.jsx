import { useContext} from "react";
import { ProductoContext } from "../../context/productos";
import { ServiciosProducto } from "../../services/Productos/productoServicios";
import { Box, InputAdornment, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { SuccessOrError } from "../Messages/SuccessOrError";


// eslint-disable-next-line react/prop-types
export default function EncabezadoTableProductos({ setOpen, rowSelectionModel: rows = [], setRowSelectionModel, setOpenEdit }) {
    const { borrarProductoServ, buscandoProductoServ, isMoved, isMistake } = ServiciosProducto()
    const { state } = useContext(ProductoContext)

    const borrar = async () => {
        await borrarProductoServ(rows)
        setRowSelectionModel([]);
    }

    const handleChange = (event) => {
        buscandoProductoServ(event.target.value)
    }

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

            <TextField
                className='text-white'
                label="Buscar..."
                variant="standard"
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "white" }} /> {/* Icono en blanco */}
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    sx: {
                        color: "white", // Label en blanco
                        "&.Mui-focused": { color: "white" }, // Label en blanco cuando está enfocado
                    },
                }}
                sx={{
                    input: { color: "white" }, // Texto en blanco
                    "& .MuiInput-underline:before": { borderBottomColor: "white" }, // Línea blanca antes de enfocar
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "white" }, // Línea blanca en hover
                    "& .MuiInput-underline:after": { borderBottomColor: "white" }, // Línea blanca después de enfocar
                }}
            />


            <Box
                className="flex gap-2"
            >
                <Link to={"categorias"}>
                    <FontAwesomeIcon className='text-2xl' icon={faFontAwesome} />
                </Link>
                <Typography variant="subtitle1" sx={{ ml: 2 }} className='text-2xl'>
                    {rows.length > 0
                        ? `${rows.length} `
                        : '-'}
                </Typography>
            </Box>

            {
                state.mensajeError ?
                    <SuccessOrError message={state.mensajeError} severity={"error"} moved={isMistake} />
                    :
                    <SuccessOrError message={state.mensajeExito} severity={"success"} moved={isMoved} />
            }
        </Toolbar>



    );

}