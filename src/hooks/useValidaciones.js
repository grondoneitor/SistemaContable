// import { useEffect, useRef, useState } from "react";

// export function Validaciones() {
//     const [valorValidado, setValorValidado] = useState('');
//     const [errorValidacion, setErrorValidacion] = useState(null);
//     const firstTime = useRef(true);

//     useEffect(() => {
//         if (firstTime.current) {
//             firstTime.current =false;
//             return;
//         }
//         // Validaciones
//         if (valorValidado.length === 0) {
//             setErrorValidacion(null);
//         } else if (valorValidado.length <= 3) {
//             console.log(valorValidado)
//             setErrorValidacion("El valor no puede ser menor de 3 caracteres");
//         } else if (!isNaN(valorValidado)) {
//             setErrorValidacion("El valor no puede ser un número");
//         } else {
//             setErrorValidacion(null);
//         }
//     }, [valorValidado]);

//     console.log(valorValidado + ' desde afuera ')
//     return { valorValidado, errorValidacion, setValorValidado };
// }
