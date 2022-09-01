import axios from "axios";
import {setWrongFormat, setTranslatedText, setTranslateStatus} from "../../reducers/TranslateReducer";

export class TranslateService {

    static detectWrongLanguage(translateText: string) {
        const options = {
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/Detect',
            params: {'api-version': '3.0'},
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '0dd0d2ca5cmshba9b1b1b6140df5p141722jsn062bf18cbc28',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            data: [{
                Text: translateText as any
            }]
        };
        return async function(dispatch:any) {
            axios.request(options as any).then(function (response) {
                dispatch(setWrongFormat(response.data.map((language: any) => language.language)))
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

    static translateText(translateText: string, language: string) {
        const options = {
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            params: {
                'to[0]': language,
                'api-version': '3.0',
                profanityAction: 'NoAction',
                textType: 'plain'
            },
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '0dd0d2ca5cmshba9b1b1b6140df5p141722jsn062bf18cbc28',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            data: [{
                Text: translateText as any
            }]
        };
        return async function (dispatch: any) {
            dispatch(setTranslateStatus(true))
            axios.request(options as any).then(function (response) {
                dispatch(setTranslatedText(response.data[0].translations[0].text))
                dispatch(setTranslateStatus(false))

            }).catch(function (error) {
                console.error(error);
            });
        }
    }
}
