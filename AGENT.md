# CILXRY 纪事小栈 — Agent 指南

基于 **Astro 6 + Vue 3 + UnoCSS** 的个人博客网站（v0.1.1-beta.2）。
> 详细技术栈说明见 [docs/about-this-site-tech-stacks.md](docs/about-this-site-tech-stacks.md)
> 项目结构见 [docs/the-project-tree.md](docs/the-project-tree.md)

---

## 常用命令

| 命令 | 用途 |
|------|------|
| `pnpm dev` | 开发服务器 → `localhost:2026` |
| `pnpm build` | 生产构建 → `./dist/` |
| `pnpm check` | Python 校验 frontmatter + `astro check` |
| `pnpm lint` / `pnpm lint:fix` | ESLint 检查/自动修复 |
| `pnpm rel` | standard-version beta 版本发布 |

---

## 开发工作流

### 1. 计划

开始前明确：
- 这个改动**影响哪些模块**（组件、页面、配置、类型等）
- 是否涉及**双仓库中的内容**（posts / configs）
- **日后的可扩展性** — 是否便于后续新增功能

### 2. 新建分支

```bash
git checkout -b feat/你的功能名     # 新功能
git checkout -b fix/你的修复名      # 修复
git checkout -b refactor/你的重构名 # 重构
```

分支命名建议：`feat/`、`fix/`、`refactor/`、`chore/`、`docs/`

### 3. 编码实现

- 遵循上方[编码规范](#编码规范)和[开发注意点](#开发注意点)
- 优先使用路径别名引用模块
- 新增 Vue 组件记得在 Astro 中添加 `client:load`
- 新增国际化 key 时确保同时更新 `zh-CN` 和 `en-US`

### 4. 本地验证

```bash
pnpm check:so # Site Only Astro check
pnpm lint     # ESLint 代码检查
pnpm build    # 确保生产构建通过
pnpm dev      # 启动开发服务器预览效果
```

### 5. Git 提交

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 新功能
fix: 修复
refactor: 重构
chore: 杂项（构建、依赖等）
docs: 文档
style: 格式调整（不影响逻辑）
```

示例：
```
feat: 新增文章目录导航组件
fix: 修复暗色模式下导航栏对比度问题
```

提交前用 `pnpm lint` 确保无错误。

### 6. 推送与 PR

```bash
git push origin feat/你的功能名
```

之后在 GitHub 上创建 Pull Request，等待 review 通过后合并到 `elegant` 分支。

---

## 双仓库架构

文章和配置存储在外部仓库 [cilxry-markdown-pages](https://github.com/CILXRY/cilxry-markdown-pages)，通过软链挂载到 `/datas/` 目录。
> 详见 [docs/双仓库说明.md](docs/双仓库说明.md)

**关键路径**:
- `/datas/posts/` — 博客文章（Markdown + frontmatter）
- `/datas/configs/` — 站点配置文件

---

## 编码规范

### 命名规则
- 组件文件: `PascalCase` (`.astro` / `.vue` / `.tsx`)
- 工具函数: `camelCase.ts`
- 常量: `UPPER_SNAKE_CASE`

### TypeScript
- **严格模式** — `noImplicitAny: true`, `strictNullChecks: true`，禁止使用 `any`
- 复杂逻辑必须添加注释
- 路径别名（详见 `tsconfig.json`）:
  - `@cp/*` → `src/components/`
  - `@cfg/*` → `src/config/`
  - `@tp/*` → `src/types/`
  - `@ut/*` → `src/utils/`
  - `@/*` → `src/`
  - `@basePageLayout` → `src/layouts/BasePageLayout.astro`
  - `@lc/*` → `src/layouts/LayoutComponents/`

### 样式优先级
1. **UnoCSS**（主）— 启用了 attributify、tagify、typography 预设
2. **SCSS**（辅）— 存放在 `src/styles/`
3. 新增组件必须考虑 **响应式** 和 **暗色主题模式**

### 组件
- Astro 组件负责服务端渲染布局
- Vue 组件用 `<script setup>` 语法，在 Astro 中使用时需添加 `client:load`
- i18n 翻译使用 `translate(key, lang)` 函数（详见 `src/i18n/`）
- Pinia 用于状态管理

---

## 内容管理

- 文章 frontmatter 字段定义见 [docs/frontmatter.md](docs/frontmatter.md)
- 校验流程: `pnpm check` → Python 脚本验证 → `astro check`
- schema 定义在 `src/config/schema.ts`，导出为 JSON 在 `validate/schemas/`

---

## 架构要点

- **双仓库**：代码与内容分离，重新部署时需克隆两个仓库并软链
- **页面过渡**：swup 提供 SPA 类页面切换动画
- **代码高亮**：Expressive Code（Tokyo Night + Snazzy Light 主题）
- **ESLint**：禁止 `any` 类型，已配置 Vue + Astro 规则
- **Prettier**：85 字符行宽，2 空格缩进
- **无测试框架**：依靠 `pnpm check` 和手动验证

---

## 开发注意点

1. 新增功能前评估**影响范围**和**可扩展性**
2. 优先使用路径别名而非相对路径
3. UnoCSS attributify 模式下使用 HTML 属性而非 class 字符串
4. 不要直接修改 `/datas/` 下的内容（由外部仓库管理）
5. ESLint 已忽略 `src/content/` 和 `src/config/configs/`
6. Python 校验脚本需要 `DEEPSEEK_API_KEY` 环境变量才可自动补全 frontmatter
