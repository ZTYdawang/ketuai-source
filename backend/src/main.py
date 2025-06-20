from flask import Flask, jsonify, request, g, Response
import sys
import os
import jwt
import datetime
from functools import wraps
from flask_cors import CORS
import requests

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))  # DON'T CHANGE THIS !!!
from src.models import db
from src.routes.auth import auth_bp
from src.routes.user import user_bp
#from src.routes.ai_department import ai_department_bp
#from src.routes.consultation import consultation_bp
from src.routes.admin import admin_bp

app = Flask(__name__)
# 允许指定前端跨域并支持带 cookie/凭证
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "http://172.21.0.1:5173",
    "http://ketuzx.com",
    "https://ketuzx.com"
])

# 配置数据库
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///ketuai.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'ketuai-secret-key'

# 初始化数据库
db.init_app(app)

# 在应用启动时创建表并确保初始管理员
with app.app_context():
    db.create_all()
    from src.models import user as _u  # 躲避循环导入
    try:
        ensure_initial_admin()
    except Exception as e:
        print('init admin error:', e)

# 注册蓝图
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api/user')
#app.register_blueprint(ai_department_bp, url_prefix='/api/ai-department')
#app.register_blueprint(consultation_bp, url_prefix='/api/consultation')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

# 全局错误处理
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# 健康检查接口
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'version': '1.0.0',
        'service': '科图AI产业赋能研究院'
    })

# Dify API 代理配置
DIFY_API_BASE = os.environ.get('DIFY_API_BASE', 'http://localhost:5002')  # 这里请根据实际 Dify API 地址调整

@app.route('/v1/<path:path>', methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
def proxy_v1(path):
    if request.method == "OPTIONS":
        # 直接返回 200，带上 CORS 头
        response = Response()
        response.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin', '*')
        response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = request.headers.get('Access-Control-Request-Headers', '*')
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
    url = f"{DIFY_API_BASE}/v1/{path}"
    headers = {key: value for key, value in request.headers if key.lower() != 'host'}
    resp = requests.request(
        method=request.method,
        url=url,
        headers=headers,
        data=request.get_data(),
        cookies=request.cookies,
        allow_redirects=False,
        stream=True
    )
    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    response_headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
    return Response(resp.content, resp.status_code, response_headers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
