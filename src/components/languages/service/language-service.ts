import axios from "axios";
import {setLanguages} from "../../reducers/LanguageReducer";

export class LanguageService {
    static fetchLanguages() {
        const options = {
            method: 'GET',
            url: 'https://dnaber-languagetool.p.rapidapi.com/v2/languages',
            headers: {
                'X-RapidAPI-Key': '0dd0d2ca5cmshba9b1b1b6140df5p141722jsn062bf18cbc28',
                'X-RapidAPI-Host': 'dnaber-languagetool.p.rapidapi.com'
            }
        };
        return async function(dispatch: any) {
            axios.request(options as any).then(function (response) {
                dispatch(setLanguages(response.data))
            }).catch(function (error) {
                console.error(error);
            });
        }
    }
}
