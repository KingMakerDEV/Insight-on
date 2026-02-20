# services/forecast_explainer.py

def generate_forecast_explanation(series: list, forecast_result: dict) -> dict:
    """
    Interpret forecast result and generate human-readable explanation.

    Inputs:
        series: historical numeric values
        forecast_result: {
            "next_value_prediction": float,
            "confidence_interval": (lower, upper)  # optional
        }

    Output:
        structured explanation dictionary
    """

    if not series or "next_value_prediction" not in forecast_result:
        return {
            "explanation": "Insufficient data for forecast explanation."
        }

    last_actual = series[-1]
    predicted = forecast_result["next_value_prediction"]

    change = predicted - last_actual
    percent_change = (change / last_actual) * 100 if last_actual != 0 else 0

    # Determine direction
    if change > 0:
        direction = "increase"
    elif change < 0:
        direction = "decrease"
    else:
        direction = "no change"

    explanation_text = (
        f"The forecast predicts a {direction} "
        f"from {round(last_actual, 2)} to {round(predicted, 2)} "
        f"({round(percent_change, 2)}% change)."
    )

    # Confidence interval interpretation (if exists)
    if "confidence_interval" in forecast_result:
        lower, upper = forecast_result["confidence_interval"]
        explanation_text += (
            f" The expected range lies between "
            f"{round(lower,2)} and {round(upper,2)}."
        )

    return {
        "last_actual": round(last_actual, 2),
        "predicted_value": round(predicted, 2),
        "percent_change": round(percent_change, 2),
        "direction": direction,
        "explanation": explanation_text
    }