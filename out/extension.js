"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const Case = require("case");
const util = require("./utils/utils");
const cubit_template_1 = require("./templates/cubit_template");
const state_template_1 = require("./templates/state_template");
const screen_template_1 = require("./templates/screen_template");
function activate(context) {
    console.log('Congratulations, your extension "iruka-flutter" is now active!');
    let disposable = vscode.commands.registerCommand('iruka-flutter.newCubit', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const input = yield util.showInputBox('Cubit name you want to create.', 'Enter the cubit name you want to create');
            if (input === undefined) {
                return vscode.window.showErrorMessage('Wrong input data');
            }
            const targetDirectory = yield util.targetDirectory(Case.snake(input));
            util.makeDirrectory(targetDirectory);
            yield cubit_template_1.createCubitFromTemplate(input);
            yield state_template_1.createStateFromTemplate(input);
            yield screen_template_1.createScreenFromTemplate(input);
            vscode.window.showInformationMessage(`Cubit was created`);
            return yield vscode.commands.executeCommand("editor.action.format");
        }
        catch (error) {
            console.error(error);
            return vscode.window.showErrorMessage(`Something went wrong`);
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map