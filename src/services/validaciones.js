import * as yup from "yup";

export const schema = yup.object({
    producto: yup.string()
        .required('El nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 letras')
        .max(70, 'El nombre no puede tener más de 70 letras'),
    precio: yup.number()
        .typeError("El precio es obligatorio")
        .positive("Tiene que ser mayor a 0"),
    stock: yup.number()
        .typeError("El stock es obligatorio")
        .positive("Tiene que ser mayor a 0"),
}).required();

