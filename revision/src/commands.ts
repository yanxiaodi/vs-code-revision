import { getContent } from './store';
import { CommandIds } from './consts';
import {
  getParagraph,
  getSelectionText,
  insertText,
  setCurrentEditor,
} from './doc-service';
import { IRevisionService } from './revision-service';
import { commands, env, ExtensionContext, StatusBarItem, window } from 'vscode';

export const regiserCommands = (
  context: ExtensionContext,
  servie: IRevisionService,
  language: string,
  writingStyle: string,
  statusBarItem: StatusBarItem
) => {
  let reviseInsert = commands.registerCommand(
    CommandIds.reviseInsertCommand,
    async () => await reviseInsertCommand(servie, language, writingStyle)
  );

//   let translate = commands.registerCommand(
//     CommandIds.translateCommand,
//     async () => await translateCommand(servie, source, target, statusBarItem)
//   );

  let copyRevisionText = commands.registerCommand(
    CommandIds.copyRevisionTextCommand,
    copyRevisionTextCommand
  );
  context.subscriptions.push(
    reviseInsert,
    //translate,
    copyRevisionText
  );
};

export const reviseInsertCommand = async (
  revisionService: IRevisionService,
  language: string,
  writingStyle: string
) => {
  // The code you place here will be executed every time your command is executed
  setCurrentEditor();
  const text = getParagraph();
  try {
    if (text.trim() !== '') {
      let result = await revisionService.revise(text, language, writingStyle);
      insertText(result);
    }
  } catch (error: any) {
    window.showErrorMessage(`Error occurs. ${error}`);
  }
};

export const copyRevisionTextCommand = () => {
  try {
    var content = getContent();
    copyToClipboard(content);
  } catch (error: any) {
    window.showErrorMessage(`Error occurs. ${error}`);
  }
};

const copyToClipboard = (content: string) => {
  env.clipboard.writeText(content);
  window.showInformationMessage(`Revised text copyied to the clipboard!`);
};
