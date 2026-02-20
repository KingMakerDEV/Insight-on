# services/intelligence_types.py

from enum import Enum


class DatasetProfile(Enum):
    BASIC = "basic"
    TIME_SERIES = "time_series"
    MULTIVARIATE = "multivariate"
    TIME_SERIES_MULTIVARIATE = "time_series_multivariate"


class AnalysisType(Enum):
    TREND = "trend_analysis"
    CORRELATION = "correlation_analysis"
    FORECAST = "forecast_analysis"
    DESCRIPTIVE = "descriptive_analysis"


class ConfidenceLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


def map_confidence_score(score: float) -> ConfidenceLevel:
    """
    Convert numeric confidence (0–1)
    into human-readable confidence level.
    """

    if score >= 0.75:
        return ConfidenceLevel.HIGH
    elif score >= 0.4:
        return ConfidenceLevel.MEDIUM
    else:
        return ConfidenceLevel.LOW