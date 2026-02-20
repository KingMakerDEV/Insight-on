from flask import Blueprint, request, jsonify
import os

from services.csv_parser import CSVParser
from services.schema_detector import SchemaDetector
from services.stats_engine import StatsEngine
from services.trend_detector import TrendDetector
from services.forecast_engine import ForecastEngine
from services.root_cause import RootCauseAnalyzer
from utils.validators import FileValidator

analysis_bp = Blueprint("analysis", __name__)

UPLOAD_FOLDER = "data/uploads"


@analysis_bp.route("/analyze", methods=["POST"])
def analyze_csv():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    try:
        # -------- Validation --------
        FileValidator.validate_file(file.filename)
        FileValidator.ensure_upload_folder(UPLOAD_FOLDER)

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        # -------- Parse CSV --------
        df = CSVParser.parse(file_path)

        if df is None or df.empty:
            return jsonify({"error": "Uploaded file is empty"}), 400

        # -------- Schema Detection --------
        schema = SchemaDetector(df).detect()

        # -------- Stats Computation --------
        stats = StatsEngine(df).compute()

        # -------- Trend Detection --------
        trend_data = TrendDetector(df).detect()

        # -------- Forecast --------
        forecast_data = {}
        if trend_data["time_column"]:
            forecast_engine = ForecastEngine(df, trend_data["time_column"])
            forecast_data = forecast_engine.forecast()

        # -------- Root Cause Analysis --------
        root_cause_data = RootCauseAnalyzer(
            stats["correlation_matrix"]
        ).analyze()

        return jsonify({
            "rows": len(df),
            "columns": list(df.columns),
            "schema": schema,
            "stats": stats,
            "trend_analysis": trend_data,
            "forecast": forecast_data,
            "root_cause": root_cause_data
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500