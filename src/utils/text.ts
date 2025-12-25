/**
 * 文本处理工具函数
 */

/**
 * 获取字符串的缩进
 */
export function getIndentation(line: string): string {
  const match = line.match(/^(\s*)/);
  return match ? match[1] : '';
}

/**
 * 清理变量名
 */
export function cleanVariableName(variable: string): string {
  return variable.trim().replace(/[;,\s]+$/, '');
}

export function isValidVariableName(name: string): boolean {
  if (!name || name.trim().length === 0) {
    return false;
  }
  return /[a-zA-Z0-9_$]/.test(name);
}

/**
 * 转义字符串中的特殊字符
 */
export function escapeString(str: string, quote: '"' | "'" | '`'): string {
  if (quote === '`') {
    return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }
  if (quote === '"') {
    return str.replace(/"/g, '\\"');
  }
  return str.replace(/'/g, "\\'");
}

export function processVariableName(variableName: string): string {
  const count = (variableName.match(/\$/g) || []).length;
  let escapedVariableName = variableName;
  if (count >= 2 && count % 2 === 0) {
    const halfCount = count / 2;
    let escapedCount = 0;
    escapedVariableName = variableName.replace(/\$/g, (match) => {
      if (escapedCount < halfCount) {
        escapedCount++;
        return '\\$';
      }
      return match;
    });
  }
  return escapedVariableName;
}

/**
 * 用指定引号包裹字符串
 */
export function quoteString(str: string, quote: '"' | "'" | '`'): string {
  return `${quote}${str}${quote}`;
}
