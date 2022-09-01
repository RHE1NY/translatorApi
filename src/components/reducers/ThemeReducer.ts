import {ThemeEnums} from "../shared/constants/theme-enums";


const initialState = {
    theme: ThemeEnums.LIGHT,
}

const SET_LIGHT_THEME = 'SET_LIGHT_THEME';
const SET_THEME = 'SET_THEME';

export const themeReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SET_THEME:
            return {...state, theme: action.payload}
        default:
            return state;
    }
}

export const setTheme = (payload: any) => ({type: SET_THEME, payload})
