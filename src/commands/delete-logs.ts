import * as vscode from 'vscode';

import { ConfigManager } from '../config/settings';
import { DocumentAnalyzer } from '../editor/document';
import { Logger } from '../utils/logger';

/**
 * 删除所有日志命令
 */
export async function deleteAllLogsCommand(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active editor');
    return;
  }

  try {
    const config = ConfigManager.getConfig();
    const analyzer = new DocumentAnalyzer();
    const logs = analyzer.findAllGeneratedLogs(editor.document, config);

    if (logs.length === 0) {
      vscode.window.showInformationMessage('No log statements found');
      return;
    }

    await editor.edit((editBuilder) => {
      // 从后往前删除，避免行号变化
      for (let i = logs.length - 1; i >= 0; i--) {
        editBuilder.delete(logs[i].range);
      }
    });

    vscode.window.showInformationMessage(`Deleted ${logs.length} log statement(s)`);
    Logger.info(`Deleted ${logs.length} log statement(s)`);
  } catch (error) {
    Logger.error('Failed to delete logs', error instanceof Error ? error : undefined);
    vscode.window.showErrorMessage(`Failed to delete logs: ${error}`);
  }
}
