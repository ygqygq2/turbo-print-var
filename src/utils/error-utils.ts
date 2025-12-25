/**
 * 错误工具函数
 */

import * as vscode from 'vscode';

import { ErrorCode } from '../types/errors';

/**
 * 获取本地化的错误消息
 * @param code 错误码
 * @returns 本地化的错误消息
 */
export function getErrorMessage(code: ErrorCode): string {
  return vscode.l10n.t(code);
}
