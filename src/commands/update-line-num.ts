import * as vscode from 'vscode';

import { ConfigManager } from '../config/settings';
import { DocumentAnalyzer } from '../editor/document';
import { Logger } from '../utils/logger';

/**
 * 更新所有日志行号命令
 */
export async function updateLineNumCommand(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active editor');
    return;
  }

  try {
    const config = ConfigManager.getConfig();

    if (!config.includeFileInfo) {
      vscode.window.showInformationMessage('Line number tracking is disabled in settings');
      return;
    }

    const analyzer = new DocumentAnalyzer();
    const count = await analyzer.updateAllLogLineNumbers(editor, config);

    if (count > 0) {
      vscode.window.showInformationMessage(`Updated ${count} log statement(s)`);
      Logger.info(`Updated ${count} log statement(s)`);
    } else {
      vscode.window.showInformationMessage('No log statements found');
    }
  } catch (error) {
    Logger.error('Failed to update line numbers', error instanceof Error ? error : undefined);
    vscode.window.showErrorMessage(`Failed to update line numbers: ${error}`);
  }
}
