
export const InitialState = {
    open: false,
    productoSelected:null
}

export const ActionTypes = {
    OPEN_MODAL: 'open_modal',
    CLOSE_MODAL: 'close_modal'
}

export const ModalReducer = (state = InitialState, action) => {
    const { type: ActionType, payload:{ ActionPayload, allProducts} = {} } = action;
   
    switch (ActionType) { 
         case ActionTypes.OPEN_MODAL:{
            const product = allProducts.map((row) => {
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
         default: return state
    }
}