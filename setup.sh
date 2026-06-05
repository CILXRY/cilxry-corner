#!/bin/bash
# 链接内容仓库 (cilxry-markdown-pages) 到主站
# 前提: 内容仓库已 clone 到本项目隔壁目录

CONTENT_REPO="../cilxry-markdown-pages"

if [ ! -d "$CONTENT_REPO" ]; then
  echo "请先 clone 内容仓库到 $CONTENT_REPO"
  echo "  git clone https://github.com/CILXRY/cilxry-markdown-pages.git $CONTENT_REPO"
  exit 1
fi

ln -sfn "$(realpath "$CONTENT_REPO")" src/content
ln -sfn "$(realpath "$CONTENT_REPO")/configs" src/config/configs

echo "链接完成 ✓"
echo "  src/content        -> $CONTENT_REPO"
echo "  src/config/configs -> $CONTENT_REPO/configs"
