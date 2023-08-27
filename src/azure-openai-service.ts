import {
  getAzureOpenAIApiKeyConfiguration,
  getMaxTokensConfiguration,
  getAzureOpenAIDeploymentNameConfiguration,
  getAzureOpenAIEndpointConfiguration,
} from "./config";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

import { window } from "vscode";
import { IRevisionService } from "./revision-service";
import { PromptHelper } from "./prompt-helper";

export class AzureOpenAIRevisionService implements IRevisionService {
  private openaiService: OpenAIClient;
  constructor() {
    const apiKey = getAzureOpenAIApiKeyConfiguration();
    const endpoint = getAzureOpenAIEndpointConfiguration();
    const deploymentName = getAzureOpenAIDeploymentNameConfiguration();
    if (apiKey === "") {
      window.showInformationMessage(
        `Azure OpenAI API key is not set. Please set it in the settings then reload the window.`
      );
    }
    if (endpoint === "") {
      window.showInformationMessage(
        `Azure OpenAI endpoint is not set. Please set it in the settings then reload the window.`
      );
    }
    if (deploymentName === "") {
      window.showInformationMessage(
        `Azure OpenAI deployment name is not set. Please set it in the settings then reload the window.`
      );
    }
    var key = new AzureKeyCredential(apiKey!);
    this.openaiService = new OpenAIClient(endpoint, key);
  }

  async revise(
    text: string,
    language: string,
    writingStyle: string
  ): Promise<string | undefined> {
    try {
      const maxTokens = getMaxTokensConfiguration();
      const prompt = PromptHelper.getRevisionPrompt(
        text,
        language,
        writingStyle
      );
      const deploymentName = getAzureOpenAIDeploymentNameConfiguration();
      const response = await this.openaiService.getCompletions(
        deploymentName,
        [prompt],
        {
          maxTokens: maxTokens,
          temperature: 0.3,
          topP: 1.0,
          frequencyPenalty: 0.0,
          presencePenalty: 0.0,
        }
      );
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
      const prompt = PromptHelper.getTranslationPrompt(
        text,
        sourceLanguage,
        targetLanguage
      );
      const deploymentName = getAzureOpenAIDeploymentNameConfiguration();
      const response = await this.openaiService.getCompletions(
        deploymentName,
        [prompt],
        {
          maxTokens: maxTokens,
          temperature: 0.3,
          topP: 1.0,
          frequencyPenalty: 0.0,
          presencePenalty: 0.0,
        }
      );
      let result = response.choices[0].text;
      return result;
    } catch (error: any) {
      throw error;
    }
  }
}
