import * as vscode from 'vscode';
import Case = require('case');
import * as util from './utils/utils';
import { createCubitFromTemplate } from './templates/cubit_template';
import { createStateFromTemplate } from './templates/state_template';
import { createScreenFromTemplate } from './templates/screen_template';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "iruka-flutter" is now active!');

	let disposable = vscode.commands.registerCommand('iruka-flutter.newCubit', async () => {
		try {
			const input = await util.showInputBox(
				'Cubit name you want to create.',
				'Enter the cubit name you want to create',
			);

			if (input === undefined) {
				return vscode.window.showErrorMessage('Wrong input data');
			}

			const targetDirectory = await util.targetDirectory(Case.snake(input));
			util.makeDirrectory(targetDirectory);

			await createCubitFromTemplate(input);
			await createStateFromTemplate(input);
			await createScreenFromTemplate(input);

			vscode.window.showInformationMessage(`Cubit was created`);
			return await vscode.commands.executeCommand("editor.action.format");
		} catch (error) {
			console.error(error);
			return vscode.window.showErrorMessage(`Something went wrong`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
