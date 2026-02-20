import numpy as np
import pandas as pd
from typing import Dict, Any


class ForecastEngine:
    """
    Simple linear regression forecast.
    No ML models.
    Deterministic only.
    """

    def __init__(self, df: pd.DataFrame, time_column: str):
        self.df = df.copy()
        self.time_column = time_column

    def forecast(self, periods: int = 3) -> Dict[str, Any]:

        forecasts = {}

        if not self.time_column:
            return forecasts

        numeric_cols = self.df.select_dtypes(include=[np.number]).columns

        for col in numeric_cols:
            if col == self.time_column:
                continue

            forecasts[col] = self._forecast_column(col, periods)

        return forecasts

    def _forecast_column(self, col: str, periods: int):

        x = self.df[self.time_column]
        y = self.df[col]

        mask = ~x.isna() & ~y.isna()
        x = x[mask]
        y = y[mask]

        if len(x) < 2:
            return {}

        slope, intercept = np.polyfit(x, y, 1)

        last_time = x.max()

        predictions = {}

        for i in range(1, periods + 1):
            future_time = last_time + i
            predicted_value = slope * future_time + intercept
            predictions[str(future_time)] = float(round(predicted_value, 2))

        return {
            "slope": float(round(slope, 4)),
            "intercept": float(round(intercept, 4)),
            "predictions": predictions
        }