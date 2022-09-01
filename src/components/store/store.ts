import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {translateReducer} from "../reducers/TranslateReducer";
import {languageReducer} from "../reducers/LanguageReducer";
import {themeReducer} from "../reducers/ThemeReducer";
import {favoriteReducer} from "../reducers/FavoriteReducer";
import {historyReducer} from "../reducers/HistoryReducer";

const rootReducer = combineReducers({
    translate: translateReducer,
    language: languageReducer,
    theme: themeReducer,
    favorite: favoriteReducer,
    history: historyReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
