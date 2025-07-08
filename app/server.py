import os
from flask import Flask
from dotenv import load_dotenv

from app.extensions import db


def create_app():
    load_dotenv()

    app = Flask(__name__, instance_relative_config=True)

    # 設定
    app.config.from_mapping(
        APP_NAME=os.getenv("APP_NAME", "Comix Viewer"),
        COMIC_DIR="/data/comic_image",
        SQLALCHEMY_DATABASE_URI=os.getenv(
            "DATABASE_URL", "sqlite:////data/sqlite/viewer_data.db"
        ),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    # 拡張機能の初期化
    db.init_app(app)

    # ブループリントの登録
    from app.blueprints import web, api

    app.register_blueprint(web.web_bp)
    app.register_blueprint(api.api_bp)

    with app.app_context():
        db.create_all()

    return app

