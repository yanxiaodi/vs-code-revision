import {
	getSourceLanguageConfiguration,
	getApiConfiguration,
	getTargetLanguageConfiguration,
	getOpenAIApiKeyConfiguration,
  } from './config';
  import { registerSelectionBehavior } from './selection';
  import { registerHover } from './hover';
  import { CommandIds } from './consts';
  import { regiserCommands } from './commands';
  import { RevisionServiceFactory } from './revision-service';
  import {
	ExtensionContext,
	StatusBarAlignment,
	StatusBarItem,
	window,
	workspace,
  } from 'vscode';
  
  // this method is called when your extension is activated
  // your extension is activated the very first time the command is executed
  export function activate(context: ExtensionContext) {
	const api = getApiConfiguration();
	const service = RevisionServiceFactory.createServiceInstance(api);
  
	// let statusBarItem: StatusBarItem = window.createStatusBarItem(
	//   StatusBarAlignment.Left
	// );
	// statusBarItem.command = CommandIds.copyRevisionTextCommand;
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	regiserCommands(context, service);
	registerHover(context);
	//registerSelectionBehavior(context, service, source, target);
  }
  
  // this method is called when your extension is deactivated
  export function deactivate() {}
  