

export const InitialState = {
    categorias:[],
    categoriasBuscados: [],
    nombreCategoriaBuscado: "",
    categoriaCreada:[],
    categoriaEditada: [],
    categoriaEliminada: [],
    categoriaSeleccionada: []
};

// Tipos de acción
export const ActionTypes = {
    MOSTRAR_CATEGORIAS: 'mostrar_categorias',
    CREAR_CATEGORIA: 'crear_categoria',
    EDITAR_CATEGORIA: 'editar_categoria',
    BORRAR_CATEGORIA: 'borrar_categoria',
    BUSCAR_CATEGORIA: 'buscar_categoria',
    GUARDAR_CAT_CATEGORIA: 'guardar_cat_categoria',
    CATEGORIA_CREADA: 'categoria_creada',
    CATEGORIA_SELECCIONADA: 'categoria_seleccionada',
};

// Reducer
export const CategoriaReducer = (state = InitialState, action) => {
    const { type: ActionType, payload: ActionPayload } = action;

    switch (ActionType) {
        case ActionTypes.MOSTRAR_CATEGORIAS: {
            return {
                ...state,
                categorias: ActionPayload
            };
        }
        case ActionTypes.CREAR_CATEGORIA:{
            return{
                ...state,
                categoriaCreada: [ ActionPayload]
            }
        }
        case ActionTypes.EDITAR_CATEGORIA: {

            return{
                ...state,
                categoriaEditada:[ActionPayload]
            }
        }
        case ActionTypes.BORRAR_CATEGORIA:{
            return{
                ...state,
                categoriaEliminada:[ActionPayload]
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
        case ActionTypes.CATEGORIA_CREADA:{
            return{
                ...state,
                categoriaCreada: ActionPayload
            }
        }
        case ActionTypes.CATEGORIA_SELECCIONADA:{
            return{
                ...state,
                categoriaSeleccionada: ActionPayload
            }
        }
        default:
            return state; // Retorna el estado actual si no coincide la acción
    }
};