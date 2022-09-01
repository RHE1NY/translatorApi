import { LanguageModel } from '../shared/models/language-model';

export type LanguageReducerInitialState = {
  isLoading: boolean;
  languages: LanguageModel[];
  sortedLanguages: LanguageModel[];
  fromLanguage: string | any;
  targetLanguage: string | any;
  isTargetLanguage: boolean;
};

const initialState: LanguageReducerInitialState = {
  isLoading: false,
  languages: [],
  sortedLanguages: [],
  fromLanguage: '',
  targetLanguage: '',
  isTargetLanguage: false,
};

const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_FIRST_LANGUAGE = 'SET_FIRST_LANGUAGE';
const SET_SECOND_LANGUAGE = 'SET_SECOND_LANGUAGE';
const SET_IS_TARGET_LANGUAGE_STATUS = 'SET_IS_TARGET_LANGUAGE_STATUS';
const SEARCH_LANGUAGE = 'SEARCH_LANGUAGE';

export const languageReducer = (state: LanguageReducerInitialState = initialState, action: any) => {
  switch (action.type) {
    case SET_LANGUAGES:
      return { ...state, languages: [...action.payload], sortedLanguages: [...action.payload] };
    case SET_FIRST_LANGUAGE:
      return { ...state, fromLanguage: action.payload };
    case SET_SECOND_LANGUAGE:
      return { ...state, targetLanguage: action.payload };
    case SET_IS_TARGET_LANGUAGE_STATUS:
      return { ...state, isTargetLanguage: action.payload };
    case SEARCH_LANGUAGE:
      return {
        ...state,
        sortedLanguages: [
          ...state.languages.filter((item: LanguageModel) =>
            item.name.toLowerCase().startsWith(action.payload.toLowerCase())
          ),
        ],
      };
    default:
      return state;
  }
};

export const setLanguages = (payload: any) => ({ type: SET_LANGUAGES, payload });
export const setLanguageFromTranslate = (payload: string | LanguageModel) => ({ type: SET_FIRST_LANGUAGE, payload });
export const setTargetLanguage = (payload: string | LanguageModel) => ({ type: SET_SECOND_LANGUAGE, payload });
export const setIsTargetLanguageStatus = (payload: boolean) => ({ type: SET_IS_TARGET_LANGUAGE_STATUS, payload });
export const searchLanguages = (payload: any) => ({ type: SEARCH_LANGUAGE, payload });
