# Turbo Print Var (快速打印变量)

<p align="center">
  <img src="resources/images/logo.png" alt="Turbo Print Var" width="200">
</p>

> **⚠️ 重要说明**
>
> 本扩展原名为 `turbo-print-log`，因 **VS Code Marketplace 无理下架** 而更名重新上架。
>
> **关于下架原因的声明**：
>
> - 本扩展的初衷是帮助开发者更高效地调试代码，完全免费开源，且为 MIT 许可证
> - 原扩展多年仅支持 1-2 种语言，后来还增加了收费功能，而本扩展支持 20+ 种语言且完全免费
> - **本扩展与原扩展没有任何关系**，是完全独立的开源项目
> - 原扩展被无理要求不得使用 "turbo" 词汇，理由荒谬至极
> - "Turbo" 是通用技术术语（涡轮增压、加速之意），在编程领域广泛使用（如 Turbo Pascal、TurboRepo、Vite Turbo 等）
> - 本扩展名称完全合理，不存在任何商标侵权或误导性
> - 我们强烈反对这种滥用审核权力、打压开源项目的行为
>
> 本项目完全开源，代码透明，欢迎审查和贡献：https://github.com/ygqygq2/turbo-print-var

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/ygqygq2.turbo-print-var.svg?color=07c160&label=turbo-print-var&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=ygqygq2.turbo-print-var)
[![VS Code 安装量](https://img.shields.io/visual-studio-marketplace/i/ygqygq2.turbo-print-var?label=VS%20Code%20安装量)](https://marketplace.visualstudio.com/items?itemName=ygqygq2.turbo-print-var)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/ygqygq2/turbo-print-var?label=open-vsx%20downloads)](https://open-vsx.org/extension/ygqygq2/turbo-print-var)
[![GitHub Release](https://img.shields.io/github/v/release/ygqygq2/turbo-print-var?label=GitHub%20Release)](https://github.com/ygqygq2/turbo-print-var/releases)

[English](./README.md) | [中文](./README.zh.md)

---

### 🚀 主要功能

**Turbo Print Var** 是一个强大的 VS Code 扩展，可以为 **20+ 种编程语言**自动插入调试日志。它能智能生成包含文件名、行号和变量信息的上下文日志语句。

### ✨ 核心亮点

- 🌍 **多语言支持**：JavaScript/TypeScript、Python、Java、C/C++、Go、Rust、PHP、Ruby、Swift、Kotlin、Scala 等 20+ 种语言
- 🎯 **智能变量检测**：自动检测光标位置或选中的变量
- 📍 **上下文感知**：日志输出包含文件名和行号
- ⚡ **多光标支持**：同时处理多个变量
- 🎨 **可自定义格式**：配置日志前缀、分隔符、引号等
- 🔧 **强大命令**：插入、更新、注释、取消注释、删除日志
- 💡 **CodeLens 支持**：日志语句上方显示快捷操作按钮（可选）
- 📊 **统计面板**：侧边栏显示日志统计信息（可选）

### 📖 使用方法

#### 1. 插入日志语句

1. 选中变量或将光标放在变量上
2. 按 `Ctrl+Alt+L` (Windows/Linux) 或 `Cmd+Alt+L` (Mac)
3. 日志语句将被插入到下一行

**输出示例：**

```javascript
const user = { name: 'John' };
console.log('🚀 ~ file: app.js:2 ~ user:', user);
```

#### 2. 更新行号

- 按 `Ctrl+Alt+U` (Windows/Linux) 或 `Cmd+Alt+U` (Mac)
- 更新所有日志语句中的行号

#### 3. 注释/取消注释日志

- **注释**：`Alt+Shift+C`
- **取消注释**：`Alt+Shift+U`

#### 4. 删除所有日志

- 按 `Alt+Shift+D` 删除所有生成的日志语句

### ⚙️ 配置选项

在 VS Code 设置中自定义扩展（`Ctrl+,` 或 `Cmd+,`）：

| 设置                              | 说明                                 | 默认值   |
| --------------------------------- | ------------------------------------ | -------- |
| `turbo-print-var.prefix`          | 日志消息的前缀符号                   | `🚀`     |
| `turbo-print-var.suffix`          | 变量名后的后缀                       | `:`      |
| `turbo-print-var.separator`       | 日志元素间的分隔符                   | `~`      |
| `turbo-print-var.quote`           | 引号样式：`"`、`'` 或 `` ` ``        | `"`      |
| `turbo-print-var.includeFileInfo` | 包含文件名和行号                     | `true`   |
| `turbo-print-var.addSemicolon`    | 末尾添加分号（未设置时使用语言默认） | 语言默认 |
| `turbo-print-var.emptyLineBefore` | 日志前插入空行                       | `false`  |
| `turbo-print-var.emptyLineAfter`  | 日志后插入空行                       | `false`  |
| `turbo-print-var.logFunction`     | 每种语言的自定义日志函数             | `{}`     |
| `turbo-print-var.enableCodeLens`  | 启用 CodeLens（日志上方操作按钮）    | `false`  |
| `turbo-print-var.enableTreeView`  | 启用侧边栏统计面板                   | `false`  |

**自定义日志函数示例：**

```json
{
  "turbo-print-var.logFunction": {
    "php": "var_dump",
    "python": "print"
  }
}
```

### 🌐 支持的语言

- C
- C++
- C#
- CoffeeScript
- Dart
- Go
- Groovy
- Java
- JavaScript
- Kotlin
- Lua
- Perl
- PHP
- Python
- R
- Ruby
- Rust
- Scala
- Shell Script
- Swift
- TypeScript

### 📝 许可证

MIT
