import { applyMiddleware, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkmiddleware from 'redux-thunk';
import configReducer from "./reducer";


const store = createStore(
    configReducer,
    composeWithDevTools(applyMiddleware(thunkmiddleware))
)

export default store