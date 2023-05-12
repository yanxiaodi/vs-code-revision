import { AzureOpenAIRevisionService } from "./azure-openai-service";
import { OpenAIRevisionService } from "./openai-service";

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
