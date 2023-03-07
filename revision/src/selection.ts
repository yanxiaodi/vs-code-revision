import { IRevisionService } from './revision-service';
import { getEnableSelectionHoverRevisionConfiguration } from "./config";
import {
  commands,
  ExtensionContext,
  TextEditorSelectionChangeEvent,
  TextEditorSelectionChangeKind,
  window,
} from "vscode";
import { setCurrentEditor } from "./doc-service";
import { setContent } from "./store";

export const registerSelectionBehavior = (
  context: ExtensionContext,
  revisionService: IRevisionService,
  source: string,
  target: string
) => {
  if (!getEnableSelectionHoverRevisionConfiguration()) {
    return;
  }
  setCurrentEditor();
  let hoverTimer: NodeJS.Timeout;
  const selectionChanged = window.onDidChangeTextEditorSelection(async (e) => {
    clearTimeout(hoverTimer);
    let latencyTime = 300;
    hoverTimer = setTimeout(async () => {
      await showHover(e, revisionService, source, target);
    }, latencyTime);
  });
  context.subscriptions.push(selectionChanged);
};

const showHover = async (
  e: TextEditorSelectionChangeEvent,
  revisionService: IRevisionService,
  source: string,
  target: string
) => {
  try {
    const selections = e.selections.filter((selection) => !selection.isEmpty);
    if (
      selections.length !== 1 ||
      e.kind !== TextEditorSelectionChangeKind.Mouse
    ) {
      return;
    }
    const text = e.textEditor.document.getText(selections[0]);
    setContent("");
    const result = await revisionService.revise(text, source, target);
    setContent(result ?? "");
    commands.executeCommand("editor.action.showHover");
  } catch (error: any) {
    window.showErrorMessage(`Error occurs. ${error}`);
  }
};
