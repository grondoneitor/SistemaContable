


export const InitialState = {
  clientes:[]
}

const ActionTypes = {
    GUARDAR_CLIENTES: "guardar_clientes"
}

export const ClienteReducer = (state = InitialState, action) => {
    const { type: ActionType, payload: ActionPayload } = action;

    switch (ActionType){
        case ActionTypes.GUARDAR_CLIENTES:{
            return {...state, clientes: ActionPayload}
        }
        default: return state
    }
}