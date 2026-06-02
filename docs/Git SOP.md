# Git SOP

这是一篇简单明了的 Git 提交规范。

## 核心原则 Core Rule

保护线性、干净与纯洁的主分支。

## 分支模型

主分支一般是 Elegant，它作为根分支需要整洁。
因此不接受任何非例外的 push，一律提 Pull Request 向主分支提交代码。

## 提交流程

### Step1 拉取代码、创建分支

拉取代码目的比较简单，防止“原来我改的是旧版本的东西吗”的事情发生。
创建分支没有特别的要点，根据当前需要的修改内容打前缀就好

例：

```bash
git checkout elegant && git pull
git checkout -b docs/git-sop
```

### Step2 写代码、提 Commit

关于写代码的代码规范不在此所述，可以看 [代码规范](./code-standard.md) 一文 (todo)

Commit 的消息遵循需要遵循规范，这不仅是可以直观观察到（也许不直观）一次 Commit 干了什么，同时也方便 Standard Version 这种版本工具。

### Step3 提交 Pr

其实我觉得理想化的工作流程应该是先提一个 Draft Pr，然后才开始写代码的。
无所谓吧，就跟写数学题老师说要写草稿一样，但我就是觉得比较多余。

关于提交的 Pr，有点必要强制 Squash Merge 而非 Rebase

Rebase 虽然线性但是整不整洁取决于我在写分支时的状态，如果写分支的 commit 很乱，那 Rebase 进去依然很乱。

### Step4 发版

(todo)
