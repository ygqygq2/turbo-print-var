import { describe, expect, it } from 'vitest';

import { escapeString, getIndentation, quoteString } from '../../../utils/text';

describe('Text Utils', () => {
  describe('escapeString', () => {
    it('应该转义双引号', () => {
      const result = escapeString('Hello "World"', '"');
      expect(result).toBe('Hello \\"World\\"');
    });

    it('应该转义单引号', () => {
      const result = escapeString("It's a test", "'");
      expect(result).toBe("It\\'s a test");
    });

    it('应该处理反斜杠（双引号不转义反斜杠）', () => {
      const result = escapeString('C:\\path\\file', '"');
      // 注意：现有实现只转义引号，不转义反斜杠
      expect(result).toBe('C:\\path\\file');
    });

    it('应该处理空字符串', () => {
      const result = escapeString('', '"');
      expect(result).toBe('');
    });
  });

  describe('getIndentation', () => {
    it('应该获取空格缩进', () => {
      const result = getIndentation('    const x = 1;');
      expect(result).toBe('    ');
    });

    it('应该获取制表符缩进', () => {
      const result = getIndentation('\t\tconst x = 1;');
      expect(result).toBe('\t\t');
    });

    it('应该处理无缩进的行', () => {
      const result = getIndentation('const x = 1;');
      expect(result).toBe('');
    });

    it('应该处理混合缩进', () => {
      const result = getIndentation('  \t  const x = 1;');
      expect(result).toBe('  \t  ');
    });

    it('应该处理空行', () => {
      const result = getIndentation('');
      expect(result).toBe('');
    });
  });

  describe('quoteString', () => {
    it('应该用双引号包裹', () => {
      const result = quoteString('hello', '"');
      expect(result).toBe('"hello"');
    });

    it('应该用单引号包裹', () => {
      const result = quoteString('hello', "'");
      expect(result).toBe("'hello'");
    });

    it('应该用反引号包裹', () => {
      const result = quoteString('hello', '`');
      expect(result).toBe('`hello`');
    });

    it('应该处理空字符串', () => {
      const result = quoteString('', '"');
      expect(result).toBe('""');
    });
  });
});
