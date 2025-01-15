


export const InitialState = {
  clientes:[],
  clienteCreadoNuevo:[]
}

const ActionTypes = {
    GUARDAR_CLIENTES: "guardar_clientes",
    CREAR_CLIENTE: "crear_cliente"
}

export const ClienteReducer = (state = InitialState, action) => {
    const { type: ActionType, payload: ActionPayload } = action;

    switch (ActionType){
        case ActionTypes.GUARDAR_CLIENTES:{
            return {...state, clientes: ActionPayload}
        }
        case ActionTypes.CREAR_CLIENTE:{
            return{
                ...state,
                clienteCreadoNuevo:[ ActionPayload]
            }
        }
        default: return state
    }
}