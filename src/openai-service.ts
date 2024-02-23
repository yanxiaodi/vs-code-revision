import { getMaxTokensConfiguration, getOpenAIApiKeyConfiguration, getOpenAIModelNameConfiguration } from "./config";
import { OpenAI } from "openai";
import { window } from "vscode";
import { IRevisionService } from "./revision-service";
import { PromptHelper } from "./prompt-helper";

export class OpenAIRevisionService implements IRevisionService {
    private openaiService: OpenAI;
    constructor() {
      const apiKey = getOpenAIApiKeyConfiguration();
      if (apiKey === "") {
        window.showInformationMessage(
          `OpenAI API key is not set. Please set it in the settings then reload the window.`
        );
      }

      const modelName = getOpenAIModelNameConfiguration();
      if (modelName === "") {
        window.showInformationMessage(
          `OpenAI model name is not set. Please set it in the settings then reload the window.`
        );
      }
      this.openaiService = new OpenAI({
        apiKey: apiKey,
      });
    }
  
    async revise(
      text: string,
      language: string,
      writingStyle: string
    ): Promise<string | undefined> {
      try {
        const maxTokens = getMaxTokensConfiguration();
        const modelName = getOpenAIModelNameConfiguration();
        const prompt = PromptHelper.getRevisionPrompt(text, language, writingStyle);
        const response = await this.openaiService.completions.create({
          model: modelName,
          prompt: prompt,
          temperature: 0.3,
          max_tokens: maxTokens,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        });
        let result = response.choices[0].text;
        return result;
      } catch (error: any) {
        throw error;
      }
    }
  
    async translate(
      text: string,
      sourceLanguage: string,
      targetLanguage: string
    ): Promise<string | undefined> {
      try {
        const maxTokens = getMaxTokensConfiguration();
        const modelName = getOpenAIModelNameConfiguration();
        const prompt = PromptHelper.getTranslationPrompt(text, sourceLanguage, targetLanguage);
        const response = await this.openaiService.completions.create({
          model: modelName,
          prompt: prompt,
          temperature: 0.3,
          max_tokens: maxTokens,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        });
        let result = response.choices[0].text;
        return result;
      } catch (error: any) {
        throw error;
      }
    }
  }
  
