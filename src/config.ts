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

export const getAzureOpenAIDeploymentNameConfiguration = () => {
  return getConfiguration<string>("azureOpenAIDeploymentName") ?? "";
};

export const getAzureOpenAIEndpointConfiguration = () => {
  return getConfiguration<string>("azureOpenAIEndpoint") ?? "";
};

export const getOpenAIApiKeyConfiguration = () => {
  return getConfiguration<string>("openAIApiKey");
};

export const getOpenAIModelNameConfiguration = () => {
  return getConfiguration<string>("openAIModelName") ?? "gpt-3.5-turbo-instruct";
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

export const getMaxTokensConfiguration = () => {
  return getConfiguration<number>("maxTokens") ?? 1500;
};

export const getReviseActionConfiguration = () => {
  return getConfiguration<string>("reviseAction") ?? "insert";
};

export const getTranslateActionConfiguration = () => {
  return getConfiguration<string>("translateAction") ?? "insert";
};

export const getRevisionPromptType = () => {
  return getConfiguration<string>("revisionPromptType") ?? "default";
};

export const getRevisionCustomPrompt = () => {
  return getConfiguration<string>("revisionCustomPrompt") ?? "Revise this into better sentences and paragraphs in ${sourceLanguage} using a ${writingStyle} tone:\n\n${text}\n\n";
};

export const getTranslationPromptType = () => {
  return getConfiguration<string>("translationPromptType") ?? "default";
};

export const getTranslationCustomPrompt = () => {
  return getConfiguration<string>("translationCustomPrompt") ?? "Translate this from ${sourceLanguage} to ${targetLanguage}:\n\n${text}\n\n";
};

