import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {translateReducer} from "../reducers/TranslateReducer";
import {languageReducer} from "../reducers/LanguageReducer";

const rootReducer = combineReducers({
    translate: translateReducer,
    language: languageReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
