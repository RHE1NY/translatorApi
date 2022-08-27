import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {LanguageService} from "./service/language-service";
import {useAppSelector} from "../store";
import './languages.css'
import {setLanguageFromTranslate, setTargetLanguage} from "../reducers/LanguageReducer";

interface LanguageSelectorProps {
    wrongFormat: string;
}
const LanguageSelector:FC<LanguageSelectorProps> = ({wrongFormat}) => {
    const [firstLanguage, setFirstLanguage] = useState<any>('')
    const [secondLanguage, setSecondLanguage] = useState<any>('')
    const [firstLanguageList, setFirstLanguageList] = useState([])
    const [secondLanguageList, setSecondLanguageList] = useState([])
    // @ts-ignore
    const languagesList = useAppSelector(state => state.language.languages)
    const dispatch = useDispatch()
    useEffect(() => {
     dispatch(LanguageService.fetchLanguages())
    },[])
    useEffect(() => {
        if (languagesList.length) {
            setSecondLanguageList(languagesList)
            // setFirstLanguage(languagesList.find((language: any) => language.code === LanguagesAbbreviationEnums.RUSSIAN))
            // setSecondLanguage(languagesList.find((language: any) => language.code === LanguagesAbbreviationEnums.ENGLISH))
            setFirstLanguage(languagesList[0].code)
            dispatch(setTargetLanguage(languagesList[0] as any))
            dispatch(setLanguageFromTranslate(languagesList[0] as any))
            setSecondLanguage(languagesList[0].code)
            setFirstLanguageList(languagesList)
        }
    }, [languagesList])
    const handleSetLanguages = (event: any, languageNumber: string) => {
        if (languageNumber === 'first') {
            setFirstLanguage(event)
            const targetLanguage = firstLanguageList.find((language: any) => language.code === event)
            dispatch(setLanguageFromTranslate(targetLanguage as any))
        } else {
            setSecondLanguage(event)
            const targetLanguage = secondLanguageList.find((language: any) => language.code === event)
            dispatch(setTargetLanguage(targetLanguage as any))
        }
    }
    const handleSwitchLanguages = () => {
            setFirstLanguage(firstLanguage)
            setSecondLanguage(secondLanguage)
    }
    return (
        <div className="section-selector">
            <select  onChange={(e) => handleSetLanguages(e.target.value, 'first')}>
                {firstLanguageList.map((language: any) =>
                    <option value={language.code}>{language.name}</option>
                )}
            </select>
            <img src="https://w7.pngwing.com/pngs/655/703/png-transparent-computer-icons-arrow-switch-volume-icon-miscellaneous-angle-text.png"
                 className="switch_btn" height='50px' width='50px' alt="switch" title="Обратный перевод" onClick={handleSwitchLanguages}
            />
            <select onChange={(e) => handleSetLanguages(e.target.value, 'second')}>
                {secondLanguageList.map((language: any) =>
                    <option value={language.code}>{language.name}</option>
                )}
            </select>
        </div>
    );
};

export default LanguageSelector;
