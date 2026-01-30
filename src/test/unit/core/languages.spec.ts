import { describe, expect, it } from 'vitest';

import { getLanguageConfig, getSupportedLanguages, isLanguageSupported } from '../../../core/languages';

describe('Languages', () => {
  describe('getLanguageConfig', () => {
    it('应该返回JavaScript配置', () => {
      const config = getLanguageConfig('javascript');
      expect(config).toBeDefined();
      expect(config?.defaultLogFn).toBe('console.log');
      expect(config?.needsSemicolon).toBe(true);
    });

    it('应该返回Python配置', () => {
      const config = getLanguageConfig('python');
      expect(config).toBeDefined();
      expect(config?.defaultLogFn).toBe('print');
      expect(config?.needsSemicolon).toBe(false);
    });

    it('应该返回TypeScript配置', () => {
      const config = getLanguageConfig('typescript');
      expect(config).toBeDefined();
      expect(config?.defaultLogFn).toBe('console.log');
    });

    it('不支持的语言应该返回undefined', () => {
      const config = getLanguageConfig('unknown-language');
      expect(config).toBeUndefined();
    });
  });

  describe('isLanguageSupported', () => {
    it('应该确认支持的语言', () => {
      expect(isLanguageSupported('javascript')).toBe(true);
      expect(isLanguageSupported('python')).toBe(true);
      expect(isLanguageSupported('java')).toBe(true);
      expect(isLanguageSupported('go')).toBe(true);
    });

    it('应该支持框架语言', () => {
      expect(isLanguageSupported('vue')).toBe(true);
      expect(isLanguageSupported('svelte')).toBe(true);
      expect(isLanguageSupported('astro')).toBe(true);
      expect(isLanguageSupported('mdx')).toBe(true);
    });

    it('应该拒绝不支持的语言', () => {
      expect(isLanguageSupported('unknown')).toBe(false);
      expect(isLanguageSupported('')).toBe(false);
    });
  });

  describe('getSupportedLanguages', () => {
    it('应该返回所有支持的语言', () => {
      const languages = getSupportedLanguages();
      expect(languages.length).toBeGreaterThan(20);
      expect(languages).toContain('javascript');
      expect(languages).toContain('typescript');
      expect(languages).toContain('python');
      expect(languages).toContain('java');
      expect(languages).toContain('c');
      expect(languages).toContain('cpp');
      expect(languages).toContain('go');
      expect(languages).toContain('rust');
      expect(languages).toContain('vue');
      expect(languages).toContain('svelte');
      expect(languages).toContain('astro');
      expect(languages).toContain('mdx');
    });
  });

  describe('语言特定配置', () => {
    it('C语言应该使用printf', () => {
      const config = getLanguageConfig('c');
      expect(config?.defaultLogFn).toBe('printf');
      expect(config?.needsSemicolon).toBe(true);
    });

    it('Java应该使用System.out.println', () => {
      const config = getLanguageConfig('java');
      expect(config?.defaultLogFn).toBe('System.out.println');
      expect(config?.needsSemicolon).toBe(true);
    });

    it('Rust应该使用println!', () => {
      const config = getLanguageConfig('rust');
      expect(config?.defaultLogFn).toBe('println!');
    });

    it('PHP应该使用echo', () => {
      const config = getLanguageConfig('php');
      expect(config?.defaultLogFn).toBe('echo');
    });

    it('Ruby应该使用puts', () => {
      const config = getLanguageConfig('ruby');
      expect(config?.defaultLogFn).toBe('puts');
    });
  });
});
