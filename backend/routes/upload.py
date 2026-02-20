import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from utils.validators import allowed_file

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        return jsonify({
            "message": "File uploaded successfully", 
            "filename": filename,
            "filepath": filepath
        }), 201
        
    return jsonify({"error": "Invalid file type. Only CSV allowed."}), 400