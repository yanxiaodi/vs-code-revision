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

export class OpenAIRevisionService implements IRevisionService {
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
        case 'openai':
          return new OpenAIRevisionService();
        default:
          return new OpenAIRevisionService();
      }
    }
  }