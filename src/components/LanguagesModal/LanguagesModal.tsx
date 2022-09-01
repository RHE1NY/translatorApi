import React, { FC, useMemo, useState } from 'react';
import { useAppSelector } from '../store';
import { useDispatch } from 'react-redux';
import { LanguageModel } from '../shared/models/language-model';
import {
  searchLanguages,
  setIsTargetLanguageStatus,
  setLanguageFromTranslate,
  setTargetLanguage,
} from '../reducers/LanguageReducer';
import './languages-modal.css';

interface LanguagesModalProps {
  selectedLanguage: LanguageModel;
  setShowModal: (response: boolean) => void;
}

const LanguagesModal: FC<LanguagesModalProps> = ({ selectedLanguage, setShowModal }) => {
  const languageList = useAppSelector((state) => state.language.sortedLanguages);
  const isTargetLanguage = useAppSelector((state) => state.language.isTargetLanguage);
  const [searchedLanguage, setSearchedLanguage] = useState('');
  const dispatch = useDispatch();
  const handleClick = (e: any) => {
    const setLanguage = languageList.find((language) => language.name === e.target.textContent);
    if (isTargetLanguage) {
      dispatch(setTargetLanguage(setLanguage));
    } else {
      dispatch(setLanguageFromTranslate(setLanguage));
    }
    setShowModal(false);
    dispatch(setIsTargetLanguageStatus(false));
  };

  useMemo(() => {
    dispatch(searchLanguages(searchedLanguage));
  }, [searchedLanguage]);

  const handleSearchLanguage = (event: any) => {
    setSearchedLanguage(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(setIsTargetLanguageStatus(false));
  };

  return (
    <>
      <div className="languages-list">
        <div className="search-bar">
          <input defaultValue={selectedLanguage.name} onChange={(event) => handleSearchLanguage(event)} />
          <div className="close-button" onClick={handleCloseModal}>
            ×
          </div>
        </div>
        <div className="languages-value-container">
          <ul>
            {languageList?.map((filteredLanguage: any, languageIndex: number) => (
              <div className="list-item" key={languageIndex}>
                <div className="active-item-icon">{selectedLanguage.name === filteredLanguage.name ? '✓' : ''}</div>
                <li key={languageIndex} onClick={handleClick}>
                  {filteredLanguage.name}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LanguagesModal;
