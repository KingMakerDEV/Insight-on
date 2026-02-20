# ai/insight_builder.py

from ai.prompts import build_insight_prompt
from ai.llm_client import call_llm


def synthesize_insight(
    dataset_profile: str,
    summary_stats: dict,
    trend_result: dict,
    root_cause_data: dict,
    forecast_explanation: dict
) -> dict:
    """
    Intelligence orchestration layer.
    Combines deterministic outputs and calls LLM.
    """

    # Convert root cause dict to readable text
    root_cause_text = str(root_cause_data.get("strong_correlations", []))

    prompt = build_insight_prompt(
        dataset_profile=dataset_profile,
        summary_stats=summary_stats,
        trend_result=trend_result,
        root_cause_text=root_cause_text,
        forecast_explanation=forecast_explanation
    )

    try:
        ai_response = call_llm(prompt)
    except Exception as e:
        ai_response = f"LLM call failed: {str(e)}"

    return {
        "dataset_profile": dataset_profile,
        "executive_insight": ai_response
    }