import React, { FC } from 'react';
import './select-language.css';
interface SelectLanguageProps {
  isInput: boolean;
  setShowModal: (response: boolean, mark: boolean) => void;
  selectedLanguage: string;
}

const SelectLanguage: FC<SelectLanguageProps> = ({ isInput, selectedLanguage, setShowModal }) => {
  return (
    <div onClick={() => setShowModal(isInput, true)} className="select-drop-down">
      <input value={selectedLanguage} />
    </div>
  );
};

export default SelectLanguage;
