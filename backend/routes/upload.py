from flask import Blueprint, request, jsonify
import os
import uuid

from services.csv_parser import CSVParser
from utils.validators import FileValidator

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "data/uploads"


@upload_bp.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        # Validate file extension
        FileValidator.validate_file(file.filename)

        # Ensure upload folder exists
        FileValidator.ensure_upload_folder(UPLOAD_FOLDER)

        # Create unique filename
        unique_filename = f"{uuid.uuid4().hex}_{file.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)

        # Save file
        file.save(file_path)

        # Validate CSV integrity
        df = CSVParser.parse(file_path)

        if df is None or df.empty:
            os.remove(file_path)
            return jsonify({"error": "Uploaded CSV is empty or invalid"}), 400

        return jsonify({
            "message": "File uploaded successfully",
            "filename": unique_filename,
            "rows": len(df),
            "columns": list(df.columns)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500