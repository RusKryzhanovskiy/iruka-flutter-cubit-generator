import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Uri } from 'vscode';
import * as YAML from 'yaml';

export async function currentDirectory(): Promise<Uri> {
    try {
        await vscode.commands.executeCommand('copyFilePath');
        return vscode.Uri.file(await vscode.env.clipboard.readText());
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function targetDirectory(subfolder: string): Promise<string> {
    try {
        const rootDirectory = await currentDirectory();
        if (rootDirectory.path !== '/') {
            return `${rootDirectory.path}/${subfolder}`;
        }

        const folders = vscode.workspace?.workspaceFolders;
        if (folders === undefined) {
            throw Error(`Can't find a destination directory`);
        }

        const path = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            title: 'Enter the path you want to locate your cubit folder',
            placeHolder: 'lib/cubits/auth',
            validateInput: (text: string): string | undefined => {
                if (text.startsWith('/') || text.endsWith('/')) {
                    return `Don't use the '/' symbol at the start or at the end of the path`;
                } else {
                    return undefined;
                }
            }
        });
        const result = Uri.file(`${folders[0].uri.path}/${path}/${subfolder}`);
        return result.path;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function readPubspecYamlProperty(property: string): Promise<string | null> {
    try {
        const folders = vscode.workspace?.workspaceFolders;
        if (folders === undefined) {
            throw Error(`Can't find a destination directory`);
        }
        const rootDirectory = folders[0].uri;
        const pubspecYamlFile = fs.readFileSync(`${rootDirectory.path.split('/lib')[0]}/pubspec.yaml`, 'utf8');
        return await YAML.parse(pubspecYamlFile)[property];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function writeFile(directory: string, fileName: string, content: string): boolean {
    try {
        fs.writeFileSync(path.join(directory, fileName), content);
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function isDirectoryExist(directory: string): boolean {
    try {
        return fs.existsSync(directory);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function makeDirrectory(directory: string): boolean {
    try {
        fs.mkdirSync(directory, { recursive: true });
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function showInputBox(placeHolder: string, title: string): Promise<string | undefined> {
    try {
        return await vscode.window.showInputBox({ placeHolder: placeHolder, title: title });
    } catch (error) {
        console.error(error);
        throw error;
    }
}