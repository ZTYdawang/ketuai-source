# syntax=docker/dockerfile:1

FROM python:3.10-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# 安装依赖（使用清华 PyPI 镜像加速并避免超时）
ENV PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . ./

EXPOSE 5000

# 使用 gunicorn 生产启动
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "src.main:app"] 