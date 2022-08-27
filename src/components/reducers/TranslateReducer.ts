
const initialState = {
    translateText: '',
    isLoading: false,
    translatedText: '',
    wrongFormatLanguage: '',
}

const SET_TRANSLATE_STATUS = 'SET_TRANSLATE_STATUS';
const SET_TRANSLATE_VALUE = 'SET_TRANSLATE_VALUE';
const SET_TRANSLATED_TEXT = 'SET_TRANSLATED_TEXT';
const CHECK_WRONG_FORMAT = 'CHECK_WRONG_FORMAT';

export const translateReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SET_TRANSLATE_STATUS:
            return {...state, isLoading: action.payload}
        case SET_TRANSLATE_VALUE:
            return {...state, translateText: action.payload}
        case SET_TRANSLATED_TEXT:
            return {...state, translatedText: action.payload}
        case CHECK_WRONG_FORMAT:
            return {...state, wrongFormatLanguage: action.payload}
        default:
            return state;
    }
}

export const setTranslateStatus = (payload: boolean) => ({type: SET_TRANSLATE_STATUS, payload})
export const setTranslateText = (payload: string) => ({type: SET_TRANSLATE_VALUE, payload})
export const setTranslatedText = (payload: string) => ({type: SET_TRANSLATED_TEXT, payload})
export const checkWrongFormat = (payload: any) => ({type: CHECK_WRONG_FORMAT, payload })
