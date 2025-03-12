
export const InitialState = {
    ventas: [],
    ventaCreada: [],
    vantaModificada: [],
    ventaEliminada: [],
    mensajeExito: "",
    mensajeError: "",
    filtersVentas: [{
        start: null,
        end: null
    }]
}

export const ActionTypes = {
    GUARDAR_VENTAS: "guardar_ventas",
    CREAR_VENTA_CONTEXT: "crear_venta_context",
    MODIFICAR_VENTA_CONTEXT: "modificar_venta_context",
    ELIMINAR_VENTA_CONTEXT: "eliminar_venta_context",
    GUARDAR_MENSAJE_EXITO: "guardar_mensaje_exito",
    GUARDAR_MENSAJE_ERROR: "guardar_mensaje_error",
    ADD_FILTER_START: "add_filter_start",
    ADD_FILTER_END: "add_filter_end"
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
        case ActionTypes.ADD_FILTER_START:{
            return {
                ...state,
                filtersVentas : {...state.filtersVentas, start: ActionPayload }
            }
        }
        case ActionTypes.ADD_FILTER_END:{
            return {
                ...state,
                filtersVentas : {...state.filtersVentas, end: ActionPayload }
            }
        }


        default:
            return state
    }
} 