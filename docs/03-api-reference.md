# API 参考

## 类型定义

### ExtensionConfig

```typescript
interface ExtensionConfig {
  prefix: string; // 日志消息前缀
  logMessageSuffix: string; // 变量名后的后缀
  separator: string; // 元素分隔符
  includeFileNameAndLineNum: boolean;
  insertEmptyLineBeforeLogMessage: boolean;
  insertEmptyLineAfterLogMessage: boolean;
  quote: QuoteStyle;
  addSemicolonInTheEnd: boolean;
  logFn: Record<string, string>;
}
```

### LanguageConfig

```typescript
interface LanguageConfig {
  defaultLogFn: string;
  commentSyntax: {
    single?: string;
    multi?: { start: string; end: string };
  };
  defaultStringQuote: QuoteStyle;
  needsSemicolon: boolean;
}
```

### VariableInfo

```typescript
interface VariableInfo {
  name: string; // 变量标识符
  line: number; // 行号（从0开始）
  isMultiLine: boolean; // 是否跨多行
}
```

## 核心类

### LogMessageBuilder

根据语言和配置构建日志语句。

```typescript
class LogMessageBuilder {
  constructor(config: ExtensionConfig, languageConfig: LanguageConfig);

  build(variableName: string, lineNumber: number, fileName: string): string;
}
```

**示例：**

```typescript
const builder = new LogMessageBuilder(config, jsConfig);
const log = builder.build('user', 42, 'app.js');
// 返回: console.log("🚀 ~ file: app.js:42 ~ user:", user)
```

### LogParser

识别生成的日志语句。

```typescript
class LogParser {
  static isGeneratedLog(line: string, logFn: string, prefix: string, separator: string): boolean;

  static extractLineNumber(logText: string): number | null;
}
```

**示例：**

```typescript
const isLog = LogParser.isGeneratedLog('console.log("🚀 ~ file: app.js:10 ~ user:", user)', 'console.log', '🚀', '~');
// 返回: true
```

### VariableSelector

从编辑器选择中提取变量信息。

```typescript
class VariableSelector {
  static getVariables(editor: vscode.TextEditor, selections: readonly vscode.Selection[]): VariableInfo[];
}
```

### LogInserter

向文档中插入日志语句。

```typescript
class LogInserter {
  static async insertLogs(editor: vscode.TextEditor, logs: Array<{ line: number; content: string }>): Promise<void>;
}
```

### DocumentAnalyzer

分析和管理文档中的日志。

```typescript
class DocumentAnalyzer {
  static findAllGeneratedLogs(
    document: vscode.TextDocument,
    config: ExtensionConfig,
    languageConfig: LanguageConfig
  ): number[]  // 行号数组

  static async updateAllLogLineNumbers(
    editor: vscode.TextEditor,
    config: ExtensionConfig,
    languageConfig: LanguageConfig
  ): Promise<number>  // 更新数量

  static async commentAllLogs(
    editor: vscode.TextEditor,
    config: ExtensionConfig,
    languageConfig: LanguageConfig
  ): Promise<number>

  static async uncommentAllLogs(...): Promise<number>

  static async deleteAllLogs(...): Promise<number>
}
```

## 工具函数

### 文本工具

```typescript
// 获取行的缩进
function getIndentation(line: string): string;

// 引用字符串
function quoteString(text: string, quote: QuoteStyle): string;

// 转义特殊字符
function escapeString(text: string): string;
```

### 验证

```typescript
// 检查字符串是否有效
function isValidString(value: unknown): boolean;

// 验证引号样式
function isValidQuote(value: unknown): value is QuoteStyle;
```

## 配置访问

```typescript
import { SettingsManager } from './config/settings';

const config = SettingsManager.getConfig();
console.log(config.prefix); // "🚀"
```

## 语言注册

```typescript
import { LANGUAGE_CONFIGS } from './core/languages';

const jsConfig = LANGUAGE_CONFIGS.get('javascript');
console.log(jsConfig?.defaultLogFn); // "console.log"
```

## 命令 ID

所有命令都以 `turbo-print-var.` 为前缀：

- `turbo-print-var.insertLog`
- `turbo-print-var.updateLineNumbers`
- `turbo-print-var.commentLogs`
- `turbo-print-var.uncommentLogs`
- `turbo-print-var.deleteLogs`

## 事件

扩展在以下情况激活：

- 任何已注册命令的 `onCommand` 事件
- 任何文本编辑器激活（延迟加载）
