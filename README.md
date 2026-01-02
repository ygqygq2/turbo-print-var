# Turbo Print Var

<p align="center">
  <img src="resources/images/logo.png" alt="Turbo Print Var" width="200">
</p>

> **⚠️ Important Notice**
>
> This extension was originally named `turbo-print-log`, **unfairly delisted from VS Code Marketplace**, and re-published under a new name.
>
> **Statement on Delisting**:
>
> - This extension was created to help developers debug code more efficiently, completely free and open-source with MIT license
> - The original extension only supported 1-2 languages for years and later added paid features, while this extension supports 20+ languages and is completely free
> - **This extension has no relationship with the original extension** - it's a completely independent open-source project
> - The original extension was unreasonably required to not use the word "turbo" - an absurd demand
> - "Turbo" is a common technical term (meaning turbocharged/accelerated), widely used in programming (Turbo Pascal, TurboRepo, Vite Turbo, etc.)
> - Our extension name is completely legitimate, with no trademark infringement or misleading nature
> - We strongly oppose this abuse of review power and suppression of open-source projects
>
> This project is fully open source with transparent code. Review and contributions welcome: https://github.com/ygqygq2/turbo-print-var

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/ygqygq2.turbo-print-var.svg?color=07c160&label=turbo-print-var&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=ygqygq2.turbo-print-var)
[![VS Code Installs](https://img.shields.io/visual-studio-marketplace/i/ygqygq2.turbo-print-var?label=VS%20Code%20installs)](https://marketplace.visualstudio.com/items?itemName=ygqygq2.turbo-print-var)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/ygqygq2/turbo-print-var?label=open-vsx%20downloads)](https://open-vsx.org/extension/ygqygq2/turbo-print-var)
[![GitHub Release](https://img.shields.io/github/v/release/ygqygq2/turbo-print-var?label=GitHub%20Release)](https://github.com/ygqygq2/turbo-print-var/releases)

[English](./README.md) | [中文](./README.zh.md)

---

### 🚀 Main Features

**Turbo Print Var** is a powerful VS Code extension that automates debug log insertion for **20+ programming languages**. It intelligently generates context-aware log statements with file names, line numbers, and variable information.

### ✨ Key Highlights

- 🌍 **Multi-Language Support**: JavaScript/TypeScript, Python, Java, C/C++, Go, Rust, PHP, Ruby, Swift, Kotlin, Scala, and more
- 🎯 **Smart Variable Detection**: Automatically detects variables at cursor position or selection
- 📍 **Context-Aware**: Includes file name and line number in log output
- ⚡ **Multi-Cursor Support**: Process multiple variables simultaneously
- 🎨 **Customizable Format**: Configure log prefix, delimiter, quotes, and more
- 🔧 **Powerful Commands**: Insert, update, comment, uncomment, and delete logs

### 📖 Usage

#### 1. Insert Log Statement

1. Select a variable or place cursor on it
2. Press `Ctrl+Alt+L` (Windows/Linux) or `Cmd+Alt+L` (Mac)
3. Log statement will be inserted on the next line

**Example Output:**

```javascript
const user = { name: 'John' };
console.log('🚀 ~ file: app.js:2 ~ user:', user);
```

#### 2. Update Line Numbers

- Press `Ctrl+Alt+U` (Windows/Linux) or `Cmd+Alt+U` (Mac)
- Updates line numbers in all log statements

#### 3. Comment/Uncomment Logs

- **Comment**: `Alt+Shift+C`
- **Uncomment**: `Alt+Shift+U`

#### 4. Delete All Logs

- Press `Alt+Shift+D` to remove all generated log statements

### ⚙️ Configuration

Customize the extension in VS Code settings (`Ctrl+,` or `Cmd+,`):

| Setting                           | Description                                 | Default |
| --------------------------------- | ------------------------------------------- | ------- |
| `turbo-print-var.prefix`          | Prefix symbol for log messages              | `🚀`    |
| `turbo-print-var.suffix`          | Suffix after variable name                  | `:`     |
| `turbo-print-var.separator`       | Delimiter between log elements              | `~`     |
| `turbo-print-var.quote`           | Quote style: `"`, `'`, or `` ` ``           | `"`     |
| `turbo-print-var.includeFileInfo` | Include file name and line number           | `true`  |
| `turbo-print-var.addSemicolon`    | Add semicolon at end (auto-detect if unset) | auto    |
| `turbo-print-var.emptyLineBefore` | Insert empty line before log                | `false` |
| `turbo-print-var.emptyLineAfter`  | Insert empty line after log                 | `false` |
| `turbo-print-var.logFunction`     | Custom log function per language            | `{}`    |

**Example custom log function:**

```json
{
  "turbo-print-var.logFunction": {
    "php": "var_dump",
    "python": "print"
  }
}
```

### 🌐 Supported Languages

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

### 📝 License

MIT
