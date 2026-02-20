import pandas as pd
from typing import Dict, Any


class SchemaDetector:
    """
    Deterministic schema detection engine.
    This layer performs type inference only.
    No AI logic allowed here.
    """

    NUMERIC_THRESHOLD = 0.90
    DATE_THRESHOLD = 0.80
    CATEGORY_UNIQUE_RATIO = 0.20

    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()

    # -------------------------------------
    # Public Method
    # -------------------------------------
    def detect(self) -> Dict[str, Any]:
        schema = {}

        for column in self.df.columns:
            schema[column] = self._infer_column(self.df[column])

        return schema

    # -------------------------------------
    # Core Column Inference
    # -------------------------------------
    def _infer_column(self, series: pd.Series) -> Dict[str, Any]:

        total_count = len(series)
        non_null_series = series.dropna()
        non_null_count = len(non_null_series)

        # If entire column is empty
        if non_null_count == 0:
            return {
                "type": "unknown",
                "missing_ratio": 1.0,
                "unique_values": 0
            }

        # Try numeric detection
        numeric_ratio = self._numeric_ratio(non_null_series)
        if numeric_ratio >= self.NUMERIC_THRESHOLD:
            return self._build_numeric_metadata(non_null_series, total_count)

        # Try date detection
        date_ratio = self._date_ratio(non_null_series)
        if date_ratio >= self.DATE_THRESHOLD:
            return self._build_date_metadata(non_null_series, total_count)

        # Otherwise treat as categorical/text
        return self._build_categorical_metadata(non_null_series, total_count)

    # -------------------------------------
    # Type Detection Helpers
    # -------------------------------------
    def _numeric_ratio(self, series: pd.Series) -> float:
        converted = pd.to_numeric(series, errors="coerce")
        return converted.notna().sum() / len(series)

    def _date_ratio(self, series: pd.Series) -> float:
        converted = pd.to_datetime(series, errors="coerce")
        return converted.notna().sum() / len(series)

    # -------------------------------------
    # Metadata Builders
    # -------------------------------------
    def _build_numeric_metadata(self, series: pd.Series, total: int) -> Dict[str, Any]:

        numeric_series = pd.to_numeric(series, errors="coerce")

        return {
            "type": "numeric",
            "missing_ratio": round(1 - (len(series) / total), 4),
            "unique_values": int(numeric_series.nunique()),
            "min": float(numeric_series.min()),
            "max": float(numeric_series.max()),
            "mean": float(numeric_series.mean()),
            "std": float(numeric_series.std())
        }

    def _build_date_metadata(self, series: pd.Series, total: int) -> Dict[str, Any]:

        date_series = pd.to_datetime(series, errors="coerce")

        return {
            "type": "date",
            "missing_ratio": round(1 - (len(series) / total), 4),
            "unique_values": int(date_series.nunique()),
            "min": str(date_series.min()),
            "max": str(date_series.max())
        }

    def _build_categorical_metadata(self, series: pd.Series, total: int) -> Dict[str, Any]:

        unique_count = series.nunique()
        unique_ratio = unique_count / len(series)

        column_type = (
            "categorical"
            if unique_ratio <= self.CATEGORY_UNIQUE_RATIO
            else "text"
        )

        return {
            "type": column_type,
            "missing_ratio": round(1 - (len(series) / total), 4),
            "unique_values": int(unique_count),
            "top_values": series.value_counts().head(5).to_dict()
        }
