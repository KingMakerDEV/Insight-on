import numpy as np
import pandas as pd
from typing import Dict, Any, Optional


class TrendDetector:
    """
    Deterministic trend detection.
    Uses linear regression slope.
    No AI here.
    """

    UNIQUE_THRESHOLD = 30  # time columns usually low unique values

    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()

    # ------------------------------------------
    # Public API
    # ------------------------------------------
    def detect(self) -> Dict[str, Any]:

        time_column = self._detect_time_column()

        if not time_column:
            return {
                "time_column": None,
                "trends": {}
            }

        trends = self._compute_trends(time_column)

        return {
            "time_column": time_column,
            "trends": trends
        }

    # ------------------------------------------
    # Detect Time Column
    # ------------------------------------------
    def _detect_time_column(self) -> Optional[str]:

        numeric_cols = self.df.select_dtypes(include=[np.number])

        for col in numeric_cols.columns:
            unique_values = self.df[col].nunique()

            if unique_values <= self.UNIQUE_THRESHOLD:
                return col

        return None

    # ------------------------------------------
    # Compute Trend Slopes
    # ------------------------------------------
    def _compute_trends(self, time_column: str) -> Dict[str, Any]:

        trends = {}

        x = self.df[time_column]

        numeric_cols = self.df.select_dtypes(include=[np.number]).columns

        for col in numeric_cols:
            if col == time_column:
                continue

            y = self.df[col]

            slope = self._compute_slope(x, y)

            trends[col] = {
                "slope": float(round(slope, 4)),
                "direction": self._classify_trend(slope)
            }

        return trends

    def _compute_slope(self, x, y):

        # Remove NaNs
        mask = ~x.isna() & ~y.isna()
        x_clean = x[mask]
        y_clean = y[mask]

        if len(x_clean) < 2:
            return 0

        slope = np.polyfit(x_clean, y_clean, 1)[0]
        return slope

    def _classify_trend(self, slope):

        if slope > 0:
            return "increasing"
        elif slope < 0:
            return "decreasing"
        else:
            return "stable"