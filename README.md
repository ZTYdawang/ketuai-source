# TODO：下一步开发路径规划

## 一、前端部分

### 1. 已完成核心功能
- [x] 智能体页面模板化（AgentChatPageTemplate），支持多智能体极速裂变开发
- [x] Dify 智能体 API 对接，支持 chat/workflow 两类应用，API 路径和参数动态适配
- [x] 会话管理与隔离：支持会话增删查改、历史调取、前端伪隔离（按智能体归属）
- [x] 会话卡片区：支持历史展示、切换、删除、自动刷新
- [x] 文件上传体验升级：多文件上传、进度气泡、附件管理、自动收集 file_id
- [x] 发送消息自动收集所有已上传成功的 file_id，自动拼装 workflow inputs
- [x] 支持 workflow 文件参数为数组，变量名、结构与 Dify 后台配置完全一致
- [x] AI回复富文本/Markdown 渲染，支持复制、编辑
- [x] CORS 代理与本地 Flask 代理适配，前端 API 统一走 5000 端口
- [x] 兼容 Dify workflow 返回结构（data.data.outputs），自动读取主输出字段
- [x] 认证流程、仪表盘、后台管理等页面主体开发完成

### 2. 页面与交互完善
- [x] 注册成功弹窗 + 6 秒倒计时自动跳转登录
- [ ] 首页各区块内容与样式完善，补充真实数据与跳转逻辑
- [ ] 关于我们、案例、联系我们等页面表单与内容完善
- [ ] 后台管理各子页面功能补充

### 3. 通用组件与UI
- [ ] 通用表单、弹窗、通知等组件抽象与复用
- [ ] Loading、空状态、错误提示等用户体验细节补充

### 4. 状态管理与数据流
- [ ] useConversations、useTypeLines等hooks完善，支持全局状态管理
- [ ] 前端接口请求统一封装，错误处理与权限校验

## 二、后端部分

### 1. API与业务逻辑
- [x] Dify API 代理（Flask），支持 /v1 路径全量代理，自动处理 CORS 预检
- [x] 会话、用户、AI应用等基础API开发
- [ ] 后台管理相关API、表单、日志等补充

### 2. 数据模型与数据库
- [x] 会话、用户、AI智能体等核心模型已实现
- [ ] 其它业务模型补充与优化

### 3. 安全与部署
- [x] API权限校验与安全加固（初步）
- [ ] 日志、异常、监控等基础设施完善
- [ ] 部署脚本与CI/CD流程优化

## 三、联调与测试
- [x] 前后端接口联调，Dify 智能体全流程打通
- [ ] 单元测试、集成测试用例补充
- [ ] 端到端自动化测试

## 四、文档与运维
- [x] Dify 对接、智能体开发、文件上传、workflow 适配等关键细节已记录
- [ ] 项目README、开发文档、API文档完善
- [ ] 用户手册、部署手册、FAQ等补充

---

## 本次问题解决与关键方法记录

1. **Dify workflow 400/404 问题排查**：严格对齐 API 路径（/v1/workflows/run）、参数结构、变量名，文件参数始终为数组，变量名与 Dify 后台一致。
2. **CORS 与代理问题**：本地 Flask 代理自动处理 OPTIONS 预检，返回标准 CORS 头，前端 API 统一走 5000 端口。
3. **文件上传与 workflow 结合**：上传成功后自动收集 file_id，拼装为 transfer_method/local_file/type/document 结构，支持多文件。
4. **workflow 返回结构兼容**：前端自动兼容 data.data.outputs 和 data.outputs，优先读取主输出字段。
5. **会话管理与隔离**：支持多会话历史、卡片区切换、删除、前端伪隔离（按智能体归属）。
6. **智能体页面极速裂变**：AgentChatPageTemplate + 配置驱动，所有智能体一行代码上线。
7. **用户体验优化**：文件上传气泡、进度、移除、继续添加，AI回复富文本渲染。

---

> 2024-07-18  智能体平台前后端主流程开发与 Dify 对接全部完成，后续进入体验细节、测试与文档完善阶段。

## ☑️ 已完成部署里程碑
* Docker 容器化（前端 Nginx、后端 Gunicorn）
* docker-compose 一键启动，国内 PyPI/NPM 镜像加速
* 阿里云 ECS 上线，域名解析 `ketuzx.com` 指向 120.26.24.39
* 自动建表 & 初始管理员（admin@163.com / password）

---

## 🔜 下一阶段开发计划（2025-Q3 Sprint1）

### 1. 安全 & HTTPS
* [ ] Let's Encrypt 证书自动申请与续期，Nginx 443 server 块
* [ ] 前后端强制 HTTPS & HSTS

### 2. CI/CD 优化
* [ ] GitHub Actions 构建并推送镜像到 ACR / Docker Hub
* [ ] 服务器 Watchtower 自动拉取并热更新

### 3. 后端功能
* [ ] 完善 /api/admin 统计、日志、RBAC 权限
* [ ] 邮件验证码、找回密码、头像上传

### 4. 前端体验
* [ ] 管理后台左侧导航国际化 / 折叠记忆
* [ ] 表单组件库抽象（FormItem、ApiForm）
* [ ] 全站 SEO：meta title/description 动态、sitemap

### 5. 测试与监控
* [ ] pytest 单元测试覆盖 60%+
* [ ] Playwright 端到端流水线
* [ ] Prometheus + Grafana 监控容器资源、接口耗时

### 6. 文档
* [ ] README 拆分：快速开始 / 生产部署 / 开发手册
* [ ] OpenAPI (Swagger) 自动生成
* [ ] 用户常见问题 FAQ
