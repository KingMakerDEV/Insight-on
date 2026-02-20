import pandas as pd
import os

def parse_csv(file_path):
    """Reads a CSV file into a Pandas DataFrame."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    
    try:
        # Read CSV, strip whitespace from column names
        df = pd.read_csv(file_path)
        df.columns = df.columns.str.strip()
        return df
    except Exception as e:
        raise ValueError(f"Failed to parse CSV: {str(e)}")