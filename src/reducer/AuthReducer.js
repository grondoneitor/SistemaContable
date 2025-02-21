export const InititalState = {
    tokenLogIn:"",
    errorsMessage:"",
    successMessage:""
}

export const ActionTypes ={
    GUARDAR_TOKEN_LOGIN: "guardar_token_login",
    GUARDAR_ERROR_MESSAGE: "guardar_error_message",
    GUARDAR_SUCCESS_MESSAGE: "guardar_success_message",
}

export function AuthReducer(state = InititalState,action){

    const {type:ActionType, payload:ActionPayload} = action
 
    switch(ActionType){
        case ActionTypes.GUARDAR_TOKEN_LOGIN:{
            return{
                ...state,
                tokenLogIn:ActionPayload
            }
        }
        case ActionTypes.GUARDAR_ERROR_MESSAGE:{
            return{
                ...state,
                errorsMessage:ActionPayload
            }
        }
        case ActionTypes.GUARDAR_SUCCESS_MESSAGE:{
            return{
                ...state,
                successMessage:ActionPayload
        }
    }
}
}