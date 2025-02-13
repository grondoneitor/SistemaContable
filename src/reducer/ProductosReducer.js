export const InitialState = {
    productos: [],
    productosBuscados: [],
    productosCreado:[],
    productoEliminado:[],
    productoEditado:[],
    nombreProductoBuscado: "",
    detalleProducto: null
};

export const ActionTypes = {
    MOSTRAR_PRODUCTOS: 'mostrar_productos',
    BUSCADOR_PRODUCTOS: 'buscador_productos',
    GUARDAR_PRO_BUSCADO: 'guardar_pro_buscado',
    CREAR_PRODUCTO: 'crear_producto',
    BORRAR_PRODUCTO: 'borrar_producto',
    EDITAR_PRODUCTO: 'editar_producto',
    DETALLE_PRODUCTO: 'detalle_producto',
};

export const ProductReducer = (state = InitialState, action) => {
    const { type: ActionType, payload: ActionPayload } = action;

    switch (ActionType) {
        case ActionTypes.MOSTRAR_PRODUCTOS: {
            return {
                ...state,
                productos: ActionPayload, 
            };
        }
        case ActionTypes.BUSCADOR_PRODUCTOS:{
           
            return{
                ...state,
                productosBuscados:ActionPayload
            }
        }
        case ActionTypes.GUARDAR_PRO_BUSCADO:{

            return{
                ...state,
                nombreProductoBuscado:ActionPayload
            }
        }
        case ActionTypes.CREAR_PRODUCTO:{
            
            return{
                ...state,
                productosCreado: [ActionPayload]
            }
        }
        case ActionTypes.BORRAR_PRODUCTO: {
            return {
                ...state,
                productoEliminado: [ActionPayload],
            };
        }
        case ActionTypes.EDITAR_PRODUCTO: {
            return {
                ...state,
                productoEditado: [ActionPayload],
            };
        }
        
        case ActionTypes.DETALLE_PRODUCTO:{
            return{
                ...state,
                detalleProducto:ActionPayload
            }
        }

        default:
            return state; 
    }
};