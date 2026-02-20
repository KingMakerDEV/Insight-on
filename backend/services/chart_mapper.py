# services/chart_mapper.py

from typing import Dict, Any


def generate_chart_config(
    schema: Dict[str, Any],
    stats: Dict[str, Any],
    trend_analysis: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Intelligent rule-based chart mapping logic
    compatible with GovLens backend structure.
    """

    numeric_cols = stats.get("numeric_columns", [])
    categorical_cols = stats.get("categorical_columns", [])
    time_column = trend_analysis.get("time_column")

    # ---------------------------------------
    # 1️⃣ Time Series → Line Chart
    # ---------------------------------------
    if time_column and len(numeric_cols) > 1:
        # choose first numeric that is not time
        y_candidates = [col for col in numeric_cols if col != time_column]

        if y_candidates:
            return {
                "chart_type": "line_chart",
                "x_axis": time_column,
                "y_axis": y_candidates[0],
                "aggregation": "mean"
            }

    # ---------------------------------------
    # 2️⃣ Category + Numeric → Bar Chart
    # ---------------------------------------
    if categorical_cols and numeric_cols:
        return {
            "chart_type": "bar_chart",
            "x_axis": categorical_cols[0],
            "y_axis": numeric_cols[0],
            "aggregation": "mean"
        }

    # ---------------------------------------
    # 3️⃣ Multiple Numeric → Correlation Heatmap
    # ---------------------------------------
    if len(numeric_cols) >= 3:
        return {
            "chart_type": "heatmap",
            "data_source": "correlation_matrix"
        }

    # ---------------------------------------
    # 4️⃣ Two Numeric → Scatter Plot
    # ---------------------------------------
    if len(numeric_cols) == 2:
        return {
            "chart_type": "scatter_plot",
            "x_axis": numeric_cols[0],
            "y_axis": numeric_cols[1]
        }

    # ---------------------------------------
    # 5️⃣ Single Numeric → Histogram
    # ---------------------------------------
    if len(numeric_cols) == 1:
        return {
            "chart_type": "histogram",
            "x_axis": numeric_cols[0]
        }

    # ---------------------------------------
    # Fallback
    # ---------------------------------------
    return {
        "chart_type": "table"
    }