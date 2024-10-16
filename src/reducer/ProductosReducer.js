
export const InitialState = {
    productos: [],
    productosBuscados: [],
    nombreProductoBuscado: "",
    detalleProducto: null
};

// Tipos de acción
export const ActionTypes = {
    MOSTRAR_PRODUCTOS: 'mostrar_productos',
    BUSCADOR_PRODUCTOS: 'buscador_productos',
    GUARDAR_PRO_BUSCADO: 'guardar_pro_buscado',
    CREAR_PRODUCTO: 'crear_producto',
    BORRAR_PRODUCTO: 'borrar_producto',
    EDITAR_PRODUCTO: 'editar_producto',
    DETALLE_PRODUCTO: 'detalle_producto',
};

// Reducer
export const ProductReducer = (state = InitialState, action) => {
    const { type: ActionType, payload: ActionPayload } = action;

    switch (ActionType) {
        case ActionTypes.MOSTRAR_PRODUCTOS: {
            return {
                ...state,
                productos: ActionPayload, // Asignamos directamente los productos del payload
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
                productos: [...state.productos, ActionPayload]
            }
        }
        case ActionTypes.BORRAR_PRODUCTO: {
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== ActionPayload.id)
            }
        }
        case ActionTypes.EDITAR_PRODUCTO:{
            return{
                ...state,
                productos: state.productos.map(producto =>{
                    if(producto.id === ActionPayload.id){
                        return {...producto, ...ActionPayload}
                    }
                    return producto
                })
            }
        }
        case ActionTypes.DETALLE_PRODUCTO:{
            return{
                ...state,
                detalleProducto:ActionPayload
            }
        }

        default:
            return state; // Retorna el estado actual si no coincide la acción
    }
};