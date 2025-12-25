import * as vscode from 'vscode';

import { VariableInfo } from '../types';
import { cleanVariableName, isValidVariableName } from '../utils/text';
import { isEmptySelection, isValidEditor } from '../utils/validation';

/**
 * 变量选择器 - 获取光标或选中的变量
 */
export class VariableSelector {
  /**
   * 获取所有光标位置的变量
   */
  getVariables(editor: vscode.TextEditor): VariableInfo[] {
    if (!isValidEditor(editor)) {
      return [];
    }

    const variables: VariableInfo[] = [];

    // 遍历所有选区（支持多光标）
    for (const selection of editor.selections) {
      const variable = this.getVariableFromSelection(editor, selection);
      if (variable) {
        variables.push(variable);
      }
    }

    return variables;
  }

  /**
   * 从单个选区获取变量（借鉴原实现的精华逻辑）
   */
  private getVariableFromSelection(editor: vscode.TextEditor, selection: vscode.Selection): VariableInfo | null {
    const document = editor.document;

    const selectedVar =
      (selection && !isEmptySelection(selection) && document.getText(selection)) ||
      (() => {
        let rangeUnderCursor = document.getWordRangeAtPosition(selection.active, /\$\w+|\w+/);
        if (!rangeUnderCursor) {
          let position = selection.active;
          const lineText = document.lineAt(position.line).text;
          while (position.character < lineText.length) {
            position = position.translate(0, 1);
            rangeUnderCursor = document.getWordRangeAtPosition(position, /\$\w+|\w+/);
            if (rangeUnderCursor) {
              break;
            }
          }
        }
        return (rangeUnderCursor && document.getText(rangeUnderCursor)) || '';
      })();

    const cleanedVariable = cleanVariableName(selectedVar);
    if (!cleanedVariable || cleanedVariable.trim().length === 0) {
      return null;
    }

    if (!isValidVariableName(cleanedVariable)) {
      return null;
    }

    return {
      name: cleanedVariable,
      line: selection.start.line,
      character: selection.start.character,
    };
  }
}
