
export const InitialState = {
    ventas: [],
    ventaCreada: [],
    vantaModificada: [],
    ventaEliminada: [],
    mensajeExito: "",
    mensajeError: ""
}

export const ActionTypes = {
    GUARDAR_VENTAS: "guardar_ventas",
    CREAR_VENTA_CONTEXT: "crear_venta_context",
    MODIFICAR_VENTA_CONTEXT: "modificar_venta_context",
    ELIMINAR_VENTA_CONTEXT: "eliminar_venta_context",
    GUARDAR_MENSAJE_EXITO: "guardar_mensaje_exito",
    GUARDAR_MENSAJE_ERROR: "guardar_mensaje_error"
}

export const VentasReducer = (state = InitialState, action) => {

    const { type: ActionType, payload: ActionPayload } = action


    switch (ActionType) {
        case ActionTypes.GUARDAR_VENTAS: {
            return {
                ...state,
                ventas: ActionPayload
            }
        }
        case ActionTypes.CREAR_VENTA_CONTEXT: {

            return {
                ...state,
                ventaCreada: ActionPayload
            }
        }
        case ActionTypes.MODIFICAR_VENTA_CONTEXT: {
            return {
                ...state,
                vantaModificada: ActionPayload
            }
        }
        case ActionTypes.ELIMINAR_VENTA_CONTEXT: {
            return {
                ...state,
                ventaEliminada: ActionPayload
            }
        }

        case ActionTypes.GUARDAR_MENSAJE_EXITO: {
            return {
                ...state,
                mensajeExito: ActionPayload
            }
        }
        case ActionTypes.GUARDAR_MENSAJE_ERROR: {
            return {
                ...state,
                mensajeError: ActionPayload
            }
        }

        default:
            return state
    }
} 