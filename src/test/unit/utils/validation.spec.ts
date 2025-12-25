import { describe, expect, it } from 'vitest';

import { isValidQuote, isValidString } from '../../../utils/validation';

describe('Validation Utils', () => {
  describe('isValidString', () => {
    it('应该验证有效字符串', () => {
      expect(isValidString('hello')).toBe(true);
      expect(isValidString('123')).toBe(true);
      expect(isValidString('')).toBe(true);
    });

    it('应该拒绝非字符串值', () => {
      expect(isValidString(123)).toBe(false);
      expect(isValidString(null)).toBe(false);
      expect(isValidString(undefined)).toBe(false);
      expect(isValidString({})).toBe(false);
      expect(isValidString([])).toBe(false);
    });
  });

  describe('isValidQuote', () => {
    it('应该验证有效的引号', () => {
      expect(isValidQuote('"')).toBe(true);
      expect(isValidQuote("'")).toBe(true);
      expect(isValidQuote('`')).toBe(true);
    });

    it('应该拒绝无效的引号', () => {
      expect(isValidQuote('x')).toBe(false);
      expect(isValidQuote('')).toBe(false);
      expect(isValidQuote('""')).toBe(false);
      expect(isValidQuote(null)).toBe(false);
      expect(isValidQuote(123)).toBe(false);
    });
  });
});
