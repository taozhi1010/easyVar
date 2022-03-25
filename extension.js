// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var _ = require('lodash');
// @ts-ignore
const request = require('request');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('easyvar.fanyin', function () {
		// The code you place here will be executed every time your command is executed
		let editor = vscode.window.activeTextEditor;
		let selection = editor.selection
		let text = editor.document.getText(selection)
		const url = 'https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token=24.9a7e756cab6e9a22c86b63b24a8ce048.2592000.1650768311.282335-25841809'
		const json = { q: text, from: "zh", to: "en", termIds: '' }
		request.post(url, {
			json: json
		}, (error, res, body) => {
			if (error) {
				vscode.window.showInformationMessage('网络错误，请重试');
				return
			}
			let text = body.result.trans_result[0].dst
			let replaceText = _.camelCase(text);
			editor.edit(editorEdit => {
				// 这里可以做以下操作: 删除, 插入, 替换, 设置换行符
				editorEdit.replace(selection, replaceText);
			})
		})
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }



module.exports = {
	activate,
	deactivate
}
