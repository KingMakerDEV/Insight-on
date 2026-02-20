import os
from flask import Flask, jsonify
from flask_cors import CORS

# Import Blueprints
from routes.upload import upload_bp
from routes.analysis import analysis_bp
from routes.forecast import forecast_bp

def create_app():
    app = Flask(__name__)
    def create_app():
        app = Flask(__name__)
        CORS(app)
    
    # Configuration
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'data/uploads')
    app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 MB max limit
    
    # Ensure upload directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # --- Root Route ---
    # This prevents the 404 error when visiting http://127.0.0.1:5000/
    @app.route('/')
    def index():
        return jsonify({
            "status": "success",
            "message": "Insight-on API is active",
            "api_version": "1.0",
            "base_endpoint": "/api/data"
        }), 200

    # Register Routes
    app.register_blueprint(upload_bp, url_prefix='/api/data')
    app.register_blueprint(analysis_bp, url_prefix='/api/data')
    app.register_blueprint(forecast_bp, url_prefix='/api/data')

    # --- Improved Global Error Handler ---
    @app.errorhandler(Exception)
    def handle_exception(e):
        # If it's a standard HTTP error (like 404), use its code. 
        # Otherwise, default to 500 (Internal Server Error).
        code = 500
        if hasattr(e, 'code'):
            code = e.code
            
        return jsonify({
            "error": str(e),
            "status": "failed",
            "code": code
        }), code

    return app

if __name__ == '__main__':
    app = create_app()
    # Debug=True is great for development as it auto-reloads on save
    app.run(debug=True, port=5000)