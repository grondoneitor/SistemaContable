
export const InitialState = {
    transacciones: []
}

export const ActionTypes ={
    GUARDAR_TRANSACCIONES: 'guardar_transacciones'
}

export const UltimasTransaccionesReducer = (state = InitialState, action)=>{

    const {type: ActionType, payload:ActionPayload} = action;

    switch(ActionType){
        case ActionTypes.GUARDAR_TRANSACCIONES:{
            return {...state, transacciones:ActionPayload};
        }
        default:
            return state
    }


}