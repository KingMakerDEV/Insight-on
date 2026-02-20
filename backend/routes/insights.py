# routes/insights.py

from flask import Blueprint, request, jsonify

from services.rule_engine import build_analysis_plan
from services.chart_mapper import generate_chart_config
from services.trend_detector import detect_trend
from services.root_cause import analyze_root_cause
from services.forecast_explainer import generate_forecast_explanation

from ai.insight_builder import synthesize_insight


insights_bp = Blueprint("insights", __name__)


@insights_bp.route("/insights", methods=["POST"])
def generate_insights():
    """
    Main intelligence orchestration endpoint.
    """

    try:
        data = request.json

        if not data:
            return jsonify({"error": "No input data provided"}), 400

        schema = data.get("schema")
        stats = data.get("stats")

        if not schema or not stats:
            return jsonify({"error": "Schema or stats missing"}), 400

        # -------------------------------------
        # 1️⃣ RULE ENGINE
        # -------------------------------------
        analysis_plan = build_analysis_plan(schema, stats)

        # -------------------------------------
        # 2️⃣ CHART MAPPING
        # -------------------------------------
        chart_config = generate_chart_config(schema)

        # -------------------------------------
        # 3️⃣ TREND DETECTION
        # -------------------------------------
        trend_result = None
        if analysis_plan.get("enable_trend_analysis"):
            series = stats.get("primary_series", [])
            trend_result = detect_trend(series)

        # -------------------------------------
        # 4️⃣ ROOT CAUSE
        # -------------------------------------
        root_cause_text = None
        if analysis_plan.get("enable_correlation_analysis"):
            correlations = stats.get("correlations", {})
            root_cause_text = analyze_root_cause(correlations)

        # -------------------------------------
        # 5️⃣ FORECAST EXPLANATION
        # -------------------------------------
        forecast_explanation = None
        if analysis_plan.get("enable_forecast"):
            series = stats.get("primary_series", [])
            forecast_result = stats.get("forecast_result", {})
            forecast_explanation = generate_forecast_explanation(
                series, forecast_result
            )

        # -------------------------------------
        # 6️⃣ AI INSIGHT SYNTHESIS
        # -------------------------------------
        executive_insight = synthesize_insight(
            dataset_profile=analysis_plan.get("dataset_profile"),
            summary_stats=stats.get("summary"),
            trend_result=trend_result,
            root_cause_text=root_cause_text,
            forecast_explanation=forecast_explanation,
        )

        # -------------------------------------
        # 7️⃣ FINAL RESPONSE
        # -------------------------------------
        return jsonify({
            "analysis_plan": analysis_plan,
            "chart_config": chart_config,
            "trend_analysis": trend_result,
            "root_cause_analysis": root_cause_text,
            "forecast_explanation": forecast_explanation,
            "executive_insight": executive_insight
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500