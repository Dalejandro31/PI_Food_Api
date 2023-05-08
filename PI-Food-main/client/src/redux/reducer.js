import { GET_ALL_RECIPES,
    GET_RECIPE_BY_NAME,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    FILTER_DIETS,
    ORDER_ASC,
    ORDER_DESC,
    GET_API,
    HEALTSC_ASC,
    HEALTSC_DES,
    POST_RECIPE} from './actions-type';

    const initialState={
        recipes:[],
        diets:[],
        recipeDetail:[],
        filterRecipe:[],
    }

const configReducer = (state= initialState,action) =>{
//---------->> RECIPESS <<-------------------------

        switch(action.type){
            case GET_API:
                let recipeFilterData= action.payload === 'db' ? 
                state.filterRecipe.filter(e => e.createdInDb) 
                : state.filterRecipe.filter( x => !x.createdInDb)
                return{
                    ...state,
                    recipes: recipeFilterData
                };

            case GET_ALL_RECIPES:
                return{
                    ...state,
                    recipes: action.payload,
                    filterRecipe: action.payload
                };

                case GET_RECIPE_BY_NAME:
                return{
                    ...state,
                    recipes: action.payload
                };

                case GET_RECIPE_DETAIL:
                console.log('details', state.recipeDetail);
                return{
                    ...state,
                    recipeDetail: action.payload
                };

//-------------->> DIETS <<--------------------------------

                case GET_DIETS:
                    return{
                        ...state,
                        diets: action.payload
                    };

                    case FILTER_DIETS:
                        const dietsFiltered = state.filterRecipe.filter(e => e.diets.includes(action.payload))
                        return {
                                ...state,
                                recipes: action.payload === 'All' ? state.filterRecipe : dietsFiltered               
                    }

//---------------------->> Order asc desc <<------------------------------                        

                case ORDER_ASC:
                    return{
                        ...state,
                        recipes: state.filterRecipe.sort((a,b) => a.name.localeCompare(b.name))
                    };
                
                case ORDER_DESC:
                    return{
                        ...state,
                        recipes: state.filterRecipe.sort((a,b) => b.name.localeCompare(a.name))
                    };
                
                case HEALTSC_ASC:
                    return{
                        ...state,
                        recipes: state.filterRecipe.sort((a,b) => b.healthscore - a.healthscore)
                    };
                
                case HEALTSC_DES:
                    return{
                        ...state,
                        recipes: state.filterRecipe.sort((a,b) => a.healthscore - b.healthscore)
                    }

//---------------------->> post <<--------------------------------------------------------------------------
                case POST_RECIPE:
                    return{
                        ...state,
                        recipes: state.recipes.concat(action.payload)
                    };
                default:return {...state};
        }
    }

export default configReducer;    