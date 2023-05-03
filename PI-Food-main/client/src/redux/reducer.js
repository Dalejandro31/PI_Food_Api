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
        allRecipes:[],
        allDiets:[],
        recipeDetail:[],
        filterRecipe:[],
    }

export const reducer = (state= initialState,action) =>{
//---------->> RECIPESS <<-------------------------

        switch(action.type){
            case GET_API:
                let filterApi= action.payload === 'db' ?
                state.filterRecipe.filter(e => e.createInDB): 
                state.filterRecipe.filter(x => !x.createInDB)
                return{
                    ...state,
                    allRecipes:filterApi
                };

            case GET_ALL_RECIPES:
                return{
                    ...state,
                    allRecipes: action.payload,
                    filterRecipe: action.payload
                };

                case GET_RECIPE_BY_NAME:
                return{
                    ...state,
                    allRecipes: action.payload.slice()
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
                        allDiets: action.payload
                    };

                    case FILTER_DIETS:
                        const filterForDiets = state.filterRecipe.filter(diet => diet.diets.includes(action.payload));

                        return{
                            ...state,
                            allRecipes: action.payload ==  'All' ? state.filterRecipe.slice() : filterForDiets.slice()
                        };

//---------------------->> Order asc desc <<------------------------------                        

                case ORDER_ASC:
                    return{
                        ...state,
                        allRecipes: state.filterRecipe.sort((a,b) => a.name.localeCompare(b.name))
                    };
                
                case ORDER_DESC:
                    return{
                        ...state,
                        allRecipes: state.filterRecipe.sort((a,b) => b.name.localeCompare(a.name))
                    };
                
                case HEALTSC_ASC:
                    return{
                        ...state,
                        allRecipes: state.filterRecipe.sort((a,b) => b.healthscore - a.healthscore)
                    };
                
                case HEALTSC_DES:
                    return{
                        ...state,
                        allRecipes: state.filterRecipe.sort((a,b) => a.healthscore - b.healthscore)
                    }

//---------------------->> post <<--------------------------------------------------------------------------
                case POST_RECIPE:
                    return{
                        ...state,
                        allRecipes: [...state.allRecipes.slice(), action.payload]
                    };
        }
    }