from flask import Blueprint, request, jsonify
from services.csv_parser import parse_csv
from services.forecast_engine import run_linear_regression
from utils.helpers import clean_json_payload

forecast_bp = Blueprint('forecast', __name__)

@forecast_bp.route('/forecast/regression', methods=['POST'])
def forecast_regression():
    data = request.json
    filepath = data.get('filepath')
    target_col = data.get('target_col')
    feature_cols = data.get('feature_cols')
    
    if not all([filepath, target_col, feature_cols]):
        return jsonify({"error": "filepath, target_col, and feature_cols are required"}), 400
        
    df = parse_csv(filepath)
    
    regression_results = run_linear_regression(df, target_col, feature_cols)
    
    return jsonify(clean_json_payload(regression_results)), 200