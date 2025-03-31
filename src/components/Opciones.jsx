import { faFilter, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// eslint-disable-next-line react/prop-types
export default function Opciones({ setOpen, setOpenEdit, rowSelectionModel = [], setRowSelectionModel, Borrar, setOpenFilter, Componente, categoria, nombre }) {

    const borrar = async () => {
        await Borrar(rowSelectionModel)
        setRowSelectionModel([])
    }

    return (
        <div className="flex justify-between w-full">
            <div className='flex justify-between'>
                <div className="flex">
                    <button onClick={() => setOpen(true)} className='border border-black p-2 bg-fuchsia-950 text-white m-2'> Crear {nombre} <FontAwesomeIcon icon={faPlus} />  </button>

                    {rowSelectionModel.length > 0 && <button onClick={borrar} className='border border-black p-2 bg-fuchsia-950 text-white m-2'> Borrar {nombre} <FontAwesomeIcon icon={faTrash} /> </button>}

                    {rowSelectionModel.length === 1 && <button onClick={() => setOpenEdit(true)} className='border border-black p-2 bg-fuchsia-950 text-white m-2'> Editar {nombre} <FontAwesomeIcon icon={faPen} /> </button>}
                </div>
            </div>
            {Componente && Componente}
            <div>
            {categoria && categoria}
                
                <button onClick={() => setOpenFilter(true)} className='border border-fuchsia-950 p-2 bg-gradient-to-br bg-[#d1c1f3] text-black m-2'> Filtros <FontAwesomeIcon icon={faFilter} /> </button>
            </div>
        </div>


    )
}