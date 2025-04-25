import { InputAdornment, TextField } from "@mui/material"
import { GridSearchIcon } from "@mui/x-data-grid"

// eslint-disable-next-line react/prop-types
export const BuscadorDeProductos = ( {handleChange}) =>{
    return(
        <TextField
        className='text-black'
        label="Buscar..."
        variant="standard"
        onChange={handleChange}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <GridSearchIcon sx={{ color: "black" }} /> {/* Icono en blanco */}
                </InputAdornment>
            )
        }}
        InputLabelProps={{
            sx: {
                color: "black", // Label en blanco
                "&.Mui-focused": { color: "black" }, // Label en blanco cuando está enfocado
            },
        }}
        sx={{
            input: { color: "black" }, // Texto en blanco
            "& .MuiInput-underline:before": { borderBottomColor: "black" },
            "& .MuiInput-underline:hover": { borderBottomColor: "black" }, // Línea blanca antes de enfocar
            "& .MuiInput-underline:hover:before": { borderBottomColor: "black" }, // Línea blanca en hover
            "& .MuiInput-underline:after": { borderBottomColor: "black" }, // Línea blanca después de enfocar
        }}
    />

    )
}