import * as vscode from 'vscode';

import {
  commentAllLogsCommand,
  deleteAllLogsCommand,
  insertLogCommand,
  uncommentAllLogsCommand,
  updateLineNumCommand,
} from './commands';
import { COMMANDS } from './constants';
import { Logger } from './utils/logger';

/**
 * 扩展激活
 */
export function activate(context: vscode.ExtensionContext): void {
  // 初始化日志器
  Logger.init();

  Logger.info('Turbo Print Log extension is now active!');

  // 注册所有命令
  const commands = [
    vscode.commands.registerCommand(COMMANDS.INSERT_LOG, insertLogCommand),
    vscode.commands.registerCommand(COMMANDS.UPDATE_LINE_NUMBERS, updateLineNumCommand),
    vscode.commands.registerCommand(COMMANDS.COMMENT_LOGS, commentAllLogsCommand),
    vscode.commands.registerCommand(COMMANDS.UNCOMMENT_LOGS, uncommentAllLogsCommand),
    vscode.commands.registerCommand(COMMANDS.DELETE_LOGS, deleteAllLogsCommand),
  ];

  // 将所有命令添加到订阅中
  commands.forEach((command) => context.subscriptions.push(command));

  Logger.info('All commands registered successfully');
}

/**
 * 扩展停用
 */
export function deactivate(): void {
  Logger.info('Turbo Print Log extension is now deactivated');
}
