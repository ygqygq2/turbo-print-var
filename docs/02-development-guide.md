# 开发指南

## 开始使用

### 环境要求

- Node.js 18+
- pnpm 8+
- VS Code 1.80+

### 项目设置

```bash
# 安装依赖
pnpm install

# 编译
pnpm run compile

# 监听模式
pnpm run watch

# 运行测试
pnpm test

# 代码检查
pnpm run lint
```

## 项目结构

```
src/
├── commands/          # 命令实现
├── config/           # 配置管理
├── core/             # 核心业务逻辑
│   ├── languages/    # 语言定义
│   ├── log-builder.ts
│   └── log-parser.ts
├── editor/           # 编辑器集成
├── types/            # TypeScript 类型
├── utils/            # 工具函数
└── extension.ts      # 入口文件
```

## 添加新语言

1. **在 `src/core/languages/index.ts` 中定义语言配置**：

```typescript
registerLanguage({
  id: 'newlang',
  defaultLogFn: 'debug',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
});
```

2. **在 `sampleWorkspace/` 中添加测试文件**

## 配置架构

用户可以在 VS Code 设置中覆盖默认值：

```json
{
  "turbo-print-var.prefix": "🔍",
  "turbo-print-var.separator": " | ",
  "turbo-print-var.logFn": {
    "javascript": "logger.debug",
    "python": "logging.info"
  }
}
```

## 测试策略

### 单元测试

- 位于 `src/test/unit/`
- 使用 Vitest 框架
- 隔离测试单个模块

### 集成测试

- 位于 `src/test/suite/`
- 端到端测试命令执行
- 使用 VS Code 测试环境

### 运行测试

```bash
# 带覆盖率的单元测试
pnpm run test:unit

# 集成测试
pnpm run test:integration

# 所有测试
pnpm test
```

## 生产构建

```bash
# 编译优化后的包
pnpm run compile

# 打包扩展
pnpm run package
```

输出：`turbo-print-var-{version}.vsix`

## 调试

1. 在 VS Code 中打开项目
2. 按 `F5` 启动扩展开发主机
3. 在 TypeScript 文件中设置断点
4. 在调试实例中触发命令

## 代码风格

- **TypeScript 严格模式**: 已启用
- **ESLint**: 遵循配置的规则
- **命名**: 变量/函数使用 camelCase，类使用 PascalCase
- **格式化**: 保存时自动格式化

## 贡献工作流

1. 创建功能分支
2. 编写代码和测试
3. 运行 `pnpm run lint` 并修复问题
4. 确保所有测试通过
5. 提交 PR 并附上说明

## 常见问题

### 编译错误

- 运行 `pnpm run clean` 然后 `pnpm install`
- 检查 Node.js 版本兼容性

### 测试失败

- 确保 VS Code API mock 已更新
- 检查 `sampleWorkspace/` 中的测试工作区文件

### 扩展未激活

- 验证 package.json 中的 `activationEvents`
- 查看扩展主机日志（`Developer: Show Logs`）
