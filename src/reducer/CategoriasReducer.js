
export const InitialState = {
    categorias:[],
    categoriasBuscados: [],
    nombreCategoriaBuscado: ""
};

// Tipos de acción
export const ActionTypes = {
    MOSTRAR_CATEGORIAS: 'mostrar_categorias',
    CREAR_CATEGORIA: 'crear_categoria',
    EDITAR_CATEGORIA: 'editar_categoria',
    BORRAR_CATEGORIA: 'borrar_categoria',
    BUSCAR_CATEGORIA: 'buscar_categoria',
    GUARDAR_CAT_CATEGORIA: 'guardar_cat_categoria'
};

// Reducer
export const CategoriaReducer = (state = InitialState, action) => {
    const { type: ActionType, payload: ActionPayload } = action;

    switch (ActionType) {
        case ActionTypes.MOSTRAR_CATEGORIAS: {
            return {
                ...state,
                categorias: ActionPayload, // Asignamos directamente los productos del payload
            };
        }
        case ActionTypes.CREAR_CATEGORIA:{
            return{
                ...state,
                categorias: [...state.categorias, ActionPayload]
            }
        }
        case ActionTypes.EDITAR_CATEGORIA: {

            return{
                ...state,
                categorias: state.categorias.map((categoria) => {
                    if (categoria.id === ActionPayload.id) {
                       return {...categoria, ...ActionPayload}
                    }
                    return categoria
                })
            }
        }
        case ActionTypes.BORRAR_CATEGORIA:{
            return{
                ...state,
                categorias: state.categorias.filter(categoria =>{
                    return categoria.id !== ActionPayload.id
                })
            }
        }
        case ActionTypes.BUSCAR_CATEGORIA: {
            return{
                ...state,
                categoriasBuscados:ActionPayload
            }
        }
        case ActionTypes.GUARDAR_CAT_CATEGORIA:{
            return{
                ...state,
                nombreCategoriaBuscado:ActionPayload
            }
        }
        default:
            return state; // Retorna el estado actual si no coincide la acción
    }
};