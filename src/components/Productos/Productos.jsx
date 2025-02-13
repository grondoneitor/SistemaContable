import { Outlet } from "react-router-dom";
import { useMapeandoCategorias } from "../../hooks/categorias/useMapeandoCategorias";
import FormProductos from "./FormProductos";
import { useMapeandoProductos } from "../../hooks/productos/useMapeandoProductos";
import { useMapeandoProductosPorNombre } from "../../hooks/productos/useMapeandoProductosPorNombre";

export default function ShowProductos() {
     useMapeandoProductos()
     useMapeandoProductosPorNombre()
     useMapeandoCategorias()
    return (
        <>
            <div className="flex w-full mt-16 h-full gap-6">
                <main className="w-full ml-4">
                    <div>
                             <FormProductos/>
                             <Outlet/>
                    </div>
                </main>
            </div>
        </>
    );
}
