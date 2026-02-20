from flask import Flask
from flask_cors import CORS

from routes.analysis import analysis_bp
from routes.insights import insights_bp
from routes.chart_config import chart_config_bp
from routes.upload import upload_bp   # NEW

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(upload_bp)       # NEW
    app.register_blueprint(analysis_bp)
    app.register_blueprint(insights_bp)
    app.register_blueprint(chart_config_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
