#!/bin/bash

# 当任何命令失败时立即退出脚本
set -e

echo " Gitee上传代码版本自动部署脚本..."
echo "------------------------------------"

# 检查 Docker 是否正在运行
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker 守护进程未运行，请先启动 Docker！"
  exit 1
fi

# --- 部署 Traefik ---
echo "🚀 正在启动/更新 Traefik..."
# 进入 traefik 目录
cd traefik || exit
# 启动 Traefik 服务。如果服务已在运行，此命令会平滑更新它。
docker-compose up -d
# 返回项目根目录
cd ..
echo "✅ Traefik 已成功启动。"
echo "------------------------------------"


# --- 部署主应用 ---
echo "🚀 正在构建并部署您的应用 (ketuai-backend & ketuai-frontend)..."
# 使用 --build 标志强制重新构建镜像，以应用代码更改
# 使用 --remove-orphans 清理掉旧版本可能遗留的容器
docker-compose up -d --build --remove-orphans
echo "✅ 应用部署成功！"
echo "------------------------------------"

echo "🎉 全部完成！"
echo "🌐 您的网站应该已经可以通过 https://www.ketuzx.com 访问"
echo "📈 Traefik 管理面板 (用于调试): http://<您服务器的公网IP>:8080" 