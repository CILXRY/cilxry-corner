# 关于这个小破网站的技术栈

## 网站本身的技术栈

在当前版本中，它是一个简单的前端项目。
用到了这些框架和技术栈：

- Astro 6 基础框架
  - Vue 作为辅助形式的框架
- UnoCSS 样式表和 UI 库
- TypeScript 开发使用的脚本语言
- swup/astro 过渡动画库
- Prettier 代码检查
- pnpm 包管理器
  - standard-version 版本管理器

当 Push 代码后， DevOps 流程是这样的：

1. Git Push 到一个新分支
2. （做完功能后）在 GitHub 上申请提交 Pr
3. Pr 之后会把这些修改应用到 Action 的 Dev 环境
4. （用 standard-version 发布一个版本时） Action 会将版本部署到正式版本上

全栈还没做。

## 本网站的域名

`cilxry.cc` 就是一般来讲你现在访问的这个网站
注：
  请确保你访问的 `https`（地址栏带有小锁）
  而非 `http`（提示“此网站不安全”）的网站

此外，这些域名一般来讲也是这个网站的：
`*.cilxry.cc`
`cilxry.github.io`
`cilxry.vercel.io`
