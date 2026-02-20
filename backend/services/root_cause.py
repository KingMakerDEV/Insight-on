import pandas as pd
from typing import Dict, Any


class RootCauseAnalyzer:
    """
    Extract strongest correlation pairs.
    Used later by AI for hypothesis.
    """

    CORR_THRESHOLD = 0.7

    def __init__(self, correlation_matrix: Dict[str, Dict[str, float]]):
        self.corr = correlation_matrix

    def analyze(self) -> Dict[str, Any]:

        strong_pairs = []

        for col1, values in self.corr.items():
            for col2, corr_value in values.items():

                if col1 == col2:
                    continue

                if abs(corr_value) >= self.CORR_THRESHOLD:
                    strong_pairs.append({
                        "feature_1": col1,
                        "feature_2": col2,
                        "correlation": corr_value
                    })

        return {
            "strong_correlations": strong_pairs
        }