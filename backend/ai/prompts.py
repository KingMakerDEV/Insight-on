# ai/prompts.py

def build_insight_prompt(
    dataset_profile: str,
    summary_stats: dict,
    trend_result: dict,
    root_cause_text: str,
    forecast_explanation: dict
) -> str:
    """
    Build structured AI prompt for dataset insight synthesis.
    """

    prompt = f"""
You are a senior government data analyst.

Dataset Profile:
{dataset_profile}

Summary Statistics:
{summary_stats}

Trend Analysis:
{trend_result}

Root Cause Analysis:
{root_cause_text}

Forecast Insight:
{forecast_explanation}

Your Task:
1. Provide a concise executive summary.
2. Highlight the most important analytical insight.
3. Explain the key risk or opportunity.
4. Suggest one policy or strategic recommendation.

Rules:
- Do not repeat raw numbers excessively.
- Keep response professional and analytical.
- Avoid speculation beyond given data.
- Keep total length under 200 words.
"""

    return prompt