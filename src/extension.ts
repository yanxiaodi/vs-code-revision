import {
	getApiConfiguration,
  } from './config';
  import { registerCommands } from './commands';
  import { RevisionServiceFactory } from './revision-service';
  import {
	ExtensionContext
  } from 'vscode';
  
  // this method is called when your extension is activated
  // your extension is activated the very first time the command is executed
  export function activate(context: ExtensionContext) {
	const api = getApiConfiguration();
	const service = RevisionServiceFactory.createServiceInstance(api);
	registerCommands(context, service);
  }
  
  // this method is called when your extension is deactivated
  export function deactivate() {}
  