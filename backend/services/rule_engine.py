# services/rule_engine.py

def build_analysis_plan(
    schema: dict,
    stats: dict,
    trend_analysis: dict,
    rows: int
) -> dict:
    """
    Core intelligence rule engine.
    Fully compatible with GovLens Data Engine.
    """

    numeric_cols = stats.get("numeric_columns", [])
    categorical_cols = stats.get("categorical_columns", [])
    time_column = trend_analysis.get("time_column")

    enable_trend = False
    enable_correlation = False
    enable_forecast = False

    dataset_profile = "basic"
    confidence_score = 1.0

    # ----------------------------------
    # Trend eligibility
    # ----------------------------------

    if time_column and numeric_cols:
        enable_trend = True
        dataset_profile = "time_series"

    # ----------------------------------
    # Multivariate eligibility
    # ----------------------------------

    if len(numeric_cols) >= 2:
        enable_correlation = True
        dataset_profile = "multivariate"

    if time_column and len(numeric_cols) >= 2:
        dataset_profile = "time_series_multivariate"

    # ----------------------------------
    # Forecast eligibility
    # ----------------------------------

    if time_column and numeric_cols and rows >= 10:
        enable_forecast = True

    # ----------------------------------
    # Confidence scoring
    # ----------------------------------

    if rows < 10:
        confidence_score -= 0.3

    if not numeric_cols:
        confidence_score -= 0.5

    confidence_score = max(0.0, min(1.0, round(confidence_score, 2)))

    # ----------------------------------
    # Final structured plan
    # ----------------------------------

    return {
        "enable_trend_analysis": enable_trend,
        "enable_correlation_analysis": enable_correlation,
        "enable_forecast": enable_forecast,
        "primary_numeric_target": numeric_cols[0] if numeric_cols else None,
        "time_column": time_column,
        "dataset_profile": dataset_profile,
        "confidence_score": confidence_score
    }