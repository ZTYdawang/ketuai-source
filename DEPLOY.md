# 部署到生产环境（Ubuntu 22.04 + Docker）

> 以下流程假设已完成代码推送到 GitHub。服务器需已安装 **Docker ≥ 20.10** 与 **docker-compose ≥ 1.29**。

## 1. 克隆代码
```bash
sudo mkdir -p /opt/ketuai
sudo chown $USER:$USER /opt/ketuai
cd /opt/ketuai
# 使用你的仓库地址
git clone https://github.com/<YOUR_ORG>/ketuai-source.git .
```

## 2. 构建并启动容器
```bash
# 第一次构建（耗时较长）
sudo docker compose up -d --build
```

命令完成后：
* 前端服务暴露在 `80` 端口，可通过 `http://<服务器IP>/` 访问；
* 后端 API 监听 `5000` 端口，如 `http://<服务器IP>:5000/api/health`。

## 3. 实时查看日志
```bash
sudo docker compose logs -f backend
sudo docker compose logs -f frontend
```

## 4. 数据与配置持久化
* **SQLite 数据库**：在 `backend/instance` 目录下，通过 `volumes` 映射到宿主机，同步持久化。
* **环境变量**：如需自定义，请修改 `docker-compose.yml` 中 `environment` 或创建 `.env` 并在 `backend` 服务中通过 `env_file` 引入。

## 5. 常用命令
```bash
# 重建并更新镜像
sudo docker compose pull      # 若使用远程镜像
sudo docker compose build     # 本地构建
sudo docker compose up -d     # 重新创建并滚动重启

# 关闭并删除容器
sudo docker compose down
```

## 6. CI/CD（可选）
可使用 GitHub Actions 自动构建并推送镜像到 Docker Hub，然后在服务器上 `docker compose pull && docker compose up -d` 执行滚动更新。

---

> 如对部署步骤有任何疑问，欢迎在 Issues 提出~ 