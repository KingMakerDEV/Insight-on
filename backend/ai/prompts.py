# ai/prompts.py

def build_insight_prompt(
    dataset_profile: str,
    summary_stats: dict,
    trend_result: dict,
    root_cause_text: str,
    forecast_explanation: dict
) -> str:
    """
    Build structured AI prompt for executive insight.
    """

    prompt = f"""
You are a senior government data analyst.

DATASET PROFILE:
{dataset_profile}

SUMMARY STATISTICS (condensed):
{summary_stats}

TREND ANALYSIS:
{trend_result}

STRONG CORRELATIONS:
{root_cause_text}

FORECAST SUMMARY:
{forecast_explanation}

INSTRUCTIONS:
1. Provide a concise executive summary.
2. Highlight the most important analytical insight.
3. Identify one key risk or opportunity.
4. Suggest one actionable policy recommendation.

CONSTRAINTS:
- Do not speculate beyond given data.
- Avoid repeating raw numbers excessively.
- Keep response under 200 words.
- Maintain professional tone.
"""

    return prompt.strip()