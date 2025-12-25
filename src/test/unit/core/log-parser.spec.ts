import { describe, expect, it } from 'vitest';

import { LogParser } from '../../../core/log-parser';

describe('LogParser', () => {
  const parser = new LogParser();

  describe('isGeneratedLog', () => {
    it('应该识别生成的日志（三标志都匹配）', () => {
      const line = 'console.log("🚀 ~ file: app.js:10 ~ user:", user)';
      const result = parser.isGeneratedLog(line, 'console.log', '🚀', '~');
      expect(result).toBe(true);
    });

    it('应该识别带注释的日志', () => {
      const line = '// console.log("🚀 ~ file: app.js:10 ~ user:", user)';
      const result = parser.isGeneratedLog(line, 'console.log', '🚀', '~');
      expect(result).toBe(true);
    });

    it('应该拒绝缺少前缀的日志', () => {
      const line = 'console.log("file: app.js:10 ~ user:", user)';
      const result = parser.isGeneratedLog(line, 'console.log', '🚀', '~');
      expect(result).toBe(false);
    });

    it('应该拒绝缺少分隔符的日志', () => {
      const line = 'console.log("🚀 file: app.js:10 user:", user)';
      const result = parser.isGeneratedLog(line, 'console.log', '🚀', '~');
      expect(result).toBe(false);
    });

    it('应该拒绝缺少日志函数的行', () => {
      const line = 'const x = "🚀 ~ file: app.js:10 ~ user:"';
      const result = parser.isGeneratedLog(line, 'console.log', '🚀', '~');
      expect(result).toBe(false);
    });

    it('应该支持不同的日志函数', () => {
      const line = 'print("🚀 ~ file: test.py:5 ~ data:", data)';
      const result = parser.isGeneratedLog(line, 'print', '🚀', '~');
      expect(result).toBe(true);
    });

    it('应该支持自定义前缀和分隔符', () => {
      const line = 'console.log("🔍 | file: app.js:10 | user:", user)';
      const result = parser.isGeneratedLog(line, 'console.log', '🔍', '|');
      expect(result).toBe(true);
    });

    it('应该处理带缩进的行', () => {
      const line = '    console.log("🚀 ~ file: app.js:10 ~ user:", user)';
      const result = parser.isGeneratedLog(line, 'console.log', '🚀', '~');
      expect(result).toBe(true);
    });
  });

  describe('extractLineNumber', () => {
    it('应该从日志文本中提取行号', () => {
      const logText = '🚀 ~ file: app.js:42 ~ user:';
      const result = parser.extractLineNumber(logText);
      expect(result).toBe(42);
    });

    it('应该从不同格式中提取行号', () => {
      const logText = 'file: test.js:123';
      const result = parser.extractLineNumber(logText);
      expect(result).toBe(123);
    });

    it('无法提取时应该返回null', () => {
      const logText = 'no line number here';
      const result = parser.extractLineNumber(logText);
      expect(result).toBeNull();
    });
  });
});
