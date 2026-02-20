from flask import Flask
from flask_cors import CORS

from routes.analysis import analysis_bp
from routes.insights import insights_bp


def create_app():
    app = Flask(__name__)

    # Enable CORS for frontend integration
    CORS(app)

    # -----------------------------
    # Register Blueprints
    # -----------------------------
    app.register_blueprint(analysis_bp)
    app.register_blueprint(insights_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)