import { InputAdornment, TextField } from "@mui/material"
import { SearchIcon } from "lucide-react"

// eslint-disable-next-line react/prop-types
export const BuscadorDeProductos = ( {handleChange}) =>{
    return(
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

    )
}