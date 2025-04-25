import { Drawer, Box, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function FiltroDeslizante({ open, setOpen, Filtro }) {

    return (
        <Box sx={{ whidt:"100%", position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)" }}>
            <Drawer
                anchor="right"
                open={open}
                PaperProps={{
                    onMouseLeave: () => setOpen(false), // Cierra cuando el cursor sale
                    sx: { width: "300px", padding: "16px" },
                }}
            >
                <Typography sx={{ fontSize:"30px" }} >Filtrar</Typography>
                    {Filtro && Filtro}
            </Drawer>
        </Box>
    );
}
