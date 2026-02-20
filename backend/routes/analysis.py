from flask import Blueprint, request, jsonify
from services.csv_parser import parse_csv
from services.schema_detector import detect_schema
from services.stats_engine import compute_basic_stats, compute_correlations
from utils.helpers import clean_json_payload

analysis_bp = Blueprint('analysis', __name__)

@analysis_bp.route('/analyze', methods=['POST'])
def analyze_data():
    data = request.json
    filepath = data.get('filepath')
    
    if not filepath:
        return jsonify({"error": "filepath is required"}), 400
        
    df = parse_csv(filepath)
    
    schema = detect_schema(df)
    stats = compute_basic_stats(df)
    correlations = compute_correlations(df)
    
    payload = {
        "schema": schema,
        "statistics": stats,
        "correlations": correlations
    }
    
    # Clean NaN/Inf to prevent JSON serialization errors
    return jsonify(clean_json_payload(payload)), 200