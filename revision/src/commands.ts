import {
  getOtherWritingStyleConfiguration,
  getSourceLanguageConfiguration,
  getWritingStyleConfiguration,
} from "./config";
import { getContent } from "./store";
import { CommandIds } from "./consts";
import {
  getParagraph,
  getSelectionText,
  insertText,
  setCurrentEditor,
} from "./doc-service";
import { IRevisionService } from "./revision-service";
import { commands, env, ExtensionContext, StatusBarItem, window } from "vscode";

export const regiserCommands = (
  context: ExtensionContext,
  servie: IRevisionService
) => {
  let reviseInsert = commands.registerCommand(
    CommandIds.reviseInsertCommand,
    async () => await reviseInsertCommand(servie)
  );

  //   let translate = commands.registerCommand(
  //     CommandIds.translateCommand,
  //     async () => await translateCommand(servie, source, target, statusBarItem)
  //   );

  // let copyRevisionText = commands.registerCommand(
  //   CommandIds.copyRevisionTextCommand,
  //   copyRevisionTextCommand
  // );
  context.subscriptions.push(reviseInsert);
};

export const reviseInsertCommand = async (service: IRevisionService) => {
  // The code you place here will be executed every time your command is executed
  setCurrentEditor();
  let text = getSelectionText();
  if (text === "") {
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
        window.showInformationMessage(`Revised text in the ${writingStyle} tone inserted!`);
      } else {
        window.showInformationMessage(`No revised text found!`);
      }
    }
  } catch (error: any) {
    window.showErrorMessage(`Error occurs. ${error}`);
  }
};

// export const copyRevisionTextCommand = () => {
//   try {
//     var content = getContent();
//     copyToClipboard(content);
//   } catch (error: any) {
//     window.showErrorMessage(`Error occurs. ${error}`);
//   }
// };

// const copyToClipboard = (content: string) => {
//   env.clipboard.writeText(content);
//   window.showInformationMessage(`Revised text copyied to the clipboard!`);
// };
