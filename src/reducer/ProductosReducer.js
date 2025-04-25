export const InitialState = {
    productos: [],
    productosCreado: [],
    productoEliminado: [],
    productoEditado: [],
    detalleProducto: null,
    mensajeError: "",
    mensajeExito: "",
    filters: [{
        categoria: "",
        nombre: ""
    }]
};

export const ActionTypes = {
    MOSTRAR_PRODUCTOS: 'mostrar_productos',
    CREAR_PRODUCTO: 'crear_producto',
    BORRAR_PRODUCTO: 'borrar_producto',
    EDITAR_PRODUCTO: 'editar_producto',
    DETALLE_PRODUCTO: 'detalle_producto',
    MENSAJE_ERROR: 'mensaje_error',
    MENSAJE_EXITO: 'mensaje_exito',
    ADD_FILTER_CATEGORIA: 'add_filter_categoria',
    ADD_FILTER_NOMBRE: 'add_filter_nombre',
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
       
        case ActionTypes.CREAR_PRODUCTO: {

            return {
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

        case ActionTypes.DETALLE_PRODUCTO: {
            return {
                ...state,
                detalleProducto: ActionPayload
            }
        }
        case ActionTypes.MENSAJE_ERROR: {
            return {
                ...state,
                mensajeError: ActionPayload
            }
        }
        case ActionTypes.MENSAJE_EXITO: {
            return {
                ...state,
                mensajeExito: ActionPayload
            }
        }
        case ActionTypes.ADD_FILTER_CATEGORIA: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    categoria: ActionPayload
                } 
                
                

            };
        }
        case ActionTypes.ADD_FILTER_NOMBRE: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    nombre: ActionPayload
                } 
            };
        }
        

        default:
            return state;
    }
};