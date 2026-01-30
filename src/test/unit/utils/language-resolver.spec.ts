import { describe, expect, it, vi, beforeEach } from 'vitest';
import * as vscode from 'vscode';

import { LanguageResolver } from '../../../utils/language-resolver';
import { ConfigManager } from '../../../config/settings';

// Mock ConfigManager
vi.mock('../../../config/settings', () => ({
  ConfigManager: {
    getConfig: vi.fn(),
  },
}));

describe('LanguageResolver', () => {
  beforeEach(() => {
    // 重置 mock
    vi.clearAllMocks();
  });

  describe('resolveLanguageId', () => {
    it('优先级1: 应该使用用户自定义配置', () => {
      // Mock 用户配置了 .custom 映射到 javascript
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: { '.custom': 'javascript' },
      } as any);

      const mockDoc = {
        fileName: '/path/to/file.custom',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      expect(result).toBe('javascript');
    });

    it('优先级2: 应该使用 VS Code 识别的语言ID', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/file.js',
        languageId: 'javascript',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      expect(result).toBe('javascript');
    });

    it('优先级2: 应该跳过 plaintext，因为它表示未识别', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/file.vue',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      // 应该跳过 plaintext，使用优先级3的预设映射
      expect(result).toBe('vue');
    });

    it('优先级3: 应该使用扩展预设映射 - Vue', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/component.vue',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      expect(result).toBe('vue');
    });

    it('优先级3: 应该使用扩展预设映射 - Svelte', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/component.svelte',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      expect(result).toBe('svelte');
    });

    it('优先级3: 应该使用扩展预设映射 - Astro', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/page.astro',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      expect(result).toBe('astro');
    });

    it('优先级3: 应该使用扩展预设映射 - MDX', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/article.mdx',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      expect(result).toBe('mdx');
    });

    it('用户配置应该覆盖预设映射', () => {
      // 用户配置 .vue 映射到 javascript（虽然不常见，但应该支持）
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: { '.vue': 'javascript' },
      } as any);

      const mockDoc = {
        fileName: '/path/to/component.vue',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      expect(result).toBe('javascript');
    });

    it('没有匹配时应该返回编辑器的 languageId', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/file.unknown',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.resolveLanguageId(mockDoc);
      expect(result).toBe('plaintext');
    });
  });

  describe('isDocumentSupported', () => {
    it('应该确认支持的文档', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/file.js',
        languageId: 'javascript',
      } as vscode.TextDocument;

      const result = LanguageResolver.isDocumentSupported(mockDoc);
      expect(result).toBe(true);
    });

    it('应该确认 Vue 文档被支持', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/component.vue',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.isDocumentSupported(mockDoc);
      expect(result).toBe(true);
    });

    it('应该拒绝不支持的文档', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/file.unknown',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const result = LanguageResolver.isDocumentSupported(mockDoc);
      expect(result).toBe(false);
    });
  });

  describe('getDocumentLanguageConfig', () => {
    it('应该返回文档的语言配置', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/file.js',
        languageId: 'javascript',
      } as vscode.TextDocument;

      const config = LanguageResolver.getDocumentLanguageConfig(mockDoc);
      expect(config).toBeDefined();
      expect(config?.defaultLogFn).toBe('console.log');
    });

    it('应该返回 Vue 文档的语言配置', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/component.vue',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const config = LanguageResolver.getDocumentLanguageConfig(mockDoc);
      expect(config).toBeDefined();
      expect(config?.defaultLogFn).toBe('console.log');
      expect(config?.id).toBe('vue');
    });

    it('不支持的文档应该返回 undefined', () => {
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      const mockDoc = {
        fileName: '/path/to/file.unknown',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      const config = LanguageResolver.getDocumentLanguageConfig(mockDoc);
      expect(config).toBeUndefined();
    });
  });

  describe('三级优先级综合测试', () => {
    it('完整流程: 用户配置 > VS Code 识别 > 预设映射', () => {
      // 测试场景1: 用户配置了 .custom
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: { '.custom': 'python' },
      } as any);

      let mockDoc = {
        fileName: '/path/to/file.custom',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      expect(LanguageResolver.resolveLanguageId(mockDoc)).toBe('python');

      // 测试场景2: VS Code 正确识别了 TypeScript
      vi.mocked(ConfigManager.getConfig).mockReturnValue({
        fileExtensionMapping: {},
      } as any);

      mockDoc = {
        fileName: '/path/to/file.ts',
        languageId: 'typescript',
      } as vscode.TextDocument;

      expect(LanguageResolver.resolveLanguageId(mockDoc)).toBe('typescript');

      // 测试场景3: VS Code 未识别，使用预设映射
      mockDoc = {
        fileName: '/path/to/component.svelte',
        languageId: 'plaintext',
      } as vscode.TextDocument;

      expect(LanguageResolver.resolveLanguageId(mockDoc)).toBe('svelte');
    });
  });
});
