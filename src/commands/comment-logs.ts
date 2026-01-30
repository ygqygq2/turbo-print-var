import * as vscode from 'vscode';

import { ConfigManager } from '../config/settings';
import { LogParser } from '../core/log-parser';
import { DocumentAnalyzer } from '../editor/document';
import { LanguageResolver } from '../utils/language-resolver';
import { Logger } from '../utils/logger';

/**
 * 注释所有日志命令
 */
export async function commentAllLogsCommand(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active editor');
    return;
  }

  try {
    const config = ConfigManager.getConfig();
    const languageConfig = LanguageResolver.getDocumentLanguageConfig(editor.document);

    if (!languageConfig) {
      const languageId = LanguageResolver.resolveLanguageId(editor.document);
      vscode.window.showWarningMessage(`Language ${languageId} is not supported`);
      return;
    }

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

        // 只注释未被注释的行
        if (!parser.isCommented(lineText)) {
          const commentedLine = parser.commentLine(lineText, languageConfig.commentSyntax.line);
          editBuilder.replace(log.range, commentedLine + '\n');
        }
      }
    });

    vscode.window.showInformationMessage(`Commented ${logs.length} log statement(s)`);
    Logger.info(`Commented ${logs.length} log statement(s)`);
  } catch (error) {
    Logger.error('Failed to comment logs', error instanceof Error ? error : undefined);
    vscode.window.showErrorMessage(`Failed to comment logs: ${error}`);
  }
}
