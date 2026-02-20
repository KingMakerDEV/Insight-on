# services/rule_engine.py
from services.decision_models import AnalysisDecision
from services.intelligence_types import DatasetProfile, map_confidence_score
def build_analysis_plan(schema: dict, stats: dict) -> dict:
    """
    Core intelligence rule engine.

    Inputs:
        schema -> structured column metadata
        stats  -> lightweight dataset statistics

    Output:
        structured analysis decision plan
    """

    columns = schema.get("columns", [])
    row_count = stats.get("row_count", 0)
    missing_ratio = stats.get("missing_ratio", 0)
    numeric_columns = stats.get("numeric_columns", [])

    # ----------------------------------
    # 1️⃣ Identify column types
    # ----------------------------------
    datetime_cols = [c["name"] for c in columns if c["type"] == "datetime"]
    categorical_cols = [c["name"] for c in columns if c["type"] == "categorical"]
    numeric_cols = [c["name"] for c in columns if c["type"] == "numeric"]

    time_column = datetime_cols[0] if datetime_cols else None
    primary_numeric = numeric_cols[0] if numeric_cols else None

    # ----------------------------------
    # 2️⃣ Initialize decision flags
    # ----------------------------------
    enable_trend = False
    enable_correlation = False
    enable_forecast = False

    dataset_profile = "basic"
    confidence_score = 1.0

    # ----------------------------------
    # 3️⃣ Rule Logic
    # ----------------------------------

    # Time-series detection
    if time_column and numeric_cols:
        enable_trend = True
        dataset_profile = "time_series"

    # Multivariate detection
    if len(numeric_cols) >= 2:
        enable_correlation = True
        dataset_profile = "multivariate"

    # Time-series + multivariate
    if time_column and len(numeric_cols) >= 2:
        dataset_profile = "time_series_multivariate"

    # Forecast eligibility
    if time_column and numeric_cols and row_count >= 10:
        enable_forecast = True

    # ----------------------------------
    # 4️⃣ Confidence Scoring
    # ----------------------------------

    # Penalize small datasets
    if row_count < 10:
        confidence_score -= 0.3

    # Penalize high missing data
    if missing_ratio > 0.2:
        confidence_score -= 0.3

    # Penalize if no numeric columns
    if not numeric_cols:
        confidence_score -= 0.5

    # Clamp between 0 and 1
    confidence_score = max(0.0, min(1.0, round(confidence_score, 2)))

    # ----------------------------------
    # 5️⃣ Final Analysis Plan
    # ----------------------------------

    return {
        "enable_trend_analysis": enable_trend,
        "enable_correlation_analysis": enable_correlation,
        "enable_forecast": enable_forecast,
        "primary_numeric_target": primary_numeric,
        "time_column": time_column,
        "dataset_profile": dataset_profile,
        "confidence_score": confidence_score
    }