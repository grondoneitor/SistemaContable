
export const InitialState= {
    ventas:[]
}

export const ActionTypes={
    GUARDAR_VENTAS:"guardar_ventas",
    CREAR_VENTA:"crear_venta"
}

export const VentasReducer = (state=InitialState,action) =>{

    const {type:ActionType, payload:ActionPayload}= action
    

    switch(ActionType){
        case ActionTypes.GUARDAR_VENTAS:{
            return{
                ...state,
                ventas:ActionPayload
            }
        }

        default:
            return state
    }
} 