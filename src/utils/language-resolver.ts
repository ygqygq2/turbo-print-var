import * as path from 'path';
import * as vscode from 'vscode';

import { DEFAULT_FILE_EXTENSION_MAPPING } from '../config/defaults';
import { ConfigManager } from '../config/settings';
import { getLanguageConfig } from '../core/languages';

/**
 * 语言解析器 - 实现三级优先级的语言识别机制
 *
 * 优先级顺序：
 * 1. 用户自定义配置 (fileExtensionMapping) - 最高优先级
 * 2. VS Code 编辑器识别的 languageId - 中等优先级
 * 3. 扩展预设映射 (DEFAULT_FILE_EXTENSION_MAPPING) - 最低优先级
 */
export class LanguageResolver {
  /**
   * 解析文档的语言ID
   * @param document VS Code 文档对象
   * @returns 解析后的语言ID
   */
  static resolveLanguageId(document: vscode.TextDocument): string {
    const config = ConfigManager.getConfig();
    const fileExtension = path.extname(document.fileName);

    // 优先级1: 用户自定义配置
    if (config.fileExtensionMapping[fileExtension]) {
      return config.fileExtensionMapping[fileExtension];
    }

    // 优先级2: VS Code 编辑器识别的 languageId
    // 如果编辑器已经正确识别了语言，并且我们支持这个语言，就直接使用
    if (document.languageId && getLanguageConfig(document.languageId)) {
      return document.languageId;
    }

    // 优先级3: 扩展预设映射
    if (DEFAULT_FILE_EXTENSION_MAPPING[fileExtension]) {
      return DEFAULT_FILE_EXTENSION_MAPPING[fileExtension];
    }

    // 如果都没有匹配，返回编辑器的 languageId（可能不被支持）
    return document.languageId;
  }

  /**
   * 检查文档语言是否被支持
   * @param document VS Code 文档对象
   * @returns 是否支持该语言
   */
  static isDocumentSupported(document: vscode.TextDocument): boolean {
    const languageId = this.resolveLanguageId(document);
    return !!getLanguageConfig(languageId);
  }

  /**
   * 获取文档的语言配置
   * @param document VS Code 文档对象
   * @returns 语言配置对象，如果不支持则返回 undefined
   */
  static getDocumentLanguageConfig(document: vscode.TextDocument) {
    const languageId = this.resolveLanguageId(document);
    return getLanguageConfig(languageId);
  }
}
