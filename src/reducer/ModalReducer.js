
export const InitialState = {
    open: false,
    productoSelected:null,
    openModalCreate: false

}

export const ActionTypes = {
    OPEN_MODAL: 'open_modal',
    CLOSE_MODAL: 'close_modal',
    OPEN_MODAL_CREATE: 'open_modal_create',
    CLOSE_MODAL_CREATE: 'close_modal_create'
}

export const ModalReducer = (state = InitialState, action) => {
    const { type: ActionType, payload:{ ActionPayload, productos} = {} } = action;
   
    switch (ActionType) { 
         case ActionTypes.OPEN_MODAL:{
            const product = productos.map((row) => {
                if (row.id === ActionPayload) return row
            });
             return{
                ...state, 
                open: true,
                productoSelected: product || null
             }
         }
         case ActionTypes.CLOSE_MODAL:{
            return{
                ...state,
                open: false,
                productoSelected:null
            }
         }
         case ActionTypes.OPEN_MODAL_CREATE:{
            return{
                ...state,
                openModalCreate: true
            }
         }
         case ActionTypes.CLOSE_MODAL_CREATE:{
            return{
                ...state,
                openModalCreate: false
            }
         }
         default: return state
    }
}