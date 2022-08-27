import React, {useCallback, useEffect, useState} from 'react';
import './translate.css'
import {useDispatch} from "react-redux";
import {TranslateService} from "./service/translate-service";
import {useAppSelector} from "../store";
import Skeleton from "../skeleton/Skeleton";
import LanguageSelector from "../languages/LanguageSelector";
import useDebounce from "../shared/hooks/useDebounce";
const Translate = () => {
    const [value, setValue] = useState('')
    const translatedText = useAppSelector(state => state.translate.translatedText)
    const wrongFormat = useAppSelector(state => state.translate.wrongFormatLanguage)
    const translatedStatus = useAppSelector(state => state.translate.isLoading)
    // @ts-ignore
    const targetLanguageToTranslate = useAppSelector(state => state.language.secondLanguage)
    // @ts-ignore
    const languageFromTranslate = useAppSelector(state => state.language.firstLanguage)
    const debounceTranslate = useDebounce(value, 350)
    const dispatch = useDispatch()


    useEffect(() => {
        if(debounceTranslate.length) {
            dispatch(TranslateService.detectWrongLanguage(debounceTranslate))
            dispatch(TranslateService.translateText(debounceTranslate, targetLanguageToTranslate.code))
        }
    },[debounceTranslate, targetLanguageToTranslate.code])
    const handleChangeText = (event: any) => {
        setValue(event.target.value)
    }
    const handleTranslateText = () => {
        dispatch(TranslateService.translateText(debounceTranslate, targetLanguageToTranslate.code))
    }
    console.log(wrongFormat)
    console.log(targetLanguageToTranslate)
    console.log(languageFromTranslate)
    return (
        <div>
            <div className="translate_language-section">
                    <LanguageSelector wrongFormat={wrongFormat[0]}/>
            </div>
         <div className="translate_area-section">
             <textarea className="translate_input" placeholder="Write some text" value={value} onChange={(e) => handleChangeText(e)} />
         {translatedStatus
         ?
         <Skeleton/>
         : null}
         <textarea className="translate_input" value={translatedText} contentEditable={false}/>
        </div>
        </div>

    );
};

export default Translate;
