/**
 * 验证工具
 */

import * as vscode from 'vscode';

/**
 * 验证 TextEditor 是否有效
 */
export function isValidEditor(editor: vscode.TextEditor | undefined): boolean {
  return !!editor && !!editor.document;
}

/**
 * 验证选择是否为空
 */
export function isEmptySelection(selection: vscode.Selection | undefined): boolean {
  return !selection || selection.isEmpty;
}

/**
 * 验证行号是否有效
 */
export function isValidLineNumber(lineNumber: number, totalLines: number): boolean {
  return lineNumber >= 0 && lineNumber < totalLines;
}

/**
 * 验证字符串是否有效
 */
export function isValidString(value: unknown): boolean {
  return typeof value === 'string';
}

/**
 * 验证引号样式是否有效
 */
export function isValidQuote(value: unknown): value is '"' | "'" | '`' {
  return value === '"' || value === "'" || value === '`';
}
