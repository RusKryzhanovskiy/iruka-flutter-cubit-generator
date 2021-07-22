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
exports.showInputBox = exports.makeDirrectory = exports.writeFile = exports.readPubspecYamlProperty = exports.targetDirectory = exports.currentDirectory = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
function currentDirectory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield vscode.commands.executeCommand('copyFilePath');
            return vscode.Uri.file(yield vscode.env.clipboard.readText());
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.currentDirectory = currentDirectory;
function targetDirectory(subfolder) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rootDirectory = yield currentDirectory();
            return `${rootDirectory.path}/${subfolder}`;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.targetDirectory = targetDirectory;
function readPubspecYamlProperty(property) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rootDirectory = yield currentDirectory();
            const pubspecYamlFile = fs.readFileSync(`${rootDirectory.path.split('/lib')[0]}/pubspec.yaml`, 'utf8');
            return yield YAML.parse(pubspecYamlFile)[property];
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.readPubspecYamlProperty = readPubspecYamlProperty;
function writeFile(directory, fileName, content) {
    try {
        fs.writeFileSync(path.join(directory, fileName), content);
        return true;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.writeFile = writeFile;
function makeDirrectory(directory) {
    try {
        fs.mkdirSync(directory);
        return true;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.makeDirrectory = makeDirrectory;
function showInputBox(placeHolder, title) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield vscode.window.showInputBox({ placeHolder: placeHolder, title: title });
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.showInputBox = showInputBox;
//# sourceMappingURL=utils.js.map