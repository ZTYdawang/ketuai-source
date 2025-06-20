# syntax=docker/dockerfile:1

########## 构建阶段 ##########
FROM node:18-alpine AS builder
WORKDIR /app

# 使用国内 registry 加速并安装 pnpm
ENV PNPM_CONFIG_REGISTRY=https://registry.npmmirror.com
RUN corepack enable && corepack prepare pnpm@latest --activate

# 安装依赖并缓存
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# 复制其余前端代码并构建
COPY . ./
RUN pnpm run build

########## 运行阶段 ##########
FROM nginx:alpine AS runtime

# 自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 拷贝静态文件
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 