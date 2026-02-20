import pandas as pd
from typing import Optional


class CSVParser:
    """
    Deterministic CSV parsing service.
    No AI involvement.
    """

    @staticmethod
    def parse(file_path: str) -> Optional[pd.DataFrame]:

        try:
            # Try default encoding
            df = pd.read_csv(file_path)
            return df

        except UnicodeDecodeError:
            # Fallback encoding
            try:
                df = pd.read_csv(file_path, encoding="latin-1")
                return df
            except Exception as e:
                raise Exception(f"CSV Parsing Error (latin-1): {str(e)}")

        except Exception as e:
            raise Exception(f"CSV Parsing Error: {str(e)}")