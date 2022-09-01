import React, { FC, useEffect, useMemo } from 'react';
import SelectLanguage from '../DropDown/SelectLanguage';
import { setFavoriteToList, setItemToFavorite } from '../reducers/FavoriteReducer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store';
import './textarea.css';
interface TextBoxProps {
  isInput: boolean;
  translatedText: string;
  textToTranslate: string;
  setTextToTranslate: (event: any) => void;
  selectedLanguage: string;
  setShowModal: () => void;
}

const TextArea: FC<TextBoxProps> = ({
  textToTranslate,
  translatedText,
  isInput,
  setTextToTranslate,
  setShowModal,
  selectedLanguage,
}) => {
  const languageFromTranslate = useAppSelector((state) => state.language.fromLanguage);
  const targetLanguageToTranslate = useAppSelector((state) => state.language.targetLanguage);
  const dispatch = useDispatch();
  const favoriteList = useAppSelector((state) => state.favorite.favoriteList);

  useEffect(() => {
    const getItemsFromStorage = localStorage.getItem('favorites');
    if (JSON.parse(getItemsFromStorage as any) !== null) {
      dispatch(setFavoriteToList(JSON.parse(getItemsFromStorage as any)));
    }
  }, []);

  const existItem = useMemo(
    () => favoriteList?.find((favorite: any) => favorite?.translatedText === translatedText),
    [favoriteList, translatedText]
  );

  const handleChangeFavorite = () => {
    const favoriteItem = {
      fromLanguage: languageFromTranslate,
      textToTranslate: textToTranslate,
      translatedText: translatedText,
      targetLanguage: targetLanguageToTranslate,
    };
    if (existItem) {
      const newFavoriteList = favoriteList.filter(
        (favorite: any) => favorite.translatedText !== favoriteItem.translatedText
      );
      dispatch(setFavoriteToList(newFavoriteList));
      localStorage.setItem('favorites', JSON.stringify(newFavoriteList));
    } else {
      dispatch(setItemToFavorite(favoriteItem));
      localStorage.setItem('favorites', JSON.stringify(favoriteList));
    }
  };

  return (
    <>
      <div className="translate_language-section">
        <SelectLanguage isInput={isInput} setShowModal={setShowModal} selectedLanguage={selectedLanguage} />
      </div>
      <textarea
        className={'translate_input'}
        value={isInput ? textToTranslate : translatedText}
        contentEditable={isInput}
        onChange={(e) => setTextToTranslate(e.target.value)}
        placeholder={isInput ? 'Write some text' : ''}
      />
      {!isInput && (
        <span
          style={{ visibility: translatedText.length ? 'visible' : 'hidden' }}
          onClick={handleChangeFavorite}
          className={existItem?.translatedText?.length ? 'heart-favorite-exist' : 'heart-favorite'}
          title={existItem?.translatedText?.length ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          ♡
        </span>
      )}
    </>
  );
};

export default TextArea;
