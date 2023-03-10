import {
  getOtherWritingStyleConfiguration,
  getSourceLanguageConfiguration,
  getTargetLanguageConfiguration,
  getWritingStyleConfiguration,
} from "./config";
import { CommandIds } from "./consts";
import {
  getParagraph,
  getSelectionText,
  insertText,
  setCurrentEditor,
} from "./doc-service";
import { IRevisionService } from "./revision-service";
import { commands, ExtensionContext, window } from "vscode";

export const regiserCommands = (
  context: ExtensionContext,
  servie: IRevisionService
) => {
  let reviseInsert = commands.registerCommand(
    CommandIds.reviseInsertCommand,
    async () => await reviseInsertCommand(servie)
  );

  let translate = commands.registerCommand(
    CommandIds.translateInsertCommand,
    async () => await translateInsertCommand(servie)
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
        insertText(result);
        window.showInformationMessage(
          `Revised text in the ${writingStyle} tone inserted!`
        );
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
        insertText(result);
        window.showInformationMessage(`Translated text inserted!`);
      } else {
        window.showInformationMessage(`Translation request failed!`);
      }
    }
  } catch (error: any) {
    window.showErrorMessage(`Error occurs. ${error}`);
  }
};
