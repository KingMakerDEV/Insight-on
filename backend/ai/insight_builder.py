# ai/insight_builder.py

from ai.prompts import build_insight_prompt
from ai.llm_client import call_llm


def synthesize_insight(
    dataset_profile: str,
    summary_stats: dict,
    trend_result: dict,
    root_cause_text: str,
    forecast_explanation: dict
) -> dict:
    """
    Main intelligence orchestration layer.

    Combines all analysis outputs
    and generates executive AI insight.
    """

    # 1️⃣ Build structured prompt
    prompt = build_insight_prompt(
        dataset_profile=dataset_profile,
        summary_stats=summary_stats,
        trend_result=trend_result,
        root_cause_text=root_cause_text,
        forecast_explanation=forecast_explanation
    )

    # 2️⃣ Call LLM
    ai_response = call_llm(prompt)

    # 3️⃣ Return structured output
    return {
        "dataset_profile": dataset_profile,
        "executive_insight": ai_response
    }