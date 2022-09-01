import React, { FC } from 'react';
import './favorite.css';
import { useAppSelector } from '../store';
import { setFavoriteToList } from '../reducers/FavoriteReducer';
import { useDispatch } from 'react-redux';

interface FavoriteTabProps {
  open: boolean;
  toggleOpenTab: () => void;
  close: () => void;
}

const Favorite: FC<FavoriteTabProps> = ({ close, open }) => {
  const favoriteList = useAppSelector((state) => state.favorite.favoriteList);
  const dispatch = useDispatch();
  const handleRemoveFromFavorite = (favoriteItem: any) => {
    const newFavoriteList = favoriteList.filter(
      (favorite: any) => favorite.translatedText !== favoriteItem.translatedText
    );
    dispatch(setFavoriteToList(newFavoriteList));
    localStorage.setItem('favorites', JSON.stringify(newFavoriteList));
  };
  return (
    <div
      className="sidenav"
      style={{
        visibility: open ? 'visible' : 'hidden',
      }}
    >
      <span className="hide-favorite-tab" onClick={() => close()}>
        ×
      </span>
      <div className="favorite-list-section">
        {!favoriteList.length ? (
          <h4>Избранные переводы отсутствуют</h4>
        ) : (
          favoriteList.map((favorite: any) => (
            <>
              <div className={'favorite-list-value'}>
                <span>
                  {favorite.fromLanguage.name} {'→'} {favorite.targetLanguage.name}
                </span>
              </div>
              <div
                className={'favorite-list-remove'}
                title="Удалить из избранного"
                onClick={() => handleRemoveFromFavorite(favorite)}
              >
                ✖
              </div>
              <div className={'favorite-list-value'}>
                <span>
                  {favorite.textToTranslate} {'→'} {favorite.translatedText}
                </span>
              </div>
              <hr
                style={{
                  width: '50%',
                  marginLeft: '27%',
                }}
              />
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorite;
