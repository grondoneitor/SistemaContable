
export const InitialState = {
    proveedores: [],
    proveedorCreado: [],
    proveedorEditado: [],
    proveedorEliminado: [],
    mensajeExito: "",
    mensajeError: ""
}

export const ActionsTypes = {
    GUARDAR_PROVEEDORES: "guardar_proveedores",
    CREAR_PROVEEDOR: "crear_proveedor",
    EDITAR_PROVEEDOR: "editar_proveedor",
    ELIMINAR_PROVEEDOR: "eliminar_proveedor",
    MENSAJE_EXITO: "mensaje_exito",
    MENSAJE_ERROR: "mensaje_error"
}

export const ProveedoresReducer = (state = InitialState, action) => {

    const { type: ActionType, payload: ActionPayload } = action;

    switch (ActionType) {
        case ActionsTypes.GUARDAR_PROVEEDORES: {
            return {
                ...state,
                proveedores: ActionPayload
            }
        }
        case ActionsTypes.CREAR_PROVEEDOR: {
            return {
                ...state,
                proveedorCreado: [ActionPayload]
            }
        }
        case ActionsTypes.EDITAR_PROVEEDOR: {
            return {
                ...state,
                proveedorEditado: [ActionPayload]
            }
        }
        case ActionsTypes.ELIMINAR_PROVEEDOR: {
            return {
                ...state,
                proveedorEliminado: [ActionPayload]
            }
        }
        case ActionsTypes.MENSAJE_EXITO: {
            return {
                ...state,
                mensajeExito: ActionPayload
            }
        }
        case ActionsTypes.MENSAJE_ERROR: {
            return {
                ...state,
                mensajeError: ActionPayload
            }
        }

        default: return state
    }

}