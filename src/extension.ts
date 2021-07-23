import * as vscode from 'vscode';
import Case = require('case');
import * as util from './utils/utils';
import { createCubitFromTemplate } from './templates/cubit_template';
import { createStateFromTemplate } from './templates/state_template';
import { createScreenFromTemplate } from './templates/screen_template';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "iruka-flutter-cubit-generator" is now active!');

	let disposable = vscode.commands.registerCommand('iruka-flutter-cubit-generator.newCubit', async () => {
		try {
			const input = await util.showInputBox(
				'Cubit name you want to create.',
				'Enter the cubit name you want to create',
			);

			if (input === undefined) {
				return vscode.window.showErrorMessage(`Your input can't be recognized!`);
			}

			const targetDirectory = await util.targetDirectory(Case.snake(input));

			if (targetDirectory === null) {
				return vscode.window.showErrorMessage(
					`Click on the folder in the Explorer View in which you want to create a cubit and then run the command!`
				);
			}

			if (util.isDirectoryExist(targetDirectory)) {
				return vscode.window.showErrorMessage(`The ${Case.snake(input)} directory is already exist!`);
			}

			util.makeDirrectory(targetDirectory);

			await createCubitFromTemplate(input, targetDirectory);
			await createStateFromTemplate(input, targetDirectory);
			await createScreenFromTemplate(input, targetDirectory);

			vscode.window.showInformationMessage(`Cubit was created`);
		} catch (error) {
			console.error(error);
			return vscode.window.showErrorMessage(`Cubit wasn't created`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
