interface TranslateReducerInitialState {
  translateText: string;
  isLoading: boolean;
  translatedText: string;
  wrongFormatLanguage: string;
  error: string;
}

const initialState: TranslateReducerInitialState = {
  translateText: '',
  isLoading: false,
  translatedText: '',
  wrongFormatLanguage: '',
  error: '',
};

const SET_TRANSLATE_STATUS = 'SET_TRANSLATE_STATUS';
const SET_TRANSLATE_VALUE = 'SET_TRANSLATE_VALUE';
const SET_TRANSLATED_TEXT = 'SET_TRANSLATED_TEXT';
const SET_WRONG_FORMAT = 'CHECK_WRONG_FORMAT';
const SET_ERROR = 'SET_ERROR';

export const translateReducer = (state: TranslateReducerInitialState = initialState, action: any) => {
  switch (action.type) {
    case SET_TRANSLATE_STATUS:
      return { ...state, isLoading: action.payload };
    case SET_TRANSLATE_VALUE:
      return { ...state, translateText: action.payload };
    case SET_TRANSLATED_TEXT:
      return { ...state, translatedText: action.payload };
    case SET_WRONG_FORMAT:
      return { ...state, wrongFormatLanguage: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const setTranslateStatus = (payload: boolean) => ({ type: SET_TRANSLATE_STATUS, payload });
export const setTranslatedText = (payload: string) => ({ type: SET_TRANSLATED_TEXT, payload });
export const setWrongFormat = (payload: any) => ({ type: SET_WRONG_FORMAT, payload });
export const setError = (payload: string) => ({ type: SET_ERROR, payload });
