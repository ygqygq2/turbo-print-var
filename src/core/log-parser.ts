/**
 * 日志解析器 - 识别由本扩展生成的日志
 * 使用稳定的三标志识别逻辑：logFn + prefix + separator
 */
export class LogParser {
  /**
   * 检查一行是否是由本扩展生成的日志
   * 通过三个稳定标志精确识别：
   * 1. logFn（如 console.log, print 等）
   * 2. prefix（用户配置的前缀，默认🚀）
   * 3. separator（用户配置的分隔符，默认~）
   */
  isGeneratedLog(line: string, logFn: string, prefix: string, separator: string): boolean {
    // 移除行首空白
    const trimmedLine = line.trim();

    // 移除可能的注释符号
    const uncommentedLine = this.removeComments(trimmedLine);

    // 创建精确的正则表达式来匹配日志函数
    const logFunctionRegExp = this.createRegex(logFn);

    // 三个标志都必须存在才认为是生成的日志
    const hasLogFunction = logFunctionRegExp.test(uncommentedLine);
    const hasPrefix = uncommentedLine.includes(prefix);
    const hasSeparator = uncommentedLine.includes(separator);

    return hasLogFunction && hasPrefix && hasSeparator;
  }

  /**
   * 创建安全的正则表达式（转义特殊字符）
   */
  private createRegex(input: string): RegExp {
    // 转义正则表达式特殊字符
    const escaped = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped);
  }

  /**
   * 移除注释符号
   */
  private removeComments(line: string): string {
    // 移除常见的单行注释符号
    const commentPatterns = ['//', '#', '--'];

    for (const pattern of commentPatterns) {
      const index = line.indexOf(pattern);
      if (index === 0) {
        return line.substring(pattern.length).trim();
      }
    }

    return line;
  }

  /**
   * 解析日志行，提取行号信息
   */
  parseLogLine(line: string): { lineNumber?: number } {
    // 提取行号: file: xxx.xx:数字
    const match = line.match(/file:\s*[^:]+:(\d+)/);

    if (match && match[1]) {
      return {
        lineNumber: parseInt(match[1], 10),
      };
    }

    return {};
  }

  /**
   * 从日志文本中提取行号
   */
  extractLineNumber(logText: string): number | null {
    // 匹配 file: xxx.js:123 格式
    const match = logText.match(/file:\s*[^:]+:(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return null;
  }

  /**
   * 更新日志行中的行号
   */
  updateLineNumber(line: string, newLineNumber: number): string {
    // 替换行号: file: xxx.xx:旧行号 => file: xxx.xx:新行号
    return line.replace(/(file:\s*[^:]+:)(\d+)/, `$1${newLineNumber}`);
  }

  /**
   * 检查行是否被注释
   */
  isCommented(line: string): boolean {
    const trimmedLine = line.trim();
    return trimmedLine.startsWith('//') || trimmedLine.startsWith('#') || trimmedLine.startsWith('--');
  }

  /**
   * 注释一行
   */
  commentLine(line: string, commentSymbol: string): string {
    // 获取缩进
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : '';

    // 获取内容（移除缩进）
    const content = line.substring(indent.length);

    // 如果已经被注释，直接返回
    if (this.isCommented(content)) {
      return line;
    }

    // 添加注释符号
    return `${indent}${commentSymbol} ${content}`;
  }

  /**
   * 取消注释
   */
  uncommentLine(line: string): string {
    // 获取缩进
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : '';

    // 获取内容（移除缩进）
    let content = line.substring(indent.length);

    // 移除注释符号
    const commentPatterns = ['//', '#', '--'];
    for (const pattern of commentPatterns) {
      if (content.startsWith(pattern)) {
        content = content.substring(pattern.length).trim();
        break;
      }
    }

    return `${indent}${content}`;
  }
}
