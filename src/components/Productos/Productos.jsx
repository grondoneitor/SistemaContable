import { useMapeandoCategorias } from "../../hooks/useMapeandoCategorias";
import Productos from "./FormProductos";

export default function ShowProductos() {
    useMapeandoCategorias()
    return (
        <>
            <div className="flex w-full mt-16 h-full gap-6">
                <main className="w-full ml-4">
                    <div>
                             <Productos/>
                    </div>
                </main>
            </div>
        </>
    );
}
