# CILXRY 纪事小站 面向 AGENT 文档

这是一个简单的使用Astro为框架来制作的个人网站项目。

## 技术栈

在当前版本中，它是一个简单的前端项目。
用到了这些框架和技术栈：

- Astro 6：基础框架
  - Vue：作为辅助形式的框架
- UnoCSS：样式表和UI库
- TypeScript：开发使用的脚本语言
- swup/astro：过渡动画库
- Prettier：代码检查
- pnpm：包管理器
  - standard-version：版本管理器

## 常用命令

`pnpm dev` 启动开发测试服务器
`pnpm build` 构建生产版本
`pnpm check` 检查内容和代码问题
`pnpm rel` 以 beta 版本发布一个版本

## 代码生成规范

### 计划 Planing

除非是遇到明显的定向问题，其他场景下的内容（比如说新增feat、重构什么内容）都需要考虑这么几点：

- 它会影响什么
- 日后的可扩展性怎么样

### 实现

#### 命名规则

- 组件文件: `PascalCase.tsx`
- 工具函数: `camelCase.ts`
- 常量: `UPPER_SNAKE_CASE`

#### TypeScript

严格模式，尽可能不要使用 `any`。
对一些复杂逻辑尽可能添加必要的注释

#### 样式

优先使用 UnoCSS，根据 `unocss.config.ts` 的设定，启用了属性化模式、单标签和标签化模式

其次使用 Scss 来作为补充

新增组件时注意考虑响应式和主题模式适配

## 开发注意点

生成代码时，注意遵循上述代码生成规范
