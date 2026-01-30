import path from 'path';
import * as vscode from 'vscode';

import { LogParser } from '../core/log-parser';
import { CodeContext, UserConfig } from '../types';
import { LanguageResolver } from '../utils/language-resolver';

/**
 * 文档分析器 - 分析文档，查找日志等
 */
export class DocumentAnalyzer {
  private logParser: LogParser;

  constructor() {
    this.logParser = new LogParser();
  }

  /**
   * 获取代码上下文（文件名、行号等）
   */
  getContext(document: vscode.TextDocument, lineNumber: number): CodeContext {
    const fileName = path.basename(document.fileName);

    return {
      fileName,
      lineNumber: lineNumber + 1, // VS Code 行号从0开始，显示时+1
    };
  }

  /**
   * 查找文档中所有由本扩展生成的日志
   */
  findAllGeneratedLogs(
    document: vscode.TextDocument,
    config: UserConfig,
  ): Array<{ line: number; range: vscode.Range }> {
    const logs: Array<{ line: number; range: vscode.Range }> = [];
    const languageConfig = LanguageResolver.getDocumentLanguageConfig(document);

    if (!languageConfig) {
      return logs;
    }

    // 获取日志函数
    const languageId = LanguageResolver.resolveLanguageId(document);
    const logFunction = config.logFunction[languageId] || languageConfig.defaultLogFn;

    // 遍历文档所有行
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const lineText = line.text;

      // 使用三标志识别
      if (this.logParser.isGeneratedLog(lineText, logFunction, config.prefix, config.separator)) {
        logs.push({
          line: i,
          range: line.rangeIncludingLineBreak,
        });
      }
    }

    return logs;
  }

  /**
   * 更新所有日志的行号
   */
  async updateAllLogLineNumbers(editor: vscode.TextEditor, config: UserConfig): Promise<number> {
    const document = editor.document;
    const logs = this.findAllGeneratedLogs(document, config);

    if (logs.length === 0) {
      return 0;
    }

    await editor.edit((editBuilder) => {
      for (const log of logs) {
        const lineText = document.lineAt(log.line).text;
        const newLineNumber = log.line + 1; // 实际行号
        const updatedLine = this.logParser.updateLineNumber(lineText, newLineNumber);

        if (updatedLine !== lineText) {
          editBuilder.replace(log.range, updatedLine);
        }
      }
    });

    return logs.length;
  }
}
