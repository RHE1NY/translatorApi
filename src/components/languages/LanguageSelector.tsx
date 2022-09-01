import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LanguageService } from './service/language-service';
import { useAppSelector } from '../store';
import './languages.css';
import { setLanguageFromTranslate, setTargetLanguage } from '../reducers/LanguageReducer';

interface LanguageSelectorProps {
  wrongFormat: string;
}
const LanguageSelector: FC<LanguageSelectorProps> = ({ wrongFormat }) => {
  const [firstLanguage, setFirstLanguage] = useState<any>('');
  const [secondLanguage, setSecondLanguage] = useState<any>('');
  const languagesList = useAppSelector((state) => state.language.languages);
  const languageTarget = useAppSelector((state) => state.language.fromLanguage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LanguageService.fetchLanguages());
  }, []);
  useEffect(() => {
    if (languagesList.length) {
      // setFirstLanguage(languagesList.find((language: any) => language.code === LanguagesAbbreviationEnums.RUSSIAN))
      // setSecondLanguage(languagesList.find((language: any) => language.code === LanguagesAbbreviationEnums.ENGLISH))
      dispatch(setTargetLanguage(languagesList[0] as any));
      dispatch(setLanguageFromTranslate(languagesList[0] as any));
      setFirstLanguage(languagesList[0].code);
      setSecondLanguage(languagesList[0].code);
    }
  }, [languagesList]);

  const handleSetLanguages = (event: any, languageNumber: string) => {
    if (languageNumber === 'first') {
      setFirstLanguage(event);
      const targetLanguage = languagesList.find((language: any) => language.code === event);
      dispatch(setLanguageFromTranslate(targetLanguage as any));
    } else {
      setSecondLanguage(event);
      const targetLanguage = languagesList.find((language: any) => language.code === event);
      dispatch(setTargetLanguage(targetLanguage as any));
    }
  };
  const handleSwitchLanguages = () => {
    const targetLanguage = languagesList.find((language: any) => language.code === secondLanguage);
    dispatch(setLanguageFromTranslate(targetLanguage as any));
    setSecondLanguage(firstLanguage);
  };
  return (
    <div className="section-selector">
      <select className={'section-selector-value'} onChange={(e) => handleSetLanguages(e.target.value, 'first')}>
        {languagesList.map((language: any) => (
          <option onChange={() => handleSwitchLanguages()} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <div className={'arrows'} onClick={handleSwitchLanguages}>
        ⇄
      </div>
      <select className={'section-selector-target'} onChange={(e) => handleSetLanguages(e.target.value, 'second')}>
        {languagesList.map((language: any) => (
          <option value={language.code} selected={firstLanguage}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
