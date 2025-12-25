# 架构设计

## 概述

Turbo Print Log 是一个采用模块化架构的 VS Code 扩展，为 20+ 种编程语言提供智能日志语句插入功能。

## 核心模块

### 1. 配置层 (`src/config/`)

- **settings.ts**: 配置管理，与 VS Code 工作区设置集成
- **defaults.ts**: 默认配置值

核心配置项：

- `prefix`: 日志消息前缀（默认：🚀）
- `separator`: 日志元素分隔符（默认：~）
- `logFn`: 每种语言的自定义日志函数
- `quote`: 字符串引号样式
- `includeFileNameAndLineNum`: 是否包含上下文信息

### 2. 核心逻辑 (`src/core/`)

#### 语言支持 (`languages/`)

定义 20+ 种语言配置，包含：

- `defaultLogFn`: 默认日志函数
- `commentSyntax`: 单行/多行注释语法
- `defaultStringQuote`: 引号偏好
- `needsSemicolon`: 语句结束符

#### 日志构建器 (`log-builder.ts`)

构建特定语言的日志语句，包含：

- 上下文信息（文件名、行号）
- 变量追踪
- 自定义格式化

#### 日志解析器 (`log-parser.ts`)

使用模式匹配进行智能日志识别：

- 通过匹配 **函数 + 前缀 + 分隔符** 识别生成的日志
- 支持选择性操作（注释、更新、删除）

### 3. 编辑器集成 (`src/editor/`)

- **selection.ts**: 多光标变量提取
- **insertion.ts**: 智能日志插入与缩进处理
- **document.ts**: 文档分析和日志管理

### 4. 命令 (`src/commands/`)

五个核心命令：

1. `insertLog`: 在光标/选中位置插入日志
2. `updateLineNumbers`: 更新所有日志中的行号
3. `commentLogs`: 注释所有生成的日志
4. `uncommentLogs`: 取消注释所有日志
5. `deleteLogs`: 删除所有生成的日志

### 5. 工具函数 (`src/utils/`)

- **text.ts**: 文本处理辅助函数
- **validation.ts**: 输入验证
- **logger.ts**: 扩展日志记录

## 数据流

```
用户操作 → 命令
    ↓
加载配置
    ↓
变量检测（编辑器层）
    ↓
日志构建（核心层）
    ↓
文档插入（编辑器层）
```

## 核心设计原则

1. **关注点分离**: 清晰的模块边界
2. **语言无关核心**: 可扩展的语言支持
3. **基于模式的识别**: 可靠的日志识别
4. **类型安全**: 完整的 TypeScript 严格模式
5. **性能优化**: 高效的多光标批量操作
