export const InitialState = {
    clientes: [],
    clienteCreadoNuevo: [],
    clientesBorrados: [],
    clienteParaEditar: [],
    mensajeError: "",
    mensajeExito: ""

}

const ActionTypes = {
    GUARDAR_CLIENTES: "guardar_clientes",
    CREAR_CLIENTE: "crear_cliente",
    BORRAR_CLIENTE: "borrar_cliente",
    CLIENTE_PARA_EDITAR: "cliente_para_editar",
    MENSAJE_ERROR: "mensaje_error",
    MENSAJE_EXITO: "mensaje_exito"
}

export const ClienteReducer = (state = InitialState, action) => {
    const { type: ActionType, payload: ActionPayload } = action;

    switch (ActionType) {
        case ActionTypes.GUARDAR_CLIENTES: {
            return { ...state, clientes: ActionPayload }
        }
        case ActionTypes.CREAR_CLIENTE: {
            return {
                ...state,
                clienteCreadoNuevo: [ActionPayload]
            }
        }
        case ActionTypes.BORRAR_CLIENTE: {
            return {
                ...state,
                clientesBorrados: [ActionPayload]
            }
        }
        case ActionTypes.CLIENTE_PARA_EDITAR: {
            return {
                ...state,
                clienteParaEditar: [ActionPayload]
            }
        }
        case ActionTypes.MENSAJE_ERROR:{
            return{
                ...state,
                mensajeError: ActionPayload
            }
        }
        case ActionTypes.MENSAJE_EXITO:{
            return{
                ...state,
                mensajeExito: ActionPayload
            }
        }
        default: return state
    }
}