
export type LanguageReducerInitialState = {
    isLoading: boolean;
    languages: [];
    firstLanguage: string;
    secondLanguage: string | any;
}

const initialState: LanguageReducerInitialState = {
    isLoading: false,
    languages: [],
    firstLanguage: '',
    secondLanguage: '',
}

const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_FIRST_LANGUAGE = 'SET_FIRST_LANGUAGE';
const SET_SECOND_LANGUAGE = 'SET_SECOND_LANGUAGE';

export const languageReducer = (state: LanguageReducerInitialState = initialState, action: any) => {
    switch (action.type) {
        case SET_LANGUAGES:
            return {...state, languages: [...action.payload]}
        case SET_FIRST_LANGUAGE:
            return {...state, firstLanguage: action.payload}
        case SET_SECOND_LANGUAGE:
            return {...state, secondLanguage: action.payload}
        default:
            return state;
    }
}

export const setLanguages = (payload: any) => ({type: SET_LANGUAGES, payload})
export const setLanguageFromTranslate = (payload:string) => ({type: SET_FIRST_LANGUAGE, payload})
export const setTargetLanguage = (payload:string) => ({type: SET_SECOND_LANGUAGE, payload})
