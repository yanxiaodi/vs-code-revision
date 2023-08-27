import { getRevisionCustomPrompt, getRevisionPromptType, getTranslationCustomPrompt, getTranslationPromptType } from "./config";


export class PromptHelper{
    static getRevisionPrompt(text: string, sourceLanguage: string, writingStyle: string): string {
        let prompt = '';
        const promptType = getRevisionPromptType();
        if (promptType === "default") {
            prompt = `Revise this into better sentences and paragraphs in ${sourceLanguage} using a ${writingStyle} tone:\n\n${text}\n\n`;
        }
        else {
            prompt = getRevisionCustomPrompt().replace('${sourceLanguage}', sourceLanguage).replace('${writingStyle}', writingStyle).replace('${text}', text);
        }
        return prompt;
    }

    static getTranslationPrompt(text: string, sourceLanguage: string, targetLanguage: string): string {
        let prompt = '';
        const promptType = getTranslationPromptType();
        if (promptType === "default") {
            prompt = `Translate this from ${sourceLanguage} to ${targetLanguage}:\n\n${text}\n\n`;
        }
        else {
            prompt = getTranslationCustomPrompt().replace('${sourceLanguage}', sourceLanguage).replace('${targetLanguage}', targetLanguage).replace('${text}', text);
        }
        return prompt;
    }
}