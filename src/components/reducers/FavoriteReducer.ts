import { FavoriteModel } from '../shared/models/favorite-model';

export type FavoriteReducerInitialState = {
  favoriteList: FavoriteModel[] | string[];
};

const initialState = {
  favoriteList: [],
};

const SET_FAVORITE = 'SET_FAVORITE';
const SET_ITEM_TO_FAVORITE = 'SET_ITEM_TO_FAVORITE';

export const favoriteReducer = (state: FavoriteReducerInitialState = initialState, action: any) => {
  switch (action.type) {
    case SET_FAVORITE:
      return { ...state, favoriteList: action.payload };
    case SET_ITEM_TO_FAVORITE:
      return { ...state, favoriteList: [...state.favoriteList, action.payload] };
    default:
      return state;
  }
};

export const setFavoriteToList = (payload: FavoriteModel[]) => ({ type: SET_FAVORITE, payload });
export const setItemToFavorite = (payload: FavoriteModel) => ({ type: SET_ITEM_TO_FAVORITE, payload });
