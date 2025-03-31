
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function Home({ array }) {
  const campos = array
  const [active, setActive] = useState(campos[0].nombre);

  const [hover, setHover] = useState(false)
  return (
    <div className="flex h-full bg-gradient-to-br bg-[#d1c1f3] ">
      {/* Sidebar */}
      <aside className="relative w-64 pl-4 h-screen   flex flex-col bg-gradient-to-br bg-[#fdfdfd] ">
        <div className="text-2xl font-bold my-6 text-center">Menu</div>
        <nav className="space-y-2 flex-1 justify-end">
          {campos.map(({ url, nombre, icono: Icon, opciones = [] }) => (

            <Link
              to={url != "" && url}
              key={nombre}
              className={`flex ml-auto
                transition-all duration-300 ease-in-out transform items-center gap-4 w-full mr-0 p-5 rounded-s-lg  ${active === nombre ? " bg-gradient-to-br bg-[#d1c1f3] text-black " : "text-gray-600  hover:bg-[#ab9fc9] hover:text-white"
                }`}
              onMouseEnter={() => nombre === "CoPro" && setHover(true)}
              onMouseLeave={() => nombre === "CoPro" && setHover(false)}
              onClick={() =>( setActive(nombre))}
            >

              <div className="">
                <div className="flex gap-2">{Icon &&  <FontAwesomeIcon icon={Icon} className="text-2xl text-slate-800 "  />} <p>{nombre}</p> </div>
                { hover && (
                  <div className="transition-all duration-300 ease-in-out transform  left-0 mt-2   rounded-lg">
                    {opciones.map(opcion => (
                      <Link
                        className="flex flex-col ml-9 p-2 hover:text-white"
                        key={opcion.nombre}
                        to={opcion.url}
                      >
                        {opcion.nombre}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </Link>

          ))}
        </nav>
        <button className="mt-auto p-3 text-gray-600 hover:text-red-500">Log out</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <div className="flex justify-between">
          <h1 className="text-fuchsia-950 text-4xl font-bold">{active}</h1>
          <div className=" bg-white w-56" > Nombre usuario // foto // Perfil</div>

        </div>
        <div>
          <section className="mt-4 w-full flex flex-col items-center ">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}
