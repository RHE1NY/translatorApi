import {FavoriteModel} from "../shared/models/favorite-model";

export type HistoryReducerInitialState = {
    historyList: FavoriteModel[] | string[];
}

const initialState = {
    historyList: [],
}

const SET_ITEM_TO_HISTORY = "SET_ITEM_TO_HISTORY";

export const historyReducer = (state: HistoryReducerInitialState = initialState, action: any) => {
    switch (action.type) {
        case SET_ITEM_TO_HISTORY:
            return {...state, historyList: [...state.historyList ,action.payload]}
        default:
            return state;
    }
}

export const setItemToHistory = (payload: any) => ({type: SET_ITEM_TO_HISTORY, payload})