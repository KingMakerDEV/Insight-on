from flask import Blueprint, request, jsonify

from services.rule_engine import build_analysis_plan
from ai.insight_builder import synthesize_insight

insights_bp = Blueprint("insights", __name__)


@insights_bp.route("/insights", methods=["POST"])
def generate_insights():
    """
    AI Intelligence endpoint.
    Consumes deterministic outputs and generates executive insights.
    """

    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON body"}), 400

        rows = data.get("rows", 0)
        schema = data.get("schema", {})
        stats = data.get("stats", {})
        trend_analysis = data.get("trend_analysis", {})
        forecast = data.get("forecast", {})
        root_cause = data.get("root_cause", {})

        # ----------------------------------
        # 1️⃣ Build analysis decision plan
        # ----------------------------------

        analysis_plan = build_analysis_plan(
            schema=schema,
            stats=stats,
            trend_analysis=trend_analysis,
            rows=rows
        )

        # ----------------------------------
        # 2️⃣ Generate AI executive insight
        # ----------------------------------

        insight = synthesize_insight(
            dataset_profile=analysis_plan["dataset_profile"],
            summary_stats=stats.get("summary_statistics", {}),
            trend_result=trend_analysis,
            root_cause_data=root_cause,
            forecast_explanation=forecast
        )

        return jsonify({
            "analysis_plan": analysis_plan,
            "ai_insight": insight
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500