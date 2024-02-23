import {
  getOtherWritingStyleConfiguration,
  getSourceLanguageConfiguration,
  getTargetLanguageConfiguration,
  getWritingStyleConfiguration,
  getReviseActionConfiguration,
  getTranslateActionConfiguration,
} from "./config";
import { CommandIds } from "./consts";
import {
  getParagraph,
  getSelectionText,
  insertText,
  setCurrentEditor,
} from "./doc-service";
import { IRevisionService } from "./revision-service";
import { commands, env, ExtensionContext, window } from "vscode";

export const registerCommands = (
  context: ExtensionContext,
  service: IRevisionService
) => {
  let reviseInsert = commands.registerCommand(
    CommandIds.reviseInsertCommand,
    async () => await reviseInsertCommand(service)
  );

  let translate = commands.registerCommand(
    CommandIds.translateInsertCommand,
    async () => await translateInsertCommand(service)
  );

  context.subscriptions.push(reviseInsert, translate);
};

export const reviseInsertCommand = async (service: IRevisionService) => {
  // The code you place here will be executed every time your command is executed
  setCurrentEditor();
  let text = getSelectionText();
  if (text.trim() === "") {
    text = getParagraph();
  }
  try {
    if (text.trim() !== "") {
      const language = getSourceLanguageConfiguration();
      let writingStyle = getWritingStyleConfiguration();
      if (writingStyle === "other") {
        writingStyle = getOtherWritingStyleConfiguration();
      }
      let result = await service.revise(text, language, writingStyle);
      if (result !== "" && result !== undefined) {
        const action = getReviseActionConfiguration();
        if (action === "insert") {
          insertText(result);
          window.showInformationMessage(
            `Revised text in the ${writingStyle} tone inserted!`
          );
        }
        else{
          copyToClipboard(result);
          window.showInformationMessage(
            `Revised text in the ${writingStyle} tone copied to clipboard!`
          );
        }
      } else {
        window.showInformationMessage(`No revised text found!`);
      }
    }
  } catch (error: any) {
    window.showErrorMessage(`Error occurs. ${error}`);
  }
};

export const translateInsertCommand = async (service: IRevisionService) => {
  // The code you place here will be executed every time your command is executed
  setCurrentEditor();
  let text = getSelectionText();
  if (text.trim() === "") {
    text = getParagraph();
  }
  try {
    if (text.trim() !== "") {
      const source = getSourceLanguageConfiguration();
      const target = getTargetLanguageConfiguration();
      let result = await service.translate(text, source, target);
      if (result !== "" && result !== undefined) {
        const action = getTranslateActionConfiguration();
        if (action === "insert") {
          insertText(result);
          window.showInformationMessage(`Translated text inserted!`);
        }
        else{
          copyToClipboard(result);
          window.showInformationMessage(`Translated text copied to clipboard!`);
        }
      } else {
        window.showInformationMessage(`Translation request failed!`);
      }
    }
  } catch (error: any) {
    window.showErrorMessage(`Error occurs. ${error}`);
  }
};

const copyToClipboard = (text: string) => {
  env.clipboard.writeText(text);
};
