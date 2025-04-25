import UltimasTransacciones from "./UltimasTransacciones";


export default function Dashboard() {

    return (
        <>

            <div className="w-full rounded-2xl p-6">
                <div className="grid grid-cols-6 gap-7">
                    <div className="col-span-4 row-span-1 bg-white rounded-lg grid grid-cols-4 grid-rows-3 p-3 place-content-center justify-items-center">
                        <div className="text-black font-bold  text-2xl self-start p-3 mb-4 col-start-1 col-end-3 ">
                            Resumen de Ingresos y Gastos
                        </div>
                        <button className="bg-fuchsia-950 text-white row-start-3 font-bold col-start-1 col-end-2 px-10 rounded-lg">
                            Ver ventas
                        </button>
                        <button className="border-4 border-fuchsia-950 bg-gradient-to-br bg-[#d1c1f3] text-black row-start-3 font-bold col-start-2 col-end-3 px-10 rounded-lg">
                            Ver gastos
                        </button>
                        <div className="text-3xl self-center row-start-2 col-start-4 font-bold">
                            $1500
                        </div>
                    </div>

                    <div className="col-span-2 row-span-2 bg-gray-200 rounded-lg p-7 flex items-center justify-center">
                        Calendario futuro
                    </div>
                    <div className="col-span-2  row-span-2 col-start-5 row-start-3 bg-gray-200 rounded-lg p-7 flex items-center justify-center">
                        Otra seccion
                    </div>

                    <div className="col-span-4 grid grid-rows-[44px,200px] grid-cols-4 gap-3">
                        <button className="col-start-1 w-32 h-11 rounded-lg font-bold border-4 border-fuchsia-950">
                            Agregar tarea
                        </button>

                        <div className="bg-white row-start-2 rounded-tr-2xl p-1">
                            <h1 className="text-3xl font-semibold">Tarea</h1>
                            <div>
                                <span>Hablar con el proveedor de medias</span>
                                <p>Fecha: 3/3/2025</p>
                            </div>
                        </div>

                        <div className="bg-white row-start-2 rounded-tr-2xl p-1">
                            <h1 className="text-3xl font-semibold">Tarea</h1>
                            <div>
                                <p>Reunión con empleado 4</p>
                            </div>
                        </div>

                        <div className="bg-white row-start-2 rounded-tr-2xl p-1">
                            <h1 className="text-3xl font-semibold">Tarea</h1>
                            <div>
                                <p>Reunión con empleado 4</p>
                            </div>
                        </div>

                        <div className="bg-white row-start-2 rounded-tr-2xl p-1">
                            <h1 className="text-3xl font-semibold">Tarea</h1>
                            <div>
                                <p>Reunión con empleado 4</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 grid grid-rows-[44px,200px] gap-3">
                        <h1 className=" text-4xl rounded-lg font-bold ">Ultimas transacciones</h1>
                        <UltimasTransacciones />
                    </div>
                </div>
            </div>

        </>

    )
}