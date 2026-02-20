import pandas as pd
import numpy as np
from typing import Dict, Any


class StatsEngine:
    """
    Deterministic statistical computation engine.
    AI must never touch raw data.
    """

    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        self.numeric_df = self.df.select_dtypes(include=[np.number])
        self.categorical_df = self.df.select_dtypes(exclude=[np.number])

    # -----------------------------------------
    # Public API
    # -----------------------------------------
    def compute(self) -> Dict[str, Any]:

        return {
            "numeric_columns": self._get_numeric_columns(),
            "categorical_columns": self._get_categorical_columns(),
            "kpis": self._compute_kpis(),
            "correlation_matrix": self._compute_correlation_matrix(),
            "summary_statistics": self._summary_statistics()
        }

    # -----------------------------------------
    # Column Classification
    # -----------------------------------------
    def _get_numeric_columns(self):
        return list(self.numeric_df.columns)

    def _get_categorical_columns(self):
        return list(self.categorical_df.columns)

    # -----------------------------------------
    # KPI Calculation
    # -----------------------------------------
    def _compute_kpis(self):

        kpis = {}

        for col in self.numeric_df.columns:
            series = self.numeric_df[col]

            kpis[col] = {
                "mean": float(series.mean()),
                "median": float(series.median()),
                "min": float(series.min()),
                "max": float(series.max()),
                "std": float(series.std())
            }

        return kpis

    # -----------------------------------------
    # Correlation Matrix
    # -----------------------------------------
    def _compute_correlation_matrix(self):

        if len(self.numeric_df.columns) < 2:
            return {}

        corr_matrix = self.numeric_df.corr(method="pearson")

        # Convert to JSON-safe dict
        return corr_matrix.round(4).to_dict()

    # -----------------------------------------
    # Summary Statistics
    # -----------------------------------------
    def _summary_statistics(self):

        summary = {}

        for col in self.numeric_df.columns:
            series = self.numeric_df[col]

            summary[col] = {
                "25_percentile": float(series.quantile(0.25)),
                "50_percentile": float(series.quantile(0.50)),
                "75_percentile": float(series.quantile(0.75))
            }

        return summary
