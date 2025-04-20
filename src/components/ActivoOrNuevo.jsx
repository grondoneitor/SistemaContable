/* eslint-disable react/prop-types */
import ModalAll from "./Modal";
import { useState } from "react";

export default function ActivoOrNuevo({ setCreado, reset, setActual, campos, Componente }) {

    const [open, setOpen] = useState(false)
    const [rowSelectionModel, setRowSelectionModel] = useState(null)
    const abrirModalCrear = () => {
        setOpen(true)
    }

    const cerrarModalCrear = () => {
        setCreado(true)
        setOpen(false)
    }
    const nuevo = (option) => {
        console.log("nuevo prove ", option)
        setActual(option)
        if (option) {
            setCreado(true)
            reset();

        }
    }

    return (
        <>
            <div className="flex  gap-3 col-span-2 ">
                <button type="button" onClick={abrirModalCrear} className="bg-fuchsia-950  rounded-lg text-white p-2">Nuevo</button>
                <button type="button" onClick={cerrarModalCrear} className="bg-gradient-to-br bg-[#d1c1f3] border-4 border-fuchsia-950 text-black rounded-lg p-2">Activo</button>
            </div>
            {open === true ?
                <ModalAll open={open} setOpen={setOpen} setRowSelectionModel={setRowSelectionModel} Componente={<Componente campos={campos} nuevo={nuevo} />} />
                : null
            }
        </>

    )
}

