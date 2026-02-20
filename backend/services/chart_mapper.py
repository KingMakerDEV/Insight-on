# services/chart_mapper.py

def generate_chart_config(schema: dict) -> dict:
    """
    Intelligent rule-based chart mapping logic.

    Input:
        schema = {
            "columns": [
                {"name": "Year", "type": "datetime"},
                {"name": "State", "type": "categorical"},
                {"name": "Sales", "type": "numeric"}
            ]
        }

    Output:
        Chart configuration dictionary
    """

    columns = schema.get("columns", [])

    datetime_cols = []
    categorical_cols = []
    numeric_cols = []

    # ---------------------------------------
    # 1️⃣ Classify column types
    # ---------------------------------------
    for col in columns:
        if col["type"] == "datetime":
            datetime_cols.append(col["name"])
        elif col["type"] == "categorical":
            categorical_cols.append(col["name"])
        elif col["type"] == "numeric":
            numeric_cols.append(col["name"])

    # ---------------------------------------
    # 2️⃣ Rule-Based Chart Decisions
    # ---------------------------------------

    # 🔹 Time Series → Line Chart
    if datetime_cols and numeric_cols:
        return {
            "chart_type": "line_chart",
            "x_axis": datetime_cols[0],
            "y_axis": numeric_cols[0],
            "aggregation": "sum"
        }

    # 🔹 Category + Numeric → Bar Chart
    if categorical_cols and numeric_cols:
        return {
            "chart_type": "bar_chart",
            "x_axis": categorical_cols[0],
            "y_axis": numeric_cols[0],
            "aggregation": "sum"
        }

    # 🔹 Multiple Numeric → Scatter Plot
    if len(numeric_cols) >= 2:
        return {
            "chart_type": "scatter_plot",
            "x_axis": numeric_cols[0],
            "y_axis": numeric_cols[1]
        }

    # 🔹 Single Numeric → Histogram
    if len(numeric_cols) == 1:
        return {
            "chart_type": "histogram",
            "x_axis": numeric_cols[0]
        }

    # 🔹 Only Categorical → Pie Chart
    if categorical_cols and not numeric_cols:
        return {
            "chart_type": "pie_chart",
            "category_field": categorical_cols[0]
        }

    # 🔹 Fallback
    return {
        "chart_type": "table"
    }