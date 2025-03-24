from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from app.config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    # ✅ Ensure models are registered before migrations
    with app.app_context():
        from app import models
        db.create_all()

    # ✅ Add Home Route
    @app.route("/")
    def home():
        return jsonify({"message": "ShelfQuest API is running!"}), 200

    # ✅ Register Blueprints (API Routes)
    from app.routes.auth import auth_bp  # Ensure this import is inside create_app()
    from app.routes.books import books_bp
    app.register_blueprint(auth_bp, url_prefix="/api")  # ✅ Fixing blueprint registration
    app.register_blueprint(books_bp, url_prefix="/api")

    return app
