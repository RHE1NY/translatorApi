import {LanguageModel} from "./language-model";

export type FavoriteModel = {
    targetLanguage: LanguageModel;
    fromLanguage: LanguageModel;
    translatedText: string;
    textToTranslate: string;
    id?:number;
}
