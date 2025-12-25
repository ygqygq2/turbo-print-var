import * as vscode from 'vscode';

import { getIndentation } from '../utils/text';

/**
 * 日志插入器 - 智能插入日志到文档
 */
export class LogInserter {
  /**
   * 在指定行的下一行插入日志
   */
  async insertLog(
    editor: vscode.TextEditor,
    logText: string,
    lineNumber: number,
    insertEmptyLineBefore: boolean,
    insertEmptyLineAfter: boolean,
  ): Promise<void> {
    const document = editor.document;

    // 获取变量所在行的缩进
    const variableLine = document.lineAt(lineNumber);
    const indent = getIndentation(variableLine.text);

    // 构建要插入的内容
    const indentedLog = `${indent}${logText}`;
    const insertLine = lineNumber + 1;

    // 构建插入内容（包括空行）
    let contentToInsert = '';
    if (insertEmptyLineBefore) {
      contentToInsert += '\n';
    }
    contentToInsert += `${indentedLog}\n`;
    if (insertEmptyLineAfter) {
      contentToInsert += '\n';
    }

    // 插入位置
    const insertPosition =
      insertLine >= document.lineCount
        ? new vscode.Position(document.lineCount, 0)
        : new vscode.Position(insertLine, 0);

    // 如果是在文档末尾插入，需要先添加一个换行
    if (insertLine === document.lineCount) {
      contentToInsert = '\n' + contentToInsert;
    }

    // 执行插入
    await editor.edit((editBuilder) => {
      editBuilder.insert(insertPosition, contentToInsert);
    });
  }

  /**
   * 批量插入多个日志
   */
  async insertLogs(
    editor: vscode.TextEditor,
    logs: Array<{ text: string; line: number }>,
    insertEmptyLineBefore: boolean,
    insertEmptyLineAfter: boolean,
  ): Promise<void> {
    // 按行号倒序排序，从后往前插入，避免行号变化
    const sortedLogs = logs.sort((a, b) => b.line - a.line);

    for (const log of sortedLogs) {
      await this.insertLog(editor, log.text, log.line, insertEmptyLineBefore, insertEmptyLineAfter);
    }
  }
}
