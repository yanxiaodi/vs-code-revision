import { getOpenAIApiKeyConfiguration } from "./config";
import { OpenAIApi } from "openai";
import { Configuration } from "openai/dist/configuration";
import { window } from "vscode";

export interface IRevisionService {
  revise(
    text: string,
    language: string,
    writingStyle: string
  ): Promise<string | undefined>;

  translate(
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string | undefined>;
}

export class AzureOpenAIRevisionService implements IRevisionService {
  async revise(
    text: string,
    language: string,
    writingStyle: string
  ): Promise<string> {
    try {
      let result = "This is a test.";
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  async translate(
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string> {
    return "";
  }
}

export class OpenAIRevisionService implements IRevisionService {
  private openaiService: OpenAIApi;
  constructor() {
    const apiKey = getOpenAIApiKeyConfiguration();
    if (apiKey === "") {
      window.showInformationMessage(
        `OpenAI API key is not set. Please set it in the settings then reload the window.`
      );
    }
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    this.openaiService = new OpenAIApi(configuration);
  }

  async revise(
    text: string,
    language: string,
    writingStyle: string
  ): Promise<string | undefined> {
    try {
      const response = await this.openaiService.createCompletion({
        model: "text-davinci-003",
        prompt: `Revise this into better sentences and paragraphs in ${language} using a ${writingStyle} tone:\n\n${text}\n\n`,
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      let result = response.data.choices[0].text;
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
      const response = await this.openaiService.createCompletion({
        model: "text-davinci-003",
        prompt: `Translate this into ${targetLanguage} from ${sourceLanguage}:\n\n${text}\n\n`,
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      let result = response.data.choices[0].text;
      return result;
    } catch (error: any) {
      throw error;
    }
  }
}

export class RevisionServiceFactory {
  static createServiceInstance(api: string): IRevisionService {
    switch (api.toLowerCase()) {
      case "azure-openai":
        return new AzureOpenAIRevisionService();
      case "openai":
        return new OpenAIRevisionService();
      default:
        return new OpenAIRevisionService();
    }
  }
}
