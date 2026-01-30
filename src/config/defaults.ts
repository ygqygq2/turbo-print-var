import { UserConfig } from '../types';

/**
 * 默认配置
 */
export const DEFAULT_CONFIG: UserConfig = {
  prefix: '🚀',
  suffix: ':',
  addSemicolon: undefined, // 未设置时使用语言默认值
  emptyLineBefore: false,
  emptyLineAfter: false,
  quote: '"',
  separator: '~',
  includeFileInfo: true,
  logFunction: {},
  fileExtensionMapping: {},
  enableCodeLens: false,
  enableTreeView: false,
};

/**
 * 预设的文件扩展名到语言ID映射
 * 优先级最低，仅当VS Code无法识别且用户未配置时使用
 */
export const DEFAULT_FILE_EXTENSION_MAPPING: Record<string, string> = {
  '.vue': 'vue',
  '.svelte': 'svelte',
  '.astro': 'astro',
  '.mdx': 'mdx',
};
