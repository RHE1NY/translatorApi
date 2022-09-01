import React, { useEffect, useMemo, useState } from 'react';
import './translate.css';
import { useDispatch } from 'react-redux';
import { TranslateService } from './service/translate-service';
import { useAppSelector } from '../store';
import Skeleton from '../skeleton/Skeleton';
import useDebounce from '../shared/hooks/useDebounce';
import { LanguageModel } from '../shared/models/language-model';
import { setTranslatedText, setWrongFormat } from '../reducers/TranslateReducer';
import Favorite from '../favorite/Favorite';
import TextArea from '../TextArea/TextArea';
import { LanguagesAbbreviationEnums } from '../shared/constants/languages-enums';
import LanguagesModal from '../LanguagesModal/LanguagesModal';
import { setIsTargetLanguageStatus, setLanguageFromTranslate, setTargetLanguage } from '../reducers/LanguageReducer';
import { LanguageService } from '../languages/service/language-service';
import { setItemToHistory } from '../reducers/HistoryReducer';
const Translate = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const translatedText = useAppSelector((state) => state.translate.translatedText);
  const wrongFormat = useAppSelector((state) => state.translate.wrongFormatLanguage);
  const languagesList: LanguageModel[] = useAppSelector((state) => state.language.languages);
  const translatedStatus = useAppSelector((state) => state.translate.isLoading);
  const targetLanguageToTranslate = useAppSelector((state) => state.language.targetLanguage);
  const languageFromTranslate = useAppSelector((state) => state.language.fromLanguage);
  const isTargetLanguage = useAppSelector((state) => state.language.isTargetLanguage);
  const [promptLanguage, setPromptLanguage] = useState<LanguageModel | undefined>();
  const [openFavoriteTab, setShowFavoriteTab] = useState(false);
  const [openLanguagesSelector, setOpenLanguagesSelector] = useState(false);
  const debounceTranslate = useDebounce(textToTranslate, 250);
  const dispatch = useDispatch();
  useEffect(() => {
    if (debounceTranslate.length) {
      dispatch(TranslateService.detectWrongLanguage(debounceTranslate));
      dispatch(TranslateService.translateText(textToTranslate, targetLanguageToTranslate.code));
    } else {
      dispatch(setTranslatedText(''));
    }
  }, [debounceTranslate, targetLanguageToTranslate.code]);

  useMemo(() => {
    const itemToHistory = {
      fromLanguage: languageFromTranslate,
      textToTranslate,
      translatedText,
      targetLanguage: targetLanguageToTranslate,
    };
    if (itemToHistory.translatedText.length) {
      dispatch(setItemToHistory(itemToHistory));
    }
  }, [translatedText]);

  const handleChangeText = (event: any) => {
    setTextToTranslate(event.target.value);
  };
  useEffect(() => {
    dispatch(LanguageService.fetchLanguages());
  }, []);
  useEffect(() => {
    if (languageFromTranslate || targetLanguageToTranslate) {
      dispatch(setLanguageFromTranslate(languageFromTranslate as any));
      dispatch(setTargetLanguage(targetLanguageToTranslate as any));
    } else if (languagesList.length > 0) {
      const russianLng = languagesList.find((language) => language.code === LanguagesAbbreviationEnums.RUSSIAN);
      const englishLng = languagesList.find((language) => language.code === LanguagesAbbreviationEnums.ENGLISH);
      dispatch(setLanguageFromTranslate(russianLng as any));
      dispatch(setTargetLanguage(englishLng as any));
    }
  }, [languagesList]);

  const handleSwitchLanguages = () => {
    if (debounceTranslate.length) {
      dispatch(setTargetLanguage(languageFromTranslate));
      dispatch(TranslateService.translateText(debounceTranslate, languageFromTranslate.code));
      dispatch(setLanguageFromTranslate(targetLanguageToTranslate));
      setTextToTranslate(translatedText);
    } else {
      dispatch(setTargetLanguage(languageFromTranslate));
      dispatch(setLanguageFromTranslate(targetLanguageToTranslate));
    }
  };

  const handleTranslateText = () => {
    dispatch(setLanguageFromTranslate(promptLanguage as LanguageModel));
    dispatch(setTargetLanguage(languageFromTranslate));
    dispatch(TranslateService.translateText(textToTranslate, languageFromTranslate.code));
    dispatch(setWrongFormat(''));
  };
  useEffect(() => {
    if (wrongFormat[0] !== undefined) {
      const change = languagesList.find((language: any) => language.code === wrongFormat[0]);
      setPromptLanguage(change);
    }
  }, [wrongFormat]);

  const handleOpenLanguageModal = () => {
    setOpenLanguagesSelector(true);
    dispatch(setIsTargetLanguageStatus(true));
  };

  return (
    <div>
      {!openLanguagesSelector && (
        <>
          <div className="translate_language-section">
            <TextArea
              selectedLanguage={languageFromTranslate.name}
              setShowModal={() => setOpenLanguagesSelector(true)}
              isInput={true}
              translatedText={translatedText}
              textToTranslate={textToTranslate}
              setTextToTranslate={setTextToTranslate}
            />
            {!translatedStatus &&
            debounceTranslate.length &&
            wrongFormat[0] !== languageFromTranslate.code &&
            wrongFormat[0] !== undefined ? (
              <span className="translate_prompt-language" onClick={() => handleTranslateText()}>
                Перевести с: {promptLanguage?.name}
              </span>
            ) : null}
            <div className="switch-arrows">
              <span onClick={handleSwitchLanguages}>⇆</span>
            </div>
            <div className="skeleton-section">{translatedStatus ? <Skeleton /> : null}</div>
            <TextArea
              selectedLanguage={targetLanguageToTranslate.name}
              setShowModal={handleOpenLanguageModal}
              isInput={false}
              translatedText={translatedText}
              setTextToTranslate={handleChangeText}
              textToTranslate={debounceTranslate}
            />
          </div>
        </>
      )}
      {!openLanguagesSelector && (
        <div className="favorite-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263075.png"
            title="Избранное"
            alt="Избранное"
            className="icon-favorite"
            onClick={() => setShowFavoriteTab(!openFavoriteTab)}
          />
          <div>
            <span>Избранное</span>
          </div>
        </div>
      )}
      {openLanguagesSelector && (
        <LanguagesModal
          setShowModal={setOpenLanguagesSelector}
          selectedLanguage={isTargetLanguage ? (targetLanguageToTranslate as any) : languageFromTranslate}
        />
      )}
      <Favorite
        open={openFavoriteTab}
        close={() => setShowFavoriteTab(false)}
        toggleOpenTab={() => setShowFavoriteTab((prev) => !prev)}
      />
    </div>
  );
};

export default Translate;
