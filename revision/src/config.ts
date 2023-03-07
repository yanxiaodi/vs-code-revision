import { workspace } from "vscode";

export const getConfiguration = <T>(key: string) => {
  return workspace.getConfiguration("revision").get<T>(key);
};

export const getApiConfiguration = () => {
  return getConfiguration<string>("api") ?? "openai";
};

export const getAzureOpenAIApiKeyConfiguration = () => {
  return getConfiguration<string>("azureOpenAIApiKey");
};

export const getOpenAIApiKeyConfiguration = () => {
  return getConfiguration<string>("openAIApiKey");
};

export const getWritingStyleConfiguration = () => {
  return getConfiguration<string>("writingStyle") ?? "professional";
};

export const getOtherWritingStyleConfiguration = () => {
  return getConfiguration<string>("otherWritingStyle") ?? "professional";
};

export const getSourceLanguageConfiguration = () => {
  return getConfiguration<string>("sourceLanguage") ?? "en";
};

export const getTargetLanguageConfiguration = () => {
  return getConfiguration<string>("targetLanguage") ?? "zh-CN";
};

export const getEnableSelectionHoverRevisionConfiguration = () => {
  return getConfiguration<boolean>("enableSelectionHoverRevision") ?? true;
};
