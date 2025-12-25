# Turbo Print Log

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/ygqygq2.turbo-print-log.svg?color=07c160&label=turbo-print-log&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=ygqygq2.turbo-print-log)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/ygqygq2.turbo-print-log)

[English](./README.md) | [中文](./README.zh.md)

---

### 🚀 Main Features

**Turbo Print Log** is a powerful VS Code extension that automates debug log insertion for **22+ programming languages**. It intelligently generates context-aware log statements with file names, line numbers, and variable information.

### ✨ Key Highlights

- 🌍 **Multi-Language Support**: JavaScript/TypeScript, Python, Java, C/C++, Go, Rust, PHP, Ruby, Swift, Kotlin, Scala, and more
- 🎯 **Smart Variable Detection**: Automatically detects variables at cursor position or selection
- 📍 **Context-Aware**: Includes file name and line number in log output
- ⚡ **Multi-Cursor Support**: Process multiple variables simultaneously
- 🎨 **Customizable Format**: Configure log prefix, delimiter, quotes, and more
- 🔧 **Powerful Commands**: Insert, update, comment, uncomment, and delete logs

### �� Usage

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

| Setting                                           | Description                       | Default |
| ------------------------------------------------- | --------------------------------- | ------- |
| `turbo-print-log.logMessagePrefix`                | Prefix for log messages           | `🚀`    |
| `turbo-print-log.logMessageSuffix`                | Suffix after variable name        | `:`     |
| `turbo-print-log.delimiterInsideMessage`          | Delimiter between elements        | `~`     |
| `turbo-print-log.quote`                           | Quote style (`"`, `'`, `` ` ``)   | `"`     |
| `turbo-print-log.includeFileNameAndLineNum`       | Include file name and line number | `true`  |
| `turbo-print-log.addSemicolonInTheEnd`            | Add semicolon at end              | `false` |
| `turbo-print-log.insertEmptyLineBeforeLogMessage` | Insert empty line before log      | `false` |
| `turbo-print-log.insertEmptyLineAfterLogMessage`  | Insert empty line after log       | `false` |
| `turbo-print-log.logFunction`                     | Custom log function per language  | `{}`    |

### 🌐 Supported Languages

JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, Scala, Groovy, Dart, Lua, Perl, R, Shell Script, CoffeeScript

### 📝 License

MIT
