export interface IRevisionService {
  revise(text: string, language: string, writingStyle: string): Promise<string>;
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
}

export class ChatGptRevisionService implements IRevisionService {
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
  }


export class RevisionServiceFactory {
    static createServiceInstance(api: string): IRevisionService {
      switch (api.toLowerCase()) {
        case 'azure-openai':
          return new AzureOpenAIRevisionService();
        case 'chatgpt':
          return new ChatGptRevisionService();
        default:
          return new AzureOpenAIRevisionService();
      }
    }
  }