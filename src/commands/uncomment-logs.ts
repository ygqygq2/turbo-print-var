import * as vscode from 'vscode';

import { ConfigManager } from '../config/settings';
import { LogParser } from '../core/log-parser';
import { DocumentAnalyzer } from '../editor/document';
import { Logger } from '../utils/logger';

/**
 * 取消注释所有日志命令
 */
export async function uncommentAllLogsCommand(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active editor');
    return;
  }

  try {
    const config = ConfigManager.getConfig();
    const analyzer = new DocumentAnalyzer();
    const parser = new LogParser();
    const logs = analyzer.findAllGeneratedLogs(editor.document, config);

    if (logs.length === 0) {
      vscode.window.showInformationMessage('No log statements found');
      return;
    }

    await editor.edit((editBuilder) => {
      for (const log of logs) {
        const lineText = editor.document.lineAt(log.line).text;

        // 只取消注释被注释的行
        if (parser.isCommented(lineText)) {
          const uncommentedLine = parser.uncommentLine(lineText);
          editBuilder.replace(log.range, uncommentedLine + '\n');
        }
      }
    });

    vscode.window.showInformationMessage(`Uncommented ${logs.length} log statement(s)`);
    Logger.info(`Uncommented ${logs.length} log statement(s)`);
  } catch (error) {
    Logger.error('Failed to uncomment logs', error instanceof Error ? error : undefined);
    vscode.window.showErrorMessage(`Failed to uncomment logs: ${error}`);
  }
}
