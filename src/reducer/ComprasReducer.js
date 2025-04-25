
export const InitialState = {
    compras: [],
    compraCreada: [],
    compraModificada: [],
    compraEliminada: [],
    mensajeExito: "",
    mensajeError: "",
    filtersCompras: [{
        start: null,
        end: null
    }]
}

export const ActionTypes = {
    GUARDAR_COMPRAS: "guardar_compras",
    CREAR_COMPRA_CONTEXT: "crear_compra_context",
    MODIFICAR_COMPRA_CONTEXT: "modificar_compra_context",
    ELIMINAR_COMPRA_CONTEXT: "eliminar_compra_context",
    GUARDAR_MENSAJE_EXITO: "guardar_mensaje_exito",
    GUARDAR_MENSAJE_ERROR: "guardar_mensaje_error",
    ADD_FILTER_START: "add_filter_start",
    ADD_FILTER_END: "add_filter_end"
}

export const ComprasReducer = (state = InitialState, action) => {

    const { type: ActionType, payload: ActionPayload } = action


    switch (ActionType) {
        case ActionTypes.GUARDAR_COMPRAS: {
            return {
                ...state,
                compras: ActionPayload
            }
        }
        case ActionTypes.CREAR_COMPRA_CONTEXT: {

            return {
                ...state,
                compraCreada: ActionPayload
            }
        }
        case ActionTypes.MODIFICAR_COMPRA_CONTEXT: {
            return {
                ...state,
                compraModificada: ActionPayload
            }
        }
        case ActionTypes.ELIMINAR_COMPRA_CONTEXT: {
            return {
                ...state,
                compraEliminada: ActionPayload
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
                filtersCompras : {...state.filtersCompras, start: ActionPayload }
            }
        }
        case ActionTypes.ADD_FILTER_END:{
            return {
                ...state,
                filtersCompras : {...state.filtersCompras, end: ActionPayload }
            }
        }


        default:
            return state
    }
} 