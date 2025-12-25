import * as vscode from 'vscode';

import { ConfigManager } from '../config/settings';
import { getLanguageConfig } from '../core/languages';
import { LogMessageBuilder } from '../core/log-builder';
import { DocumentAnalyzer } from '../editor/document';
import { LogInserter } from '../editor/insertion';
import { VariableSelector } from '../editor/selection';
import { Logger } from '../utils/logger';

/**
 * 插入日志命令
 */
export async function insertLogCommand(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active editor');
    return;
  }

  try {
    // 获取配置
    const config = ConfigManager.getConfig();

    // 获取语言配置
    const languageConfig = getLanguageConfig(editor.document.languageId);
    if (!languageConfig) {
      vscode.window.showWarningMessage(`Language ${editor.document.languageId} is not supported`);
      return;
    }

    // 获取变量
    const selector = new VariableSelector();
    const variables = selector.getVariables(editor);

    if (variables.length === 0) {
      vscode.window.showWarningMessage('No variable selected or found at cursor position');
      return;
    }

    // 构建日志
    const builder = new LogMessageBuilder();
    const analyzer = new DocumentAnalyzer();
    const inserter = new LogInserter();

    const logs = variables.map((variable) => {
      // 日志将插入在变量行的下一行，所以行号应该是 variable.line + 1
      const insertLineNumber = variable.line + 1;
      const context = analyzer.getContext(editor.document, insertLineNumber);
      const logText = builder.build({
        variable: variable.name,
        context,
        config,
        languageConfig,
      });

      return {
        text: logText,
        line: variable.line,
      };
    });

    // 插入日志
    await inserter.insertLogs(editor, logs, config.emptyLineBefore, config.emptyLineAfter);

    Logger.info(`Inserted ${logs.length} log statement(s)`);
  } catch (error) {
    Logger.error('Failed to insert log', error instanceof Error ? error : undefined);
    vscode.window.showErrorMessage(`Failed to insert log: ${error}`);
  }
}
