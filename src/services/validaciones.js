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

export const schemaCategoria = yup.object({
    // categoria: yup.string()
    //     .required('La categoria es obligatoria')
}).required()

export const schemaCliente = yup.object({
    nombre: yup.string()
        .required('El nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 letras')
        .max(70, 'El nombre no puede tener más de 70 letras'),
    mail: yup.string()
        .required("El mail es obligatorio")
        .email("El mail no es válido"),
    telefono: yup.string()
        .required("El telefono es obligatorio")
        .min(10, "El telefono debe tener 10 digitos")
        .max(10, "El telefono debe tener 10 digitos"),
    dni: yup.string()
        .required("El DNI es obligatorio")
        .min(8, "El DNI debe tener 8 digitos")
        .max(8, "El DNI debe tener 8 digitos")
}).required();

export const schemmaSignUp = yup.object({
    username: yup.string()
        .required("Es obligatorio")
        .min(3, "El nombre debe tener al menos 3 letras"),
    password: yup.string()
        .required("Es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
    firstname: yup.string()
        .required("El nombre obligatorio")
        .min(3, "El nombre debe tener al menos 3 letras"),
    lastname: yup.string()
        .required("Es obligatoio el apellido")
        .min(3, "El apellido debe tener al menos 3 letras"),
    email: yup.string()
        .required("El mail es obligatorio")
        .email("El mail no es válido"),
})

export const schemaLogIn = yup.object({
    username: yup.string()
        .required("Es obligatorio")
        .min(3, "El minimo son 3 caracteres"),
    password: yup.string()
        .required("Es obligatorio")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
})

export const schemaVentas = yup.object({
    producto: yup.string()
        .required('El producto es obligatorio'),
    cliente: yup.string()
        .required("El cliente es obligatorio"),
    cantidad: yup.string()
        .required("El cantidad es obligatorio"),
    precioTotal: yup.string()
        .required("El precio es obligatorio"),
    fecha: yup.string()
        .required("La fecha es obligatorio")
}).required();

export const schemaProveedor = yup.object({
    nombre: yup.string()
        .required('El nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 letras')
        .max(70, 'El nombre no puede tener más de 70 letras'),
    contacto: yup.string()
        .required('El nombre es obligatorio')
        .min(3, 'El contacto debe tener al menos 3 letras')
        .max(70, 'El nombre no puede tener más de 70 letras')
}).required();

export const schemaCompras = yup.object({
    producto: yup.string()
        .required('El producto es obligatorio'),
    proveedores: yup.string()
        .required("El proveedor es obligatorio"),
    cantidad: yup.string()
        .required("El cantidad es obligatorio"),
    costoTotal: yup.string()
        .required("El precio es obligatorio"),
    fecha: yup.string()
        .required("La fecha es obligatorio")
}).required();