# services/decision_models.py

from dataclasses import dataclass, asdict
from typing import Optional
from services.intelligence_types import DatasetProfile, ConfidenceLevel


@dataclass
class AnalysisDecision:
    enable_trend_analysis: bool
    enable_correlation_analysis: bool
    enable_forecast: bool

    primary_numeric_target: Optional[str]
    time_column: Optional[str]

    dataset_profile: DatasetProfile
    confidence_score: float
    confidence_level: ConfidenceLevel

    def to_dict(self):
        """
        Convert to JSON-safe dictionary
        """
        result = asdict(self)

        # Convert enums to values
        result["dataset_profile"] = self.dataset_profile.value
        result["confidence_level"] = self.confidence_level.value

        return result