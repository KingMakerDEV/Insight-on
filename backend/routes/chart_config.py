# routes/chart_config.py

from flask import Blueprint, request, jsonify
from services.chart_mapper import generate_chart_config


# Create blueprint
chart_config_bp = Blueprint("chart_config", __name__)


@chart_config_bp.route("/chart-config", methods=["POST"])
def chart_config():
    """
    Visualization intelligence endpoint.

    Accepts deterministic analysis output and
    returns structured chart configuration.
    """

    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON body"}), 400

        schema = data.get("schema", {})
        stats = data.get("stats", {})
        trend_analysis = data.get("trend_analysis", {})

        chart_config = generate_chart_config(
            schema=schema,
            stats=stats,
            trend_analysis=trend_analysis
        )

        return jsonify(chart_config)

    except Exception as e:
        return jsonify({"error": str(e)}), 500