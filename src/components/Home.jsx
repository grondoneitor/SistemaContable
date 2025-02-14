
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function Home( {array}  ) {
  const campos = array
  const [active, setActive] = useState(campos[0].nombre);

  return (
    <div className="flex h-screen bg-gradient-to-br bg-[#d1c1f3] ">
      {/* Sidebar */}
      <aside className="relative w-64 p-4  shadow-lg flex flex-col clip-path-custom bg-gradient-to-br bg-[#d1c1f3] ">
        <div className="text-2xl font-bold mb-6 text-center">Menu</div>
        <nav className="space-y-2 flex-1">
          {campos.map(({ url, nombre, icono: Icon }) => (

            <Link 
            to={url}
              key={nombre}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${active === nombre ? "bg-blue-500 text-white shadow-lg" : "text-gray-600  hover:bg-[#ab9fc9]"
                }`}
              onClick={() => setActive(nombre)}
            >

                {Icon && <FontAwesomeIcon icon={Icon} className="text-2xl text-slate-800" />} {nombre}
            </Link>

          ))}
        </nav>
        <button className="mt-auto p-3 text-gray-600 hover:text-red-500">Log out</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ">
        <h1 className="text-fuchsia-950 text-4xl font-bold">{active}</h1>
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <section className="mt-4 w-full flex flex-col items-center ">
           <Outlet />
         </section>
        </div>
      </main>
    </div>
  );
}
