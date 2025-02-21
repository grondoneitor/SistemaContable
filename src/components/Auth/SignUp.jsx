
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemmaSignUp } from "../../services/validaciones";
import { AuthServicios } from "../../services/Auth/authServicios";
import { Alert } from "@mui/material";
const campos = [
    {
    titulo: "Username",
    id: "username",
    placeholder: "Usernam...",
    type: "text"
},
{
    titulo: "Contraseña",
    id: "password",
    placeholder: "Contraseña",
    type: "password"
},
{
    titulo: "Nombre",
    id: "firstname",
    placeholder: "Nombre...",
    type: "text"
},
{
    titulo: "Apellido",
    id: "lastname",
    placeholder: "Apellido...",
    type: "text"
},        {
    titulo: "Mail",
    id: "email",
    placeholder: "Mail...",
    type: "email"
}
]

// eslint-disable-next-line react/prop-types
export default function SignUp() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemmaSignUp)
    });

 

    const { signUp, isMoved} = AuthServicios(reset);

    const handleSubmitAll = async (usuario) => {
  
        console.log(usuario)
        await signUp(usuario)

        
    };

    return (
        <div className="flex items-center justify-center  bg-[#d1c1f3] h-screen h-screen">
            <div className="w-1/3">
                <form
                    onSubmit={handleSubmit(handleSubmitAll)}
                    className="bg-white shadow-md rounded-lg py-4 px-5  border-fuchsia-950 border-4"
                    noValidate
                >
                    <h2 className="font-black text-3xl text-slate-800 text-center mb-10">
                       Registrate
                    </h2>

                    {Array.isArray(campos) && campos.map(campo => (
                        <div className="mb-5" key={campo.id}>
                                <input
                                    {...register(campo.id)}
                                    id={campo.id}
                                    className="w-full p-3 border border-gray-600  "
                                    type={campo.type}
                                    name={campo.id}
                                    placeholder={campo.placeholder}
                                />
                         

                            {errors[campo.id] && <p className="text-red-500">{errors[campo.id].message}</p>}
                        </div>
                    ))}

                    <button
                        className="bg-fuchsia-950 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-900 cursor-pointer transition-colors"
                    >
                        REGISTRATE
                    </button>
                </form>
                <Alert
                    variant="filled"
                    severity="success"
                    className={`transition-all duration-500 ease-linear w-64  right-5
                   ${isMoved ? "right-5 opacity-100" : "-right-72 opacity-0"}
                   fixed bottom-5 mt-10  h-16 flex justify-center items-center  `}
                >
                    <p>Usuario registrado correctamente</p>
                </Alert> 
            </div>
        </div>
    );
}
